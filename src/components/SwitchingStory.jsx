import { lazy, Suspense, useCallback, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DeviceAsset } from './MacBook'

const MacBookStage = lazy(() => import('./MacBook3D'))

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────────────────────────────────────
 * SCROLL STORYBOARD
 *
 *   0%   first Mac rises into view, lid 12° → 90°
 *  18%   keyboard releases onto a high quadratic Bézier arc
 *  27%   trackpad follows the same arc
 *  36%   mouse follows; each device banks with the curve
 *  66%   second Mac wakes and accepts all three accessories
 *  84%   first Mac recedes; connection resolves on second Mac
 * 100%   settled handoff — one setup, now on the other Mac
 * ───────────────────────────────────────────────────────── */

const STORY = {
  open: 0,
  release: 0.18,
  travel: 0.38,
  receive: 0.66,
  settle: 0.84,
  end: 1,
}

const LID = {
  openDuration: 0.24,
}

const ARC = {
  endpointYOffset: 30,
  travelDuration: 0.42,
  deviceStagger: 0.09,
  bankFactor: 0.18,
  baseScale: 0.5,
  scaleLift: 0.6,
  diveStart: 0.93,
  diveScaleLoss: 0.5,
  opacityStart: 0.1,
  opacityEnd: 0.16,
  opacityStagger: 0.03,
  desktopControl: { x: 0.5, y: -0.34 },
  mobileControl: { x: 0.12, y: 0.5 },
  devices: [
    { key: 'keyboard', tilt: -5 },
    { key: 'trackpad', tilt: 6 },
    { key: 'mouse', tilt: -10 },
  ],
}

const MACS = {
  firstInitial: { opacity: 0.15, y: 90, scale: 0.82 },
  firstOpen: { opacity: 1, y: 0, scale: 1, duration: 0.24 },
  firstRecede: { opacity: 0.22, scale: 0.9, duration: 0.2 },
  secondInitial: { opacity: 0.08, scale: 0.88 },
  secondWaiting: { opacity: 0.24, scale: 0.92, duration: 0.22 },
  secondReceive: { opacity: 1, scale: 1, duration: 0.2 },
}

const COPY = {
  exit: { autoAlpha: 0, y: -10, filter: 'blur(3px)', duration: 0.018 },
  enter: { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.028 },
  releaseExitLead: 0.02,
  deviceExitLead: 0.018,
  receiveExitLead: 0.015,
  receiveEnterLag: 0.018,
}

const CONNECTION = {
  reveal: { opacity: 1, duration: 0.2 },
  settle: { opacity: 0, duration: 0.16 },
}

const FINAL_STATUS = {
  visible: { opacity: 1, y: 0, duration: 0.12 },
}

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)
const ramp = (progress, start, end) => clamp((progress - start) / (end - start), 0, 1)
const easeInOutCubic = (value) => (
  value < 0.5
    ? 4 * value * value * value
    : 1 - ((-2 * value + 2) ** 3) / 2
)

export function SwitchingStory() {
  const sectionRef = useRef(null)
  const sceneRef = useRef(null)
  const macARef = useRef(null)
  const macBRef = useRef(null)
  const lidStateRef = useRef({ open: 0 })
  const appearanceRef = useRef({ firstOpacity: 0.15, secondOpacity: 0.08 })
  const keyboardRef = useRef(null)
  const trackpadRef = useRef(null)
  const mouseRef = useRef(null)
  const lineRef = useRef(null)
  const releaseCopyRef = useRef(null)
  const keyboardCopyRef = useRef(null)
  const trackpadCopyRef = useRef(null)
  const mouseCopyRef = useRef(null)
  const receiveCopyRef = useRef(null)
  const finalStatusRef = useRef(null)
  const [stageReady, setStageReady] = useState(false)
  const handleStageReady = useCallback(() => setStageReady(true), [])

  useLayoutEffect(() => {
    const section = sectionRef.current
    const scene = sceneRef.current
    if (!section || !scene || !stageReady) return undefined

    const context = gsap.context(() => {
      const media = gsap.matchMedia()
      const deviceElements = [keyboardRef.current, trackpadRef.current, mouseRef.current]
      const deviceCopyElements = [keyboardCopyRef.current, trackpadCopyRef.current, mouseCopyRef.current]

      const updateDevicesAlongArc = (progress, control) => {
        const sceneRect = scene.getBoundingClientRect()
        const macARect = macARef.current?.getBoundingClientRect()
        const macBRect = macBRef.current?.getBoundingClientRect()
        if (!macARect || !macBRect) return

        const startPoint = {
          x: macARect.left - sceneRect.left + macARect.width / 2,
          y: macARect.top - sceneRect.top + ARC.endpointYOffset,
        }
        const endPoint = {
          x: macBRect.left - sceneRect.left + macBRect.width / 2,
          y: macBRect.top - sceneRect.top + ARC.endpointYOffset,
        }
        const controlPoint = {
          x: scene.clientWidth * control.x,
          y: scene.clientHeight * control.y,
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
          const dive = ramp(progressOnArc, ARC.diveStart, 1)
          const scale = (
            ARC.baseScale + ARC.scaleLift * Math.sin(Math.PI * easedProgress)
          ) * (1 - ARC.diveScaleLoss * dive)
          const fadeIn = ramp(
            progress,
            ARC.opacityStart + index * ARC.opacityStagger,
            ARC.opacityEnd + index * ARC.opacityStagger,
          )

          gsap.set(element, {
            x,
            y,
            xPercent: -50,
            yPercent: -50,
            rotation: device.tilt + bank,
            scale,
            opacity: fadeIn * (1 - dive),
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

        gsap.set(lidStateRef.current, { open: 0 })
        gsap.set(appearanceRef.current, { firstOpacity: 0.15, secondOpacity: 0.08 })
        updateDevicesAlongArc(STORY.open, control)

        timeline
          .fromTo(
            macARef.current,
            MACS.firstInitial,
            { ...MACS.firstOpen, ease: 'power2.out' },
            STORY.open,
          )
          .to(
            appearanceRef.current,
            { firstOpacity: 1, duration: MACS.firstOpen.duration, ease: 'power2.out' },
            STORY.open,
          )
          .to(
            lidStateRef.current,
            { open: 1, duration: LID.openDuration, ease: 'power2.out' },
            STORY.open,
          )
          .fromTo(
            macBRef.current,
            MACS.secondInitial,
            MACS.secondWaiting,
            STORY.open,
          )
          .to(
            appearanceRef.current,
            { secondOpacity: 0.24, duration: MACS.secondWaiting.duration },
            STORY.open,
          )
          .to(releaseCopyRef.current, COPY.exit, STORY.release - COPY.releaseExitLead)
          .to(lineRef.current, CONNECTION.reveal, STORY.release)
          .to(macBRef.current, { ...MACS.secondReceive, ease: 'power2.out' }, STORY.receive)
          .to(macARef.current, MACS.firstRecede, STORY.receive)
          .to(
            appearanceRef.current,
            { secondOpacity: 1, duration: MACS.secondReceive.duration },
            STORY.receive,
          )
          .to(
            appearanceRef.current,
            { firstOpacity: 0.22, duration: MACS.firstRecede.duration },
            STORY.receive,
          )
          .to(
            deviceCopyElements[deviceCopyElements.length - 1],
            COPY.exit,
            STORY.receive - COPY.receiveExitLead,
          )
          .to(receiveCopyRef.current, COPY.enter, STORY.receive + COPY.receiveEnterLag)
          .to(finalStatusRef.current, FINAL_STATUS.visible, STORY.settle)
          .to(lineRef.current, CONNECTION.settle, STORY.settle)

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

      media.add('(min-width: 761px) and (prefers-reduced-motion: no-preference)', () =>
        buildTimeline(ARC.desktopControl),
      )
      media.add('(max-width: 760px) and (prefers-reduced-motion: no-preference)', () =>
        buildTimeline(ARC.mobileControl),
      )
      media.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(lidStateRef.current, { open: 1 })
        gsap.set(appearanceRef.current, { firstOpacity: 1, secondOpacity: 1 })
        gsap.set(deviceElements, { opacity: 0 })
        gsap.set([macARef.current, macBRef.current, finalStatusRef.current], { opacity: 1 })
      })

      return () => media.revert()
    }, scene)

    return () => context.revert()
  }, [stageReady])

  return (
    <section className="switch-story" id="switching-story" ref={sectionRef}>
      <div className="switch-story__sticky" ref={sceneRef}>
        <div className="switch-story__grid" aria-hidden="true" />
        <div className="switch-story__orbit" aria-hidden="true" />

        <div className="switch-story__copy" aria-live="polite">
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

        <Suspense
          fallback={(
            <>
              <div className="switch-story__mac switch-story__mac--a" ref={macARef}>
                <div className="macbook-view__fallback" aria-hidden="true" />
              </div>
              <div className="switch-story__mac switch-story__mac--b" ref={macBRef}>
                <div className="macbook-view__fallback" aria-hidden="true" />
              </div>
            </>
          )}
        >
          <MacBookStage
            macARef={macARef}
            macBRef={macBRef}
            lidStateRef={lidStateRef}
            appearanceRef={appearanceRef}
            onReady={handleStageReady}
          />
        </Suspense>

        <div className="switch-story__arc-glow" ref={lineRef} aria-hidden="true" />

        <div className="switch-story__device switch-story__device--keyboard" ref={keyboardRef}>
          <DeviceAsset type="keyboard" />
        </div>
        <div className="switch-story__device switch-story__device--trackpad" ref={trackpadRef}>
          <DeviceAsset type="trackpad" />
        </div>
        <div className="switch-story__device switch-story__device--mouse" ref={mouseRef}>
          <DeviceAsset type="mouse" />
        </div>

        <div className="switch-story__final-status" ref={finalStatusRef}>
          <i /> 3 DEVICES CONNECTED
        </div>

        <div className="switch-story__progress" aria-hidden="true">
          <span>SCROLL TO TRANSFER</span>
          <i />
        </div>
      </div>
    </section>
  )
}
