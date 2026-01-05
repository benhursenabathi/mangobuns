import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

// --- Device Ring Component ---
// Creates a 3D rotating orbital ring of device images
const DeviceRing = () => {
  const devices = [
    { src: '/Trackpad.jpeg', alt: 'Magic Trackpad', delay: 0 },
    { src: '/Keyboard.jpeg', alt: 'Magic Keyboard', delay: 1 },
    { src: '/Mouse.jpeg', alt: 'Magic Mouse', delay: 2 },
    { src: '/Trackpad.jpeg', alt: 'Magic Trackpad', delay: 3 },
    { src: '/Keyboard.jpeg', alt: 'Magic Keyboard', delay: 4 },
    { src: '/Mouse.jpeg', alt: 'Magic Mouse', delay: 5 },
  ]

  return (
    <div className="device-ring-container">
      <div className="device-ring">
        {devices.map((device, index) => {
          const angle = (index / devices.length) * 360
          return (
            <div
              key={index}
              className="device-item"
              style={{
                '--angle': `${angle}deg`,
                '--delay': `${index * -3.33}s`,
              }}
            >
              <img
                src={device.src}
                alt={device.alt}
                className="device-image"
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

// --- Navbar Component ---
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'py-4 bg-cream/80 backdrop-blur-md' : 'py-8'
    }`}>
      <div className="max-w-screen-xl mx-auto px-6 flex justify-between items-center">
        <div className="font-serif text-2xl tracking-tight">Switchy</div>
        <button className="text-sm font-medium px-5 py-2.5 bg-ink text-cream rounded-full hover:bg-ink/80 transition-colors">
          Get Switchy — $14.99
        </button>
      </div>
    </nav>
  )
}

// --- Mac Device SVG Component ---
const MacDevice = ({ type = 'macbook', className = '' }) => {
  if (type === 'macbook') {
    return (
      <svg viewBox="0 0 200 140" className={className} fill="none">
        <rect x="20" y="10" width="160" height="100" rx="8" fill="#1a1a1a" />
        <rect x="28" y="18" width="144" height="84" rx="4" fill="#2a2a2a" />
        <rect x="88" y="10" width="24" height="6" rx="2" fill="#1a1a1a" />
        <path d="M0 110 L20 110 L20 110 L180 110 L200 110 L200 130 Q200 138 192 138 L8 138 Q0 138 0 130 Z" fill="#e5e5e5" />
        <rect x="70" y="115" width="60" height="6" rx="3" fill="#d4d4d4" />
      </svg>
    )
  }

  if (type === 'imac') {
    return (
      <svg viewBox="0 0 200 180" className={className} fill="none">
        <rect x="10" y="10" width="180" height="110" rx="10" fill="#1a1a1a" />
        <rect x="18" y="18" width="164" height="94" rx="6" fill="#2a2a2a" />
        <rect x="10" y="120" width="180" height="20" rx="0" fill="#e5e5e5" />
        <rect x="10" y="136" width="180" height="4" rx="2" fill="#f5f5f5" />
        <path d="M85 140 L115 140 L110 170 L90 170 Z" fill="#d4d4d4" />
        <ellipse cx="100" cy="172" rx="40" ry="8" fill="#e5e5e5" />
      </svg>
    )
  }

  return null
}

// --- Magic Trackpad Component for Animation ---
const AnimatedTrackpad = ({ className = '' }) => (
  <div className={`trackpad-animated ${className}`}>
    <img
      src="/Trackpad.jpeg"
      alt="Magic Trackpad"
      className="w-full h-full object-cover rounded-xl shadow-2xl"
    />
  </div>
)

// --- Main App Component ---
export default function App() {
  const animationSectionRef = useRef(null)
  const stickyContainerRef = useRef(null)
  const trackpadRef = useRef(null)
  const pathRef = useRef(null)
  const macARef = useRef(null)
  const macBRef = useRef(null)

  // GSAP Animation Setup
  useLayoutEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const section = animationSectionRef.current
      const stickyContainer = stickyContainerRef.current
      const trackpad = trackpadRef.current
      const pathEl = pathRef.current
      const macA = macARef.current
      const macB = macBRef.current

      if (!section || !stickyContainer || !trackpad || !pathEl || !macA || !macB) return

      // Function to get element center relative to sticky container
      const getElementCenter = (el) => {
        const rect = el.getBoundingClientRect()
        const containerRect = stickyContainer.getBoundingClientRect()
        return {
          x: rect.left - containerRect.left + rect.width / 2,
          y: rect.top - containerRect.top + rect.height / 2
        }
      }

      // Calculate positions
      const posA = getElementCenter(macA)
      const posB = getElementCenter(macB)

      // Calculate control points for smooth bezier curve
      const controlPoint1 = {
        x: posA.x + (posB.x - posA.x) * 0.3,
        y: posA.y + (posB.y - posA.y) * 0.6
      }
      const controlPoint2 = {
        x: posA.x + (posB.x - posA.x) * 0.7,
        y: posA.y + (posB.y - posA.y) * 0.4
      }

      // Build the SVG path string
      const pathString = `M ${posA.x},${posA.y} C ${controlPoint1.x},${controlPoint1.y} ${controlPoint2.x},${controlPoint2.y} ${posB.x},${posB.y}`

      // Update the SVG path
      pathEl.setAttribute('d', pathString)

      // Set initial state
      gsap.set([macA, macB], { opacity: 0, y: 30 })
      gsap.set(trackpad, {
        x: posA.x,
        y: posA.y,
        xPercent: -50,
        yPercent: -50,
        opacity: 0,
        scale: 0.8
      })

      // Create the main timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
          invalidateOnRefresh: true,
        }
      })

      // Phase 1: Fade in Macs (0% - 15% of scroll)
      tl.to(macA, {
        opacity: 1,
        y: 0,
        duration: 0.1,
        ease: 'power2.out'
      })
      .to(macB, {
        opacity: 1,
        y: 0,
        duration: 0.1,
        ease: 'power2.out'
      }, '<0.02')

      // Phase 2: Fade in trackpad at Mac A (15% - 25%)
      .to(trackpad, {
        opacity: 1,
        scale: 1,
        duration: 0.1,
        ease: 'power2.out'
      }, '+=0.02')

      // Phase 3: Animate trackpad along path (25% - 85%)
      .to(trackpad, {
        motionPath: {
          path: pathString,
          alignOrigin: [0.5, 0.5],
          autoRotate: false,
        },
        duration: 0.6,
        ease: 'power1.inOut',
      }, '+=0.02')

      // Phase 4: Settle trackpad at Mac B (85% - 100%)
      .to(trackpad, {
        scale: 0.9,
        duration: 0.1,
        ease: 'power2.out'
      })

      // Handle resize
      const handleResize = () => {
        ScrollTrigger.refresh()
      }
      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
        tl.kill()
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative bg-cream text-ink font-sans noise-overlay">
      <Navbar />

      {/* ============================================
          SECTION 1: CLEAN HERO
          Only rotating ring + text, no Macs
          ============================================ */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6 relative overflow-hidden">
        {/* Rotating Device Ring - Behind Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <DeviceRing />
        </div>

        {/* Hero Content - On Top */}
        <div className="relative z-10 text-center">
          <div className="flex justify-center mb-8">
            <div className="inline-block px-4 py-2 rounded-full border border-ink/10 bg-cream/90 backdrop-blur-sm text-sm font-medium tracking-wide">
              For Mac power users
            </div>
          </div>
          <h1 className="text-manifesto mb-6">
            Your Magic devices<br />
            <span className="italic">shouldn't</span> be tethered.
          </h1>
          <p className="text-lg md:text-xl text-muted max-w-md text-center font-light mx-auto mb-12">
            One click to switch your keyboard, trackpad, and mouse between Macs.
          </p>

          {/* Scroll indicator */}
          <div className="animate-bounce mt-8">
            <svg className="w-6 h-6 mx-auto text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 2: ANIMATION SECTION
          Macs + Motion Path Animation
          ============================================ */}
      <section
        ref={animationSectionRef}
        className="relative min-h-[300vh]"
      >
        {/* Sticky container for the visual animation */}
        <div
          ref={stickyContainerRef}
          className="sticky top-0 h-screen w-full overflow-hidden"
        >

          {/* SVG for the motion path - uses screen coordinates */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            style={{ overflow: 'visible' }}
          >
            {/* The curved bezier path from Mac A to Mac B */}
            <path
              ref={pathRef}
              d="M 0,0 C 0,0 0,0 0,0"
              fill="none"
              stroke="rgba(0,0,0,0.1)"
              strokeWidth="2"
              strokeDasharray="8 6"
              strokeLinecap="round"
              className="motion-path"
            />
          </svg>

          {/* Mac A - Source (Top Left) */}
          <div
            ref={macARef}
            className="absolute top-[18%] left-[8%] md:left-[12%] w-44 md:w-56 lg:w-72"
          >
            <div className="relative">
              <MacDevice type="macbook" className="w-full h-auto drop-shadow-2xl" />
              <div className="absolute -bottom-8 left-0 right-0 text-center">
                <span className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase">
                  MacBook Pro
                </span>
              </div>
            </div>
          </div>

          {/* Mac B - Destination (Bottom Right) */}
          <div
            ref={macBRef}
            className="absolute bottom-[18%] right-[8%] md:right-[12%] w-44 md:w-56 lg:w-72"
          >
            <div className="relative">
              <MacDevice type="imac" className="w-full h-auto drop-shadow-2xl" />
              <div className="absolute -bottom-8 left-0 right-0 text-center">
                <span className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase">
                  iMac
                </span>
              </div>
            </div>
          </div>

          {/* Animated Trackpad - positioned absolutely, will be moved by GSAP */}
          <div
            ref={trackpadRef}
            className="absolute w-16 h-12 md:w-24 md:h-16 z-20 will-change-transform"
            style={{ top: 0, left: 0 }}
          >
            <AnimatedTrackpad />
          </div>

        </div>

        {/* Scroll-driven text sections */}
        <div className="absolute top-0 left-0 w-full pointer-events-none z-10">
          {/* Spacer for first part of animation */}
          <div className="h-screen" />

          {/* Text section 1 */}
          <div className="h-screen flex flex-col justify-center items-center px-6">
            <h2 className="text-manifesto-secondary max-w-3xl text-center">
              No more System Settings.<br />
              <span className="text-ink">No more unpairing.</span><br />
              No more waiting.
            </h2>
          </div>

          {/* Text section 2 */}
          <div className="h-screen flex flex-col justify-center items-center px-6">
            <h2 className="text-manifesto max-w-4xl text-center">
              Just<br />
              <span className="text-muted italic">switch.</span>
            </h2>
          </div>
        </div>

      </section>

      {/* ============================================
          SECTION 3: CTA & FOOTER
          ============================================ */}
      <section className="relative bg-cream py-24 md:py-32 px-6">
        <div className="max-w-4xl mx-auto w-full">

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center mb-16 md:mb-24">
            <div className="group">
              <div className="text-[10px] font-mono tracking-[0.25em] text-muted mb-3 uppercase">
                Latency
              </div>
              <div className="font-serif text-3xl md:text-4xl italic">Instant</div>
            </div>
            <div className="group">
              <div className="text-[10px] font-mono tracking-[0.25em] text-muted mb-3 uppercase">
                Privacy
              </div>
              <div className="font-serif text-3xl md:text-4xl italic">Local-first</div>
            </div>
            <div className="group">
              <div className="text-[10px] font-mono tracking-[0.25em] text-muted mb-3 uppercase">
                Design
              </div>
              <div className="font-serif text-3xl md:text-4xl italic">Native</div>
            </div>
          </div>

          {/* CTA Card */}
          <div className="bg-ink text-cream rounded-3xl p-8 md:p-12 text-center">
            <h3 className="font-serif text-2xl md:text-3xl mb-4">
              Switch smarter, not harder.
            </h3>
            <p className="text-cream/60 mb-8 max-w-md mx-auto">
              One menu bar app. All your Magic accessories. Every Mac you own.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-cream text-ink px-8 py-4 rounded-full font-semibold hover:bg-cream/90 transition-colors">
                Buy Switchy — $14.99
              </button>
              <button className="border border-cream/30 text-cream px-8 py-4 rounded-full font-medium hover:bg-cream/10 transition-colors">
                Learn More
              </button>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-16 text-center">
            <div className="flex justify-center gap-6 mb-6">
              <a href="#" className="text-muted hover:text-ink transition-colors text-sm">
                Twitter
              </a>
              <a href="#" className="text-muted hover:text-ink transition-colors text-sm">
                LinkedIn
              </a>
            </div>
            <p className="text-muted/60 text-xs">
              &copy; 2024 Switchy. Not affiliated with Apple Inc.
            </p>
            <p className="text-muted/40 text-[10px] mt-2 font-mono">
              v1.0.0
            </p>
          </footer>

        </div>
      </section>
    </div>
  )
}
