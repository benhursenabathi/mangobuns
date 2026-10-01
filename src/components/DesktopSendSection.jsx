import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  IconArrowRight as ArrowRight,
  IconBattery3 as Battery,
  IconBrandApple as Apple,
  IconCheck as Check,
  IconChevronRight as ChevronRight,
  IconRefresh as Refresh,
  IconWifi as Wifi,
} from '@tabler/icons-react'
import { DeviceAsset } from './MacBook'
import { createHandoffSpring, getHandoffScale, HANDOFF_SEQUENCE } from '../animation/deviceHandoff'
import './DesktopSendSection.css'

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────────────────────────────────────
 * DESKTOP HANDOFF — scrubbed by scrolling, in either direction
 *
 *   0%   the hardware settles into a sticky scene
 *   8%   Send all devices opens the Mac mini destination
 *  18%   keyboard scales from zero, then lifts into the arc
 *  38%   keyboard has arrived; trackpad follows at 40%
 *  62%   mouse lifts after the trackpad arrives at 60%
 *  82%   all three accessories have scaled into the desktop Mac
 * 100%   release the scene into the next section
 *
 * Menu structure and copy follow Switchy/Views/MenuBarView.swift.
 * Reduced motion uses a static section without the scroll runway.
 * ───────────────────────────────────────────────────────── */
const HANDOFF = {
  menuOpen: 0.08,
  release: HANDOFF_SEQUENCE.release,
  travel: HANDOFF_SEQUENCE.travel,
  stagger: HANDOFF_SEQUENCE.stagger,
  bankFactor: 0.18,
  clearance: 16,
}
const DEVICES = [
  { id: 'keyboard', name: 'Magic Keyboard', tilt: -5 },
  { id: 'trackpad', name: 'Magic Trackpad', tilt: 6 },
  { id: 'mouse', name: 'Magic Mouse', tilt: -10 },
]

const ramp = (value, start, end) => gsap.utils.clamp(0, 1, (value - start) / (end - start))
const easeInOutCubic = (value) => value < 0.5
  ? 4 * value * value * value
  : 1 - ((-2 * value + 2) ** 3) / 2

function SwitchyMenu() {
  return (
    <div className="send-menu" aria-hidden="true">
      <div className="send-menu__status"><Refresh /><span>Device list updated</span></div>
      <div className="send-menu__separator" />
      <div className="send-menu__row send-menu__all">
        <span>Send all devices</span><ChevronRight />
        <div className="send-menu__submenu">
          <div className="send-menu__submenu-row">Send all to Mac mini</div>
        </div>
      </div>
      <div className="send-menu__separator" />
      <div className="send-menu__heading">Connected Devices</div>
      {DEVICES.map(({ id, name }) => (
        <div className="send-menu__row send-menu__device" key={id}>
          <Check /><span>{name}</span><ChevronRight />
        </div>
      ))}
      <div className="send-menu__separator" />
      <div className="send-menu__row"><span>Add new magic device</span></div>
      <div className="send-menu__row"><span>Settings</span><span className="send-menu__shortcut">⌘ ,</span></div>
      <div className="send-menu__row"><span>Quit Switchy</span><span className="send-menu__shortcut">⌘ Q</span></div>
    </div>
  )
}

function SendMacBook() {
  return (
    <div className="send-laptop" role="img" aria-label="Switchy on a MacBook: Send all devices, then Send all to Mac mini">
      <img
        className="send-laptop__hardware"
        src={`${import.meta.env.BASE_URL}images/send-macbook.webp`}
        width="1536"
        height="1024"
        alt=""
        loading="lazy"
        decoding="async"
        draggable="false"
      />
      <div
        className="send-laptop__screen"
        style={{ backgroundImage: `url("${import.meta.env.BASE_URL}images/onboarding/Onboarding5-new.jpeg")` }}
        aria-hidden="true"
      >
        <div className="send-laptop__menubar">
          <Apple className="send-laptop__apple" fill="currentColor" />
          <strong>Finder</strong><span>File</span><span>Edit</span><span>View</span>
          <div className="send-laptop__menu-icons"><img src={`${import.meta.env.BASE_URL}icon_512x512.png`} alt="" /><Wifi /><Battery /><span>9:41</span></div>
        </div>
        <span className="send-laptop__notch" />
        <SwitchyMenu />
      </div>
    </div>
  )
}

export function DesktopSendSection() {
  const sectionRef = useRef(null)
  const sceneRef = useRef(null)
  const devicesRef = useRef([])

  useLayoutEffect(() => {
    const section = sectionRef.current
    const scene = sceneRef.current
    const context = gsap.context(() => {
      const media = gsap.matchMedia()
      media.add({
        reduced: '(prefers-reduced-motion: reduce)',
        mobile: '(max-width: 700px)',
        desktop: '(min-width: 701px)',
      }, ({ conditions }) => {
        if (conditions.reduced) {
          scene.dataset.menuOpen = 'true'
          gsap.set(devicesRef.current, { scale: 0 })
          return
        }

        let geometry

        // Measure only on refresh, not on every scroll frame.
        const measure = () => {
          const bounds = scene.getBoundingClientRect()
          const laptop = scene.querySelector('.send-laptop').getBoundingClientRect()
          const mini = scene.querySelector('.send-mini').getBoundingClientRect()
          const start = {
            x: laptop.left - bounds.left + laptop.width * 0.54,
            y: laptop.top - bounds.top + laptop.height * 0.52,
          }
          const end = {
            x: mini.left - bounds.left + mini.width * 0.5,
            y: mini.top - bounds.top + mini.height * 0.46,
          }
          const largestHalf = Math.max(...devicesRef.current.map((el) => el.offsetWidth)) / 2
          const apexY = Math.max(largestHalf + HANDOFF.clearance, Math.min(start.y, end.y) - bounds.height * 0.4)
          const control = conditions.mobile
            ? { x: Math.max(largestHalf + HANDOFF.clearance, bounds.width * 0.1), y: (start.y + end.y) / 2 }
            : { x: (start.x + end.x) / 2, y: 2 * apexY - (start.y + end.y) / 2 }
          geometry = { start, end, control }
        }

        const render = (progress) => {
          if (!geometry) return
          const { start, end, control } = geometry
          scene.dataset.menuOpen = String(progress >= HANDOFF.menuOpen)

          DEVICES.forEach((device, index) => {
            const release = HANDOFF.release + index * HANDOFF.stagger
            const local = ramp(progress, release, release + HANDOFF.travel)
            const t = easeInOutCubic(local)
            const inverse = 1 - t
            const x = inverse * inverse * start.x + 2 * inverse * t * control.x + t * t * end.x
            const y = inverse * inverse * start.y + 2 * inverse * t * control.y + t * t * end.y
            const dx = 2 * inverse * (control.x - start.x) + 2 * t * (end.x - control.x)
            const dy = 2 * inverse * (control.y - start.y) + 2 * t * (end.y - control.y)
            const bank = Math.atan2(dy, dx) * 180 / Math.PI * HANDOFF.bankFactor

            gsap.set(devicesRef.current[index], {
              x, y,
              xPercent: -50,
              yPercent: -50,
              rotation: device.tilt + bank,
              scale: getHandoffScale(local),
              transformOrigin: '50% 50%',
            })
          })
        }

        measure()
        const spring = createHandoffSpring(render)
        const trigger = ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          invalidateOnRefresh: true,
          onUpdate: (self) => spring.set(self.progress),
          onRefresh: (self) => {
            measure()
            spring.snap(self.progress)
          },
        })
        spring.snap(trigger.progress)
        return () => {
          trigger.kill()
          spring.destroy()
        }
      })
      return () => media.revert()
    }, section)
    return () => context.revert()
  }, [])

  return (
    <section className="desktop-send" id="send-to-mac" ref={sectionRef} aria-labelledby="desktop-send-title">
      <div className="desktop-send__sticky">
        <div className="section-shell">
          <div className="desktop-send__intro">
            <h2 id="desktop-send-title">Desktop?<br /><span>Send devices</span></h2>
            <p className="desktop-send__description">
              Send your Magic accessories straight from your MacBook to your desktop Mac.
              One device or all at once. <strong>No spare mouse needed.</strong>
            </p>
          </div>

          <div className="send-scene" ref={sceneRef}>
            <div className="send-scene__source">
              <SendMacBook />
            </div>

            <div className="send-scene__direction" aria-hidden="true"><span /><ArrowRight strokeWidth={1.5} /></div>

            <div className="send-scene__destination">
              <img
                className="send-mini"
                src={`${import.meta.env.BASE_URL}images/send-mac-mini.webp`}
                width="1420"
                height="1108"
                alt="Silver Mac mini shown from above at an isometric angle"
                loading="lazy"
                decoding="async"
                draggable="false"
              />
            </div>

            <div className="send-scene__accessories" aria-hidden="true">
              {DEVICES.map(({ id }, index) => (
                <div
                  key={id}
                  ref={(element) => { devicesRef.current[index] = element }}
                  className={`send-accessory send-accessory--${id}`}
                >
                  <DeviceAsset type={id} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
