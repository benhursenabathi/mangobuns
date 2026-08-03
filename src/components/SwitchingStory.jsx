import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DeviceAsset } from './MacBook'

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────────────────────────────────────
 * SCROLL STORYBOARD
 *
 *   0%   the two-Mac photograph settles in
 *   18%  keyboard releases into a high quadratic Bézier arc
 *   27%  trackpad follows the same arc
 *   36%  mouse follows; each device banks with the curve
 *   66%  the receiving Mac accepts the accessories
 *   84%  the handoff resolves
 *  100%  settled handoff — one setup, now on the other Mac
 * ───────────────────────────────────────────────────────── */

const STORY = {
  open: 0,
  release: 0.18,
  travel: 0.38,
  receive: 0.66,
  settle: 0.84,
  end: 1,
}

const PHOTO = {
  aspectRatio: 1672 / 941,
  source: { x: 0.332, y: 0.5 },
  target: { x: 0.685, y: 0.502 },
}

const ARC = {
  travelDuration: 0.42,
  deviceStagger: 0.09,
  bankFactor: 0.18,
  desktopControl: { x: 0.505, y: -0.1 },
  mobileControl: { x: 0.505, y: -0.04 },
  deviceScaleAtLid: 0.68,
  deviceScaleAtApex: 1,
  bubbleInEnd: 0.12,
  bubbleOutStart: 0.86,
  bubbleRestScale: 0.92,
  bubblePeakScale: 1.04,
  devices: [
    { key: 'keyboard', tilt: -5 },
    { key: 'trackpad', tilt: 6 },
    { key: 'mouse', tilt: -10 },
  ],
}

const COPY = {
  exit: { autoAlpha: 0, y: -10, filter: 'blur(3px)', duration: 0.018 },
  enter: { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.028 },
  releaseExitLead: 0.02,
  deviceExitLead: 0.018,
  receiveExitLead: 0.015,
  receiveEnterLag: 0.018,
}

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)
const ramp = (progress, start, end) => clamp((progress - start) / (end - start), 0, 1)
const easeInOutCubic = (value) => (
  value < 0.5
    ? 4 * value * value * value
    : 1 - ((-2 * value + 2) ** 3) / 2
)

const getAnchorPoint = (anchor, sceneRect) => {
  const rect = anchor?.getBoundingClientRect()
  if (!rect) return null

  return {
    x: rect.left - sceneRect.left + rect.width / 2,
    y: rect.top - sceneRect.top + rect.height / 2,
  }
}

const getBubbleState = (progress) => {
  if (progress <= ARC.bubbleInEnd) {
    const local = ramp(progress, 0, ARC.bubbleInEnd)
    const scale = local < 0.6
      ? ARC.bubbleRestScale + (ARC.bubblePeakScale - ARC.bubbleRestScale) * ramp(local, 0, 0.6)
      : ARC.bubblePeakScale - (ARC.bubblePeakScale - 1) * ramp(local, 0.6, 1)

    return { opacity: local, scale }
  }

  if (progress >= ARC.bubbleOutStart) {
    const local = ramp(progress, ARC.bubbleOutStart, 1)
    return {
      opacity: 1 - local,
      scale: 1 - (1 - ARC.bubbleRestScale) * local,
    }
  }

  return { opacity: 1, scale: 1 }
}

export function SwitchingStory() {
  const sectionRef = useRef(null)
  const sceneRef = useRef(null)
  const photoStageRef = useRef(null)
  const photoRef = useRef(null)
  const sourceAnchorRef = useRef(null)
  const targetAnchorRef = useRef(null)
  const keyboardRef = useRef(null)
  const trackpadRef = useRef(null)
  const mouseRef = useRef(null)
  const keyboardBubbleRef = useRef(null)
  const trackpadBubbleRef = useRef(null)
  const mouseBubbleRef = useRef(null)
  const releaseCopyRef = useRef(null)
  const keyboardCopyRef = useRef(null)
  const trackpadCopyRef = useRef(null)
  const mouseCopyRef = useRef(null)
  const receiveCopyRef = useRef(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const scene = sceneRef.current
    const photoStage = photoStageRef.current
    if (!section || !scene || !photoStage) return undefined

    let handleResize
    const context = gsap.context(() => {
      const media = gsap.matchMedia()
      const deviceElements = [keyboardRef.current, trackpadRef.current, mouseRef.current]
      const bubbleElements = [keyboardBubbleRef.current, trackpadBubbleRef.current, mouseBubbleRef.current]
      const deviceCopyElements = [keyboardCopyRef.current, trackpadCopyRef.current, mouseCopyRef.current]

      const getCopyBottom = (sceneRect) => {
        const copyFrames = Array.from(scene.querySelectorAll('.switch-story__copy-frame'))
        return copyFrames.reduce(
          (bottom, frame) => Math.max(bottom, frame.getBoundingClientRect().bottom - sceneRect.top),
          0,
        )
      }

      const syncStageLayout = () => {
        const sceneRect = scene.getBoundingClientRect()
        const isMobile = window.innerWidth <= 760
        // Reserve the headline's full measured height before placing the photo. This
        // keeps the stage and its orbit legible on short laptop viewports without
        // relying on a brittle, device-specific breakpoint.
        const copyBottom = getCopyBottom(sceneRect)
        const copyGap = isMobile ? 30 : 46
        const bottomGap = isMobile
          ? 26
          : clamp(window.innerHeight * 0.05, 38, 72)
        const minimumStageTop = isMobile ? 210 : 250
        const safeTop = Math.max(copyBottom + copyGap, minimumStageTop)
        const availableHeight = Math.max(
          isMobile ? 320 : 360,
          window.innerHeight - safeTop - bottomGap,
        )
        const widthLimit = isMobile
          ? window.innerWidth * 1.18
          : window.innerWidth
        const stageHeight = Math.min(
          availableHeight,
          widthLimit / PHOTO.aspectRatio,
          941,
        )
        const stageWidth = stageHeight * PHOTO.aspectRatio

        photoStage.style.width = `${stageWidth}px`
        photoStage.style.top = `${safeTop + stageHeight / 2}px`
      }

      const updateDevicesAlongArc = (progress, control) => {
        const sceneRect = scene.getBoundingClientRect()
        const stageRect = photoStage.getBoundingClientRect()
        const startPoint = getAnchorPoint(sourceAnchorRef.current, sceneRect)
        const endPoint = getAnchorPoint(targetAnchorRef.current, sceneRect)
        if (!startPoint || !endPoint) return

        const desiredControlPoint = {
          x: stageRect.left - sceneRect.left + stageRect.width * control.x,
          y: stageRect.top - sceneRect.top + stageRect.height * control.y,
        }
        const isMobile = window.innerWidth <= 760
        const largestDeviceHalf = Math.max(
          ...deviceElements.map((element) => parseFloat(getComputedStyle(element).width) / 2),
          isMobile ? 78 : 155,
        )
        const clearance = isMobile ? 26 : 46
        const minimumApexY = getCopyBottom(sceneRect) + clearance + largestDeviceHalf
        const endpointMidpointY = (startPoint.y + endPoint.y) / 2
        const minimumControlY = 2 * minimumApexY - endpointMidpointY
        const controlPoint = {
          x: desiredControlPoint.x,
          y: Math.max(desiredControlPoint.y, minimumControlY),
        }

        ARC.devices.forEach((device, index) => {
          const element = deviceElements[index]
          const bubble = bubbleElements[index]
          if (!element || !bubble) return

          const start = STORY.release + index * ARC.deviceStagger
          const progressOnArc = ramp(progress, start, start + ARC.travelDuration)
          const easedProgress = easeInOutCubic(progressOnArc)
          const inverseProgress = 1 - easedProgress
          const x = (
            inverseProgress * inverseProgress * startPoint.x
            + 2 * inverseProgress * easedProgress * controlPoint.x
            + easedProgress * easedProgress * endPoint.x
          )
          const y = (
            inverseProgress * inverseProgress * startPoint.y
            + 2 * inverseProgress * easedProgress * controlPoint.y
            + easedProgress * easedProgress * endPoint.y
          )
          const tangentX = (
            2 * inverseProgress * (controlPoint.x - startPoint.x)
            + 2 * easedProgress * (endPoint.x - controlPoint.x)
          )
          const tangentY = (
            2 * inverseProgress * (controlPoint.y - startPoint.y)
            + 2 * easedProgress * (endPoint.y - controlPoint.y)
          )
          const bank = Math.atan2(tangentY, tangentX) * 180 / Math.PI * ARC.bankFactor
          const travelScale = (
            ARC.deviceScaleAtLid
            + (ARC.deviceScaleAtApex - ARC.deviceScaleAtLid) * Math.sin(Math.PI * easedProgress)
          )
          const outerFadeIn = ramp(progressOnArc, 0.015, 0.08)
          const outerFadeOut = 1 - ramp(progressOnArc, 0.9, 1)
          const bubbleState = getBubbleState(progressOnArc)

          gsap.set(element, {
            x,
            y,
            xPercent: -50,
            yPercent: -50,
            rotation: device.tilt + bank,
            scale: travelScale,
            opacity: outerFadeIn * outerFadeOut,
          })
          gsap.set(bubble, {
            scale: bubbleState.scale,
            opacity: bubbleState.opacity,
          })
        })
      }

      const buildTimeline = (control) => {
        const timeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.65,
            invalidateOnRefresh: true,
            onUpdate: ({ progress }) => updateDevicesAlongArc(progress, control),
            onRefresh: ({ progress }) => updateDevicesAlongArc(progress, control),
          },
        })

        updateDevicesAlongArc(STORY.open, control)

        timeline
          .to(releaseCopyRef.current, COPY.exit, STORY.release - COPY.releaseExitLead)
          .to(deviceCopyElements[deviceCopyElements.length - 1], COPY.exit, STORY.receive - COPY.receiveExitLead)
          .to(receiveCopyRef.current, COPY.enter, STORY.receive + COPY.receiveEnterLag)

        deviceCopyElements.forEach((element, index) => {
          const start = STORY.release + index * ARC.deviceStagger
          timeline.to(element, COPY.enter, start)

          if (index < deviceCopyElements.length - 1) {
            timeline.to(
              element,
              COPY.exit,
              start + ARC.deviceStagger - COPY.deviceExitLead,
            )
          }
        })

        return () => {
          timeline.scrollTrigger?.kill()
          timeline.kill()
        }
      }

      handleResize = () => {
        syncStageLayout()
        ScrollTrigger.refresh()
      }

      syncStageLayout()
      window.addEventListener('resize', handleResize, { passive: true })

      media.add('(min-width: 761px) and (prefers-reduced-motion: no-preference)', () =>
        buildTimeline(ARC.desktopControl),
      )
      media.add('(max-width: 760px) and (prefers-reduced-motion: no-preference)', () =>
        buildTimeline(ARC.mobileControl),
      )
      media.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(deviceElements, { clearProps: 'transform,opacity' })
        gsap.set(bubbleElements, { clearProps: 'transform,opacity' })
        gsap.set(deviceElements, { opacity: 0 })
        gsap.set([releaseCopyRef.current, ...deviceCopyElements], { autoAlpha: 0 })
        gsap.set(receiveCopyRef.current, { autoAlpha: 1, y: 0, filter: 'blur(0px)' })
      })

      return () => {
        window.removeEventListener('resize', handleResize)
        media.revert()
      }
    }, scene)

    return () => context.revert()
  }, [])

  const refreshPhotoStage = () => {
    if (photoRef.current?.complete) ScrollTrigger.refresh()
  }

  return (
    <section className="switch-story" id="switching-story" ref={sectionRef}>
      <div className="switch-story__sticky" ref={sceneRef}>
        <div className="switch-story__copy">
          <div className="switch-story__copy-frame" ref={releaseCopyRef}>
            <h2>Let go.</h2>
          </div>
          <div className="switch-story__copy-frame switch-story__copy-frame--device switch-story__copy-frame--hidden" ref={keyboardCopyRef}>
            <h2>
              <span>Magic Keyboard.</span>
              <span className="switch-story__copy-check">Check.</span>
            </h2>
          </div>
          <div className="switch-story__copy-frame switch-story__copy-frame--device switch-story__copy-frame--hidden" ref={trackpadCopyRef}>
            <h2>
              <span>Magic Trackpad.</span>
              <span className="switch-story__copy-check">Check.</span>
            </h2>
          </div>
          <div className="switch-story__copy-frame switch-story__copy-frame--device switch-story__copy-frame--hidden" ref={mouseCopyRef}>
            <h2>
              <span>Magic Mouse.</span>
              <span className="switch-story__copy-check">Check.</span>
            </h2>
          </div>
          <div className="switch-story__copy-frame switch-story__copy-frame--hidden" ref={receiveCopyRef}>
            <h2>All yours.</h2>
          </div>
        </div>

        <div className="switch-story__photo-stage" ref={photoStageRef}>
          <img
            className="switch-story__photo"
            ref={photoRef}
            src={`${import.meta.env.BASE_URL}images/switchy-animated-move.png`}
            alt="Two MacBooks ready to receive a shared keyboard, trackpad, and mouse"
            onLoad={refreshPhotoStage}
            draggable="false"
          />
          <span
            className="switch-story__photo-anchor"
            ref={sourceAnchorRef}
            style={{ left: `${PHOTO.source.x * 100}%`, top: `${PHOTO.source.y * 100}%` }}
            aria-hidden="true"
          />
          <span
            className="switch-story__photo-anchor"
            ref={targetAnchorRef}
            style={{ left: `${PHOTO.target.x * 100}%`, top: `${PHOTO.target.y * 100}%` }}
            aria-hidden="true"
          />
        </div>

        <div className="switch-story__device switch-story__device--keyboard" ref={keyboardRef} aria-hidden="true">
          <div className="switch-story__device-bubble" ref={keyboardBubbleRef}>
            <DeviceAsset type="keyboard" />
          </div>
        </div>
        <div className="switch-story__device switch-story__device--trackpad" ref={trackpadRef} aria-hidden="true">
          <div className="switch-story__device-bubble" ref={trackpadBubbleRef}>
            <DeviceAsset type="trackpad" />
          </div>
        </div>
        <div className="switch-story__device switch-story__device--mouse" ref={mouseRef} aria-hidden="true">
          <div className="switch-story__device-bubble" ref={mouseBubbleRef}>
            <DeviceAsset type="mouse" />
          </div>
        </div>

      </div>
    </section>
  )
}
