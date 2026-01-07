import { useState, useEffect } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


// --- Navbar Component ---
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-4 bg-cream/80 backdrop-blur-md' : 'py-8'
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


// --- Main App Component ---
export default function App() {

  return (
    <div className="relative bg-cream text-ink font-sans noise-overlay">
      <Navbar />

      {/* ============================================
          SECTION 1: CLEAN HERO
          Only rotating ring + text, no Macs
          ============================================ */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6 relative overflow-hidden">


        {/* Hero Content - On Top */}
        <div className="relative z-10 text-center">
          <div className="flex justify-center mb-8">
            <div className="inline-block px-4 py-2 rounded-full border border-ink/10 bg-cream/90 backdrop-blur-sm text-sm font-medium tracking-wide">
              For Mac power users
            </div>
          </div>
          <h1 className="text-manifesto mb-6">
            One keyboard.<br />
            <span className="italic">Every</span> Mac.
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
          SECTION 2: HOW IT WORKS
          GIF demonstration
          ============================================ */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="text-[10px] font-mono tracking-[0.25em] text-muted mb-4 uppercase">
              See it in action
            </div>
            <h2 className="font-serif text-3xl md:text-5xl italic">
              How it works
            </h2>
          </div>

          {/* GIF Container */}
          <div className="relative rounded-2xl md:rounded-3xl overflow-hidden bg-[#f5f4f1] shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
            <img
              src="/how-it-works.gif"
              alt="Switchy demonstration - switching Magic devices between Macs"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 3: CTA & FOOTER
          ============================================ */}
      <section className="relative bg-cream py-24 md:py-32 px-6">
        <div className="max-w-4xl mx-auto w-full">

          {/* FAQ Section */}
          <div className="mb-16 md:mb-24">
            <div className="text-center mb-12">
              <div className="text-[10px] font-mono tracking-[0.25em] text-muted mb-4 uppercase">
                Common Questions
              </div>
              <h2 className="font-serif text-3xl md:text-4xl italic">
                Frequently Asked
              </h2>
            </div>

            <div className="max-w-2xl mx-auto">
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
                    Switchy supports all Apple Magic accessories: Magic Keyboard, Magic Keyboard with Touch ID, Magic Trackpad, and Magic Mouse. Both Intel and Apple Silicon Macs are fully supported.
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
