import { useState, useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { TextLoop } from "@/components/ui/text-loop"
import { FeaturesSectionWithHoverEffects } from "@/components/ui/feature-section-with-hover-effects"

gsap.registerPlugin(ScrollTrigger)

// Animation defaults - clean, fast fades
const FADE_DURATION = 0.25 // 250ms
const FADE_EASE = 'power2.out'

// --- Navbar Component ---
const Navbar = ({ isReady }) => {
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Fade in navbar after hero content is ready
  useEffect(() => {
    if (!isReady || !navRef.current) return

    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: FADE_DURATION, ease: FADE_EASE, delay: 0.15 }
    )
  }, [isReady])

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4 bg-cream/80 backdrop-blur-md' : 'py-8'}`}
      style={{ opacity: 0 }}
    >
      <div className="max-w-screen-xl mx-auto px-6 flex justify-between items-center">
        <div className="font-serif text-2xl tracking-tight">Switchy</div>
        <button className="text-sm font-medium px-5 py-2.5 bg-ink text-cream rounded-full hover:bg-ink/80 transition-colors duration-200">
          Get Switchy — $9.99
        </button>
      </div>
    </nav>
  )
}

// --- Parallax Hero Images Component ---
const ParallaxHeroImages = ({ onDevicesReady }) => {
  const containerRef = useRef(null)
  const keyboardRef = useRef(null)
  const trackpadRef = useRef(null)
  const mouseRef = useRef(null)
  const hasAnimatedRef = useRef(false) // Prevent double animation

  useEffect(() => {
    // Prevent re-running the animation
    if (hasAnimatedRef.current) return
    hasAnimatedRef.current = true

    const ctx = gsap.context(() => {
      const devices = [keyboardRef.current, trackpadRef.current, mouseRef.current]

      // Timeline for sequenced load animation
      const loadTimeline = gsap.timeline({
        onComplete: () => onDevicesReady && onDevicesReady()
      })

      // Devices fade in first with stagger
      loadTimeline.fromTo(
        devices,
        {
          opacity: 0,
          y: 60,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          stagger: 0.12,
          ease: 'power2.out',
        }
      )

      // Slow parallax for keyboard (moves slowest)
      gsap.to(keyboardRef.current, {
        y: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 2,
        }
      })

      // Medium parallax for trackpad
      gsap.to(trackpadRef.current, {
        y: -120,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        }
      })

      // Faster parallax for mouse (moves most)
      gsap.to(mouseRef.current, {
        y: -150,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        }
      })

      // Fade out/in all images - REVERSIBLE on scroll back
      devices.forEach(device => {
        gsap.fromTo(device,
          { opacity: 1 }, // Explicit start value for proper reverse
          {
            opacity: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: '40% top',
              end: '75% top',
              scrub: 0.3,
            }
          }
        )
      })
    }, containerRef)

    return () => {
      ctx.revert()
      hasAnimatedRef.current = false // Reset for StrictMode remount
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Run only once on mount - callback is stable via ref guard

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Keyboard - Top left, angled elegantly */}
      <div
        ref={keyboardRef}
        className="absolute will-change-transform"
        style={{
          top: '6%',
          left: '2%',
          width: 'clamp(280px, 36vw, 480px)',
          transform: 'rotate(-6deg)',
          opacity: 0,
        }}
      >
        <img
          src={`${import.meta.env.BASE_URL}Keyboard_transparent.png`}
          alt="Magic Keyboard"
          className="w-full h-auto"
          style={{
            filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.08))',
          }}
        />
      </div>

      {/* Trackpad - Right side, upper area */}
      <div
        ref={trackpadRef}
        className="absolute will-change-transform"
        style={{
          top: '12%',
          right: '3%',
          width: 'clamp(200px, 26vw, 340px)',
          transform: 'rotate(5deg)',
          opacity: 0,
        }}
      >
        <img
          src={`${import.meta.env.BASE_URL}Trackpad_transparent.png`}
          alt="Magic Trackpad"
          className="w-full h-auto"
          style={{
            filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.08))',
          }}
        />
      </div>

      {/* Mouse - Bottom right, BIGGER on desktop */}
      <div
        ref={mouseRef}
        className="absolute will-change-transform"
        style={{
          bottom: '10%',
          right: '10%',
          width: 'clamp(160px, 22vw, 320px)', // Increased size
          transform: 'rotate(-8deg)',
          opacity: 0,
        }}
      >
        <img
          src={`${import.meta.env.BASE_URL}Mouse_transparent.png`}
          alt="Magic Mouse"
          className="w-full h-auto"
          style={{
            filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.08))',
          }}
        />
      </div>
    </div>
  )
}

// --- Scroll Fade Section Wrapper ---
const ScrollFadeSection = ({ children, className = '', delay = 0 }) => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: FADE_DURATION,
          ease: FADE_EASE,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            end: 'top 60%',
            toggleActions: 'play none none reverse',
          },
          delay,
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [delay])

  return (
    <div ref={sectionRef} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  )
}


// --- Hero Content Component with sequenced animation ---
const HeroContent = ({ isReady }) => {
  const contentRef = useRef(null)
  const badgeRef = useRef(null)
  const headingRef = useRef(null)
  const subheadingRef = useRef(null)
  const scrollIndicatorRef = useRef(null)

  useEffect(() => {
    if (!isReady) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      // Sequenced hero content animation after devices are ready
      tl.fromTo(badgeRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: FADE_DURATION, ease: FADE_EASE }
      )
        .fromTo(headingRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.3, ease: FADE_EASE },
          '-=0.1'
        )
        .fromTo(subheadingRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: FADE_DURATION, ease: FADE_EASE },
          '-=0.15'
        )
        .fromTo(scrollIndicatorRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: FADE_DURATION, ease: FADE_EASE },
          '-=0.1'
        )
    }, contentRef)

    return () => ctx.revert()
  }, [isReady])

  return (
    <div ref={contentRef} className="relative z-10 text-center">
      <div className="flex justify-center mb-8">
        <div
          ref={badgeRef}
          className="inline-block px-4 py-2 rounded-full border border-ink/10 bg-cream/90 backdrop-blur-sm text-sm font-medium tracking-wide"
          style={{ opacity: 0 }}
        >
          For Mac power users
        </div>
      </div>
      <h1 ref={headingRef} className="text-manifesto mb-6" style={{ opacity: 0 }}>
        One{' '}
        <TextLoop interval={2.5} className="inline-block">
          <span>keyboard</span>
          <span>mouse</span>
          <span>trackpad</span>
        </TextLoop>
        .<br />
        <span className="italic">For every</span> Mac.
      </h1>
      <p
        ref={subheadingRef}
        className="text-lg md:text-xl text-muted max-w-md text-center font-light mx-auto mb-12"
        style={{ opacity: 0 }}
      >
        One click to switch your keyboard, trackpad, and mouse between Macs that are in the same network.
      </p>

      {/* Scroll indicator */}
      <div ref={scrollIndicatorRef} className="animate-bounce mt-8" style={{ opacity: 0 }}>
        <svg className="w-6 h-6 mx-auto text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  )
}

// --- Main App Component ---
export default function App() {
  const [devicesReady, setDevicesReady] = useState(false)

  // Memoize the callback to prevent unnecessary re-renders
  const handleDevicesReady = useCallback(() => {
    setDevicesReady(true)
  }, [])

  return (
    <div className="relative bg-cream text-ink font-sans noise-overlay">
      <Navbar isReady={devicesReady} />

      {/* ============================================
          SECTION 1: HERO WITH PARALLAX ACCESSORIES
          ============================================ */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6 relative overflow-hidden">

        {/* Parallax Background Images */}
        <ParallaxHeroImages onDevicesReady={handleDevicesReady} />

        {/* Hero Content - Animates after devices */}
        <HeroContent isReady={devicesReady} />
      </section>

      {/* ============================================
          SECTION 2: HOW IT WORKS
          ============================================ */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <ScrollFadeSection className="text-center mb-12 md:mb-16">
            <div className="text-[10px] font-mono tracking-[0.25em] text-muted mb-4 uppercase">
              See it in action
            </div>
            <h2 className="font-serif text-3xl md:text-5xl italic">
              How it works
            </h2>
          </ScrollFadeSection>

          {/* Video Container */}
          <ScrollFadeSection delay={0.05}>
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden bg-[#f5f4f1] shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto"
              >
                <source src={`${import.meta.env.BASE_URL}Macbook A.mp4`} type="video/mp4" />
              </video>
            </div>
          </ScrollFadeSection>
        </div>
      </section>

      {/* ============================================
          SECTION 2.5: FEATURES
          ============================================ */}
      <section className="py-24 md:py-32 px-6 bg-cream">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <ScrollFadeSection className="text-center mb-8 md:mb-12">
            <div className="text-[10px] font-mono tracking-[0.25em] text-muted mb-4 uppercase">
              Why Switchy
            </div>
            <h2 className="font-serif text-3xl md:text-5xl italic">
              Built for simplicity
            </h2>
          </ScrollFadeSection>

          {/* Features Grid - has its own staggered scroll animations */}
          <FeaturesSectionWithHoverEffects />
        </div>
      </section>

      {/* ============================================
          SECTION 3: FAQ
          ============================================ */}
      <section className="relative bg-cream py-24 md:py-32 px-6">
        <div className="max-w-4xl mx-auto w-full">

          {/* FAQ Section */}
          <div className="mb-16 md:mb-24">
            <ScrollFadeSection className="text-center mb-12">
              <div className="text-[10px] font-mono tracking-[0.25em] text-muted mb-4 uppercase">
                Common Questions
              </div>
              <h2 className="font-serif text-3xl md:text-4xl italic">
                Frequently Asked
              </h2>
            </ScrollFadeSection>

            <ScrollFadeSection className="max-w-2xl mx-auto" delay={0.05}>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-0">
                  <AccordionTrigger className="text-base md:text-lg font-serif">
                    What is Switchy?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted leading-relaxed">
                    Switchy is a menu bar app for macOS that lets you share Magic accessories between your Macs—work and personal—with a single click. No cables, no unpairing, no digging through System Settings.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-base md:text-lg font-serif">
                    How does Switchy work?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted leading-relaxed">
                    Switchy sits in your menu bar and detects Magic Keyboards, Trackpads, and Mice connected to your Mac. When you click to switch a device, it seamlessly hands it over to your other Mac—no System Settings required.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-base md:text-lg font-serif">
                    What devices are supported?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted leading-relaxed">
                    Switchy supports all Apple Magic accessories: Magic Keyboard, Magic Keyboard with Touch ID, Magic Trackpad, and Magic Mouse. Compatible with all Macs running macOS 14.0 (Sonoma) and above.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-base md:text-lg font-serif">
                    Is my data private?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted leading-relaxed">
                    Absolutely. Switchy is local-first—all communication between your Macs happens directly over your local network. No data ever leaves your devices, and there are no accounts or cloud services involved.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-base md:text-lg font-serif">
                    Is it a lifetime license for all my Macs?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted leading-relaxed">
                    Yes! One purchase, yours forever. Install Switchy on every Mac you own—now and in the future—with no subscriptions or hidden fees.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-base md:text-lg font-serif">
                    Do I need to install Switchy on all my Macs?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted leading-relaxed">
                    Yes, Switchy needs to be installed on each Mac you want to switch devices between. The app automatically discovers other Macs running Switchy on your local network.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </ScrollFadeSection>
          </div>

          {/* CTA Card */}
          <ScrollFadeSection>
            <div className="bg-ink text-cream rounded-3xl p-8 md:p-12 text-center">
              <h3 className="font-serif text-2xl md:text-3xl mb-4">
                Ready to simplify your setup?
              </h3>
              <p className="text-cream/60 mb-8 max-w-md mx-auto">
                One menu bar app. All your Magic accessories. Every Mac you own.
              </p>
              <div className="flex justify-center">
                <button className="bg-cream text-ink px-8 py-4 rounded-full font-semibold hover:bg-cream/90 transition-colors duration-200">
                  Get Switchy — $9.99
                </button>
              </div>
            </div>
          </ScrollFadeSection>

          {/* Footer */}
          <ScrollFadeSection className="mt-12 text-center">
            <p className="text-muted/60 text-xs">
              © 2026 Mangobuns.
            </p>
          </ScrollFadeSection>

        </div>
      </section>
    </div>
  )
}
