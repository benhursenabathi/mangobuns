import { gsap } from 'gsap'

// One complete handoff per slot. The gap keeps bounding boxes separate even
// during the scale overshoot, at any viewport size and in either scroll direction.
export const HANDOFF_SEQUENCE = {
  release: 0.18,
  travel: 0.2,
  stagger: 0.22,
  receive: 0.84,
}

/* HANDOFF MOTION — shared by both computer-to-computer stories.
 *   0–22%  grow from the source center, with a restrained spring settle
 *  22–76%  travel at full size and full opacity
 * 76–100%  contract into the destination center, ending at exactly zero
 * Scroll reversals retain velocity; idle springs leave the animation ticker.
 */
export const HANDOFF_MOTION = {
  appearEnd: 0.22,
  disappearStart: 0.76,
  popDamping: 0.72,
  popFrequency: 10,
  response: 0.32,
  precision: 0.00001,
  maxFrameSeconds: 0.064,
}

const clamp = (value) => Math.min(1, Math.max(0, value))
const smootherstep = (value) => {
  const t = clamp(value)
  return t * t * t * (t * (t * 6 - 15) + 10)
}
const popResponse = (t) => {
  const damping = HANDOFF_MOTION.popDamping
  const frequency = HANDOFF_MOTION.popFrequency
  const oscillation = frequency * Math.sqrt(1 - damping * damping)
  return 1 - Math.exp(-damping * frequency * t) * (
    Math.cos(oscillation * t) + damping * frequency / oscillation * Math.sin(oscillation * t)
  )
}

export const getHandoffScale = (progress) => {
  const p = clamp(progress)
  const appear = popResponse(clamp(p / HANDOFF_MOTION.appearEnd)) / popResponse(1)
  const disappear = smootherstep((1 - p) / (1 - HANDOFF_MOTION.disappearStart))
  return appear * disappear
}

// Exact critically damped integration: re-target without resetting velocity.
export const advanceHandoffSpring = (position, velocity, target, seconds) => {
  const omega = 2 * Math.PI / HANDOFF_MOTION.response
  const delta = Math.min(seconds, HANDOFF_MOTION.maxFrameSeconds)
  const offset = position - target
  const impulse = velocity + omega * offset
  const decay = Math.exp(-omega * delta)
  return {
    position: target + (offset + impulse * delta) * decay,
    velocity: (velocity - omega * impulse * delta) * decay,
  }
}

export const createHandoffSpring = (render) => {
  let position = 0
  let velocity = 0
  let target = 0
  let active = false

  const stop = () => {
    gsap.ticker.remove(tick)
    active = false
  }
  const tick = (_time, deltaMs) => {
    const next = advanceHandoffSpring(position, velocity, target, deltaMs / 1000)
    position = next.position
    velocity = next.velocity
    if (Math.abs(position - target) < HANDOFF_MOTION.precision && Math.abs(velocity) < HANDOFF_MOTION.precision) {
      position = target
      velocity = 0
      stop()
    }
    render(clamp(position))
  }

  return {
    set(value) {
      target = clamp(value)
      if (!active && target !== position) {
        active = true
        gsap.ticker.add(tick)
      }
    },
    snap(value) {
      stop()
      position = target = clamp(value)
      velocity = 0
      render(position)
    },
    destroy: stop,
  }
}
