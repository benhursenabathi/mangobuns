import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import cableImageUrl from '../../Assets/Cable image.png'

gsap.registerPlugin(ScrollTrigger)

/* SCROLL STORYBOARD (220svh section, 120svh of pinned travel)
 *   0–30%  hold the complete cable for 36svh of reading room
 *  30–85%  dissolve; the next card enters over the departing scene
 *  85–100% finish the handover with the next card already on screen
 * The following card overlaps by one viewport in CSS, without its own reveal timer.
 */
const CABLE_STORY = {
  dissolveStart: 0.3,
  dissolveEnd: 0.85,
  headingExitStart: 0.64,
  headingExitEnd: 0.8,
}

const MOBILE_BREAKPOINT = 767
const isCompactViewport = (width, height) => (
  width <= MOBILE_BREAKPOINT || (width <= 920 && height <= 540)
)

const clamp = (value, min = 0, max = 1) => Math.min(Math.max(value, min), max)
const ramp = (value, start, end) => clamp((value - start) / (end - start))
const smoothstep = (edge0, edge1, value) => {
  const progress = ramp(value, edge0, edge1)
  return progress * progress * (3 - 2 * progress)
}

// Stable random values keep every fragment on the same path when scroll reverses.
const seededRandom = (seed) => {
  let value = seed >>> 0
  return () => {
    value += 0x6D2B79F5
    let result = value
    result = Math.imul(result ^ (result >>> 15), result | 1)
    result ^= result + Math.imul(result ^ (result >>> 7), result | 61)
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296
  }
}

const createCableField = (image, isMobile) => {
  // Keep enough source pixels to render the supplied PNG at its native detail.
  // The smaller mobile working size is still close to 2x its displayed width.
  const width = isMobile ? Math.min(image.naturalWidth, 1100) : image.naturalWidth
  const height = Math.round(width * image.naturalHeight / image.naturalWidth)
  const raw = document.createElement('canvas')
  raw.width = width
  raw.height = height

  const rawContext = raw.getContext('2d', { willReadFrequently: true })
  rawContext.drawImage(image, 0, 0, width, height)
  const rawPixels = rawContext.getImageData(0, 0, width, height)

  const particles = []
  const step = 4
  const random = seededRandom(isMobile ? 2317 : 7919)

  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      // Include the whole tile, including antialiased edge pixels. Sampling only
      // its top-left pixel left untracked pieces of the cable outline behind.
      let alphaSum = 0
      let redSum = 0
      let greenSum = 0
      let blueSum = 0
      const cellWidth = Math.min(step, width - x)
      const cellHeight = Math.min(step, height - y)
      for (let dy = 0; dy < cellHeight; dy += 1) {
        for (let dx = 0; dx < cellWidth; dx += 1) {
          const index = ((y + dy) * width + x + dx) * 4
          const alpha = rawPixels.data[index + 3] / 255
          alphaSum += alpha
          redSum += rawPixels.data[index] * alpha
          greenSum += rawPixels.data[index + 1] * alpha
          blueSum += rawPixels.data[index + 2] * alpha
        }
      }
      if (alphaSum === 0) continue
      const alpha = alphaSum / (cellWidth * cellHeight)

      const bottomToTop = 1 - y / height
      const start = clamp(0.045 + bottomToTop * 0.51 + (random() - 0.5) * 0.1, 0.02, 0.62)
      const sideForce = (x / width - 0.5) * (66 + random() * 38)

      particles.push({
        x: x + step / 2,
        y: y + step / 2,
        cellX: x,
        cellY: y,
        cellWidth,
        cellHeight,
        red: Math.round(redSum / alphaSum),
        green: Math.round(greenSum / alphaSum),
        blue: Math.round(blueSum / alphaSum),
        alpha,
        size: step * (0.8 + random() * 0.55),
        start,
        duration: 0.25 + random() * 0.12,
        velocityX: sideForce + (random() - 0.5) * 155,
        velocityY: random() < 0.18 ? -25 - random() * 65 : 35 + random() * 150,
        shrink: 0.35 + random() * 0.35,
        flutter: (random() - 0.5) * 18,
      })
    }
  }

  const remaining = document.createElement('canvas')
  remaining.width = width
  remaining.height = height
  const remainingContext = remaining.getContext('2d')
  return { source: raw, remaining, remainingContext, particles, width, height }
}

export function CableDissolve() {
  const sectionRef = useRef(null)
  const stickyRef = useRef(null)
  const canvasRef = useRef(null)
  const headingRef = useRef(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const sticky = stickyRef.current
    const canvas = canvasRef.current
    if (!section || !sticky || !canvas) return undefined

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reducedMotion.matches) return undefined

    let field
    let resizeObserver
    let scrollTween
    let disposed = false
    let storyProgress = 0
    const context = canvas.getContext('2d')
    const image = new Image()
    image.decoding = 'async'

    const sizeCanvas = () => {
      const bounds = sticky.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 1.6)
      const width = Math.max(1, Math.round(bounds.width * dpr))
      const height = Math.max(1, Math.round(bounds.height * dpr))
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
      }
      return { width: bounds.width, height: bounds.height, dpr }
    }

    const render = (nextProgress) => {
      if (!field || disposed) return
      storyProgress = clamp(nextProgress)
      const progress = ramp(storyProgress, CABLE_STORY.dissolveStart, CABLE_STORY.dissolveEnd)
      const surface = sizeCanvas()
      const { width, height, dpr } = surface
      const compactViewport = isCompactViewport(width, height)
      const imageScale = Math.min(
        (width * (compactViewport ? 0.98 : 0.9)) / field.width,
        (height * (compactViewport ? 0.62 : 0.72)) / field.height,
      )
      const imageWidth = field.width * imageScale
      const imageHeight = field.height * imageScale
      const originX = (width - imageWidth) / 2
      const originY = Math.max(74, (height - imageHeight) * 0.46)
      // Clear the last silhouette as the upper edge dissolves so the product
      // cards can take over without a lingering end-state frame.
      const sceneFade = 1 - smoothstep(0.74, 0.9, progress)
      sticky.style.setProperty('--cable-ambience', String(sceneFade))
      const cornerRadius = 28 / imageScale

      context.setTransform(1, 0, 0, 1, 0, 0)
      context.clearRect(0, 0, canvas.width, canvas.height)
      context.setTransform(
        dpr * imageScale,
        0,
        0,
        dpr * imageScale,
        dpr * originX,
        dpr * originY,
      )
      // Erase at native resolution before scaling. Integer tile boundaries
      // remove every source pixel without subpixel destination-out seams.
      const remaining = field.remainingContext
      remaining.clearRect(0, 0, field.width, field.height)
      remaining.drawImage(field.source, 0, 0)
      for (const particle of field.particles) {
        if (progress <= particle.start) continue
        remaining.clearRect(particle.cellX, particle.cellY, particle.cellWidth, particle.cellHeight)
      }
      context.save()
      context.beginPath()
      context.roundRect(0, 0, field.width, field.height, cornerRadius)
      context.clip()
      context.globalAlpha = sceneFade
      context.drawImage(field.remaining, 0, 0)
      context.restore()

      context.globalCompositeOperation = 'source-over'
      for (const particle of field.particles) {
        const localProgress = clamp((progress - particle.start) / particle.duration)
        if (localProgress <= 0 || localProgress >= 1) continue

        const eased = 1 - (1 - localProgress) ** 2
        const opacity = particle.alpha * (1 - smoothstep(0.34, 1, localProgress)) * sceneFade
        const x = particle.x + particle.velocityX * eased + Math.sin(eased * Math.PI * 3) * particle.flutter
        const y = particle.y + particle.velocityY * eased + 78 * eased * eased
        const size = particle.size * (1 - particle.shrink * smoothstep(0.15, 1, localProgress))

        context.globalAlpha = opacity
        context.fillStyle = `rgb(${particle.red} ${particle.green} ${particle.blue})`
        context.fillRect(x - size / 2, y - size / 2, size, size)
      }

      context.globalAlpha = 1
      context.globalCompositeOperation = 'source-over'
      const frameFade = 1 - smoothstep(0.02, 0.2, progress)
      if (frameFade > 0) {
        const outlineInset = 0.5 / imageScale
        context.beginPath()
        context.roundRect(
          outlineInset,
          outlineInset,
          field.width - outlineInset * 2,
          field.height - outlineInset * 2,
          cornerRadius,
        )
        context.globalAlpha = frameFade
        context.lineWidth = 1 / imageScale
        context.strokeStyle = 'rgba(255, 255, 255, 0.1)'
        context.stroke()
        context.globalAlpha = 1
      }
      context.setTransform(1, 0, 0, 1, 0, 0)

      const headingProgress = 1 - smoothstep(
        CABLE_STORY.headingExitStart,
        CABLE_STORY.headingExitEnd,
        storyProgress,
      )
      if (headingRef.current) {
        const headingExit = 1 - headingProgress
        gsap.set(headingRef.current, {
          autoAlpha: headingProgress,
          y: -26 * headingExit,
          filter: `blur(${3 * headingExit}px)`,
        })
      }
    }

    const initialise = async () => {
      try {
        image.src = cableImageUrl
        await image.decode()
        if (disposed) return

        field = createCableField(
          image,
          isCompactViewport(window.innerWidth, window.innerHeight),
        )
        section.dataset.ready = 'true'
        resizeObserver = new ResizeObserver(() => render(storyProgress))
        resizeObserver.observe(sticky)
        const playhead = { progress: 0 }
        scrollTween = gsap.to(playhead, {
          progress: 1,
          ease: 'none',
          onUpdate: () => render(playhead.progress),
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.6,
            invalidateOnRefresh: true,
            onRefresh: ({ progress: nextProgress }) => {
              playhead.progress = nextProgress
              render(nextProgress)
            },
          },
        })
        render(scrollTween.scrollTrigger.progress)
        ScrollTrigger.refresh()
      } catch {
        // The original image remains visible if canvas preparation is unavailable.
      }
    }

    initialise()

    return () => {
      disposed = true
      sticky.style.removeProperty('--cable-ambience')
      resizeObserver?.disconnect()
      scrollTween?.scrollTrigger?.kill()
      scrollTween?.kill()
    }
  }, [])

  return (
    <section className="cable-story" ref={sectionRef} aria-label="A cable dissolving to show that Switchy works wirelessly">
      <div className="cable-story__sticky" ref={stickyRef}>
        <div className="cable-story__heading" ref={headingRef}>
          <h2>No cables needed</h2>
        </div>
        <div className="cable-story__glow" aria-hidden="true" />
        <img
          className="cable-story__fallback"
          src={cableImageUrl}
          alt="A USB-C cable, ready to be left behind"
          draggable="false"
        />
        <canvas className="cable-story__canvas" ref={canvasRef} aria-hidden="true" />



      </div>
    </section>
  )
}
