import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DeviceAsset } from './MacBook'
import { createHandoffSpring, getHandoffScale, HANDOFF_SEQUENCE } from '../animation/deviceHandoff'

gsap.registerPlugin(ScrollTrigger)

const MOBILE_BREAKPOINT = 767
const COMPACT_LANDSCAPE_MAX_WIDTH = 920
const COMPACT_LANDSCAPE_MAX_HEIGHT = 540
const isCompactLandscape = () => (
  window.innerWidth > MOBILE_BREAKPOINT
  && window.innerWidth <= COMPACT_LANDSCAPE_MAX_WIDTH
  && window.innerHeight <= COMPACT_LANDSCAPE_MAX_HEIGHT
)
const isMobileLayout = () => window.innerWidth <= MOBILE_BREAKPOINT || isCompactLandscape()

/* ─────────────────────────────────────────────────────────
 * SCROLL STORYBOARD
 *
 *   0%   the two-Mac photograph settles in
 *   18%  keyboard scales from zero into a high quadratic Bézier arc
 *   38%  keyboard finishes scaling into the receiving Mac
 *   40%  trackpad begins; arrives at 60%
 *   62%  mouse begins; arrives at 82%
 *   84%  the handoff resolves
 *  100%  settled handoff — one setup, now on the other Mac
 * ───────────────────────────────────────────────────────── */

const STORY = {
  open: 0,
  release: HANDOFF_SEQUENCE.release,
  receive: HANDOFF_SEQUENCE.receive,
  settle: 0.84,
  end: 1,
}

const PHOTO = {
  aspectRatio: 1672 / 941,
  source: { x: 0.332, y: 0.5 },
  target: { x: 0.685, y: 0.502 },
}

const ARC = {
  travelDuration: HANDOFF_SEQUENCE.travel,
  deviceStagger: HANDOFF_SEQUENCE.stagger,
  bankFactor: 0.18,
  desktopControl: { x: 0.505, y: -0.1 },
  mobileControl: { x: 0.505, y: -0.04 },
  devices: [
    { key: 'keyboard', tilt: -5 },
    { key: 'trackpad', tilt: 6 },
    { key: 'mouse', tilt: -10 },
  ],
}

const COPY = {
  exit: { autoAlpha: 0, y: -10, filter: 'blur(3px)', duration: 0.018 },
  enter: { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.028 },
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
        const isMobile = isMobileLayout()
        const compactLandscape = isCompactLandscape()
        // Reserve the headline's full measured height before placing the photo. This
        // keeps the stage and its orbit legible on short laptop viewports without
        // relying on a brittle, device-specific breakpoint.
        const copyBottom = getCopyBottom(sceneRect)
        if (compactLandscape) {
          const stageHeight = Math.min(
            window.innerHeight - 76,
            (window.innerWidth * 0.64) / PHOTO.aspectRatio,
            330,
          )
          const stageWidth = stageHeight * PHOTO.aspectRatio

          photoStage.style.width = `${stageWidth}px`
          photoStage.style.top = `${76 + stageHeight / 2}px`
          return
        }

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
          ? Math.min(window.innerWidth * 1.48, 720)
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
        const isMobile = isMobileLayout()
        const compactLandscape = isCompactLandscape()
        const largestDeviceHalf = Math.max(
          ...deviceElements.map((element) => parseFloat(getComputedStyle(element).width) / 2),
          isMobile ? 78 : 155,
        )
        const clearance = compactLandscape ? 10 : (isMobile ? 26 : 46)
        const minimumApexY = compactLandscape
          ? 72 + largestDeviceHalf
          : getCopyBottom(sceneRect) + clearance + largestDeviceHalf
        const endpointMidpointY = (startPoint.y + endPoint.y) / 2
        const minimumControlY = 2 * minimumApexY - endpointMidpointY
        const controlPoint = {
          x: desiredControlPoint.x,
          y: Math.max(desiredControlPoint.y, minimumControlY),
        }

        ARC.devices.forEach((device, index) => {
          const element = deviceElements[index]
          if (!element) return

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

          gsap.set(element, {
            x,
            y,
            xPercent: -50,
            yPercent: -50,
            rotation: device.tilt + bank,
            scale: getHandoffScale(progressOnArc),
            transformOrigin: '50% 50%',
          })

        })
      }

      const buildTimeline = (control) => {
        const timeline = gsap.timeline({ paused: true, defaults: { ease: 'none' } })

        timeline
          .to(deviceCopyElements[deviceCopyElements.length - 1], COPY.exit, STORY.receive - COPY.receiveExitLead)
          .to(receiveCopyRef.current, COPY.enter, STORY.receive + COPY.receiveEnterLag)

        deviceCopyElements.forEach((element, index) => {
          const start = STORY.release + index * ARC.deviceStagger
          if (index > 0) timeline.to(element, COPY.enter, start)

          if (index < deviceCopyElements.length - 1) {
            timeline.to(
              element,
              COPY.exit,
              start + ARC.deviceStagger - COPY.deviceExitLead,
            )
          }
        })

        const spring = createHandoffSpring((progress) => {
          // Timeline positions use the same 0–1 scroll units as the devices.
          timeline.time(progress)
          updateDevicesAlongArc(progress, control)
        })
        const trigger = ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          invalidateOnRefresh: true,
          onUpdate: (self) => spring.set(self.progress),
          onRefresh: (self) => spring.snap(self.progress),
        })
        spring.snap(trigger.progress)

        return () => {
          trigger.kill()
          spring.destroy()
          timeline.kill()
        }
      }

      handleResize = () => {
        syncStageLayout()
        ScrollTrigger.refresh()
      }

      syncStageLayout()
      window.addEventListener('resize', handleResize, { passive: true })

      media.add('(min-width: 921px) and (prefers-reduced-motion: no-preference), (min-width: 768px) and (min-height: 541px) and (prefers-reduced-motion: no-preference)', () =>
        buildTimeline(ARC.desktopControl),
      )
      media.add('(max-width: 767px) and (prefers-reduced-motion: no-preference), (max-width: 920px) and (max-height: 540px) and (prefers-reduced-motion: no-preference)', () =>
        buildTimeline(ARC.mobileControl),
      )
      media.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(deviceElements, { clearProps: 'transform,opacity' })
        gsap.set(deviceElements, { scale: 0 })
        gsap.set(deviceCopyElements, { autoAlpha: 0 })
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
          <div className="switch-story__copy-frame switch-story__copy-frame--device" ref={keyboardCopyRef}>
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
          <div className="switch-story__device-bubble">
            <DeviceAsset type="keyboard" />
          </div>
        </div>
        <div className="switch-story__device switch-story__device--trackpad" ref={trackpadRef} aria-hidden="true">
          <div className="switch-story__device-bubble">
            <DeviceAsset type="trackpad" />
          </div>
        </div>
        <div className="switch-story__device switch-story__device--mouse" ref={mouseRef} aria-hidden="true">
          <div className="switch-story__device-bubble">
            <DeviceAsset type="mouse" />
          </div>
        </div>

      </div>
    </section>
  )
}
