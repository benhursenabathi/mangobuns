import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  IconDownload as Download,
  IconLock as Lock,
} from '@tabler/icons-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { LiquidButton } from '@/components/ui/liquid-glass-button'
import { TextLoop } from '@/components/ui/text-loop'
import { DeviceAsset } from '@/components/MacBook'
import { SwitchingStory } from '@/components/SwitchingStory'
import { CableDissolve } from '@/components/CableDissolve'

const CHECKOUT_URL = 'https://mangobuns.lemonsqueezy.com/checkout/buy/68fb31f9-8ae3-45db-bcc3-b7e49bec2817'
const DOWNLOAD_URL = `${import.meta.env.BASE_URL}downloads/Switchy.dmg`
const PURCHASE_CTA = 'Get Switchy'
const TRIAL_CTA = 'Try free for 3 days'

const HERO_ENTRANCE = {
  hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, delay, ease: [0.2, 0, 0, 1] },
  }),
}

/* ─────────────────────────────────────────────────────────
 * HERO WORD LOOP
 *
 *    0ms   keyboard is visible
 * 2500ms   mouse slides in, keyboard slides out
 * 5000ms   trackpad slides in, mouse slides out
 * 7500ms   sequence returns to keyboard
 * ───────────────────────────────────────────────────────── */
const HERO_WORD_LOOP = {
  interval: 2.5,
  words: ['keyboard', 'mouse', 'trackpad'],
}

const FAQS = [
  {
    question: 'Is there a free trial?',
    answer: 'Yes — every new installation includes a 3-day, full-featured free trial. Download Switchy, install it on your Macs, and start switching right away. After the trial, a one-time $12.99 purchase unlocks it for good.',
  },
  {
    question: 'What is Switchy?',
    answer: 'Switchy is a menu bar app for macOS that lets you share Magic accessories between your Macs — work and personal — with a single click. No cables, no unpairing, no digging through System Settings.',
  },
  {
    question: 'How does Switchy work?',
    answer: 'Switchy sits in your menu bar and detects Magic Keyboards, Trackpads, and Mice connected to your Mac. When you click to switch a device, it seamlessly hands it over to your other Mac — no System Settings required.',
  },
  {
    question: 'What devices are supported?',
    answer: 'Switchy supports all Apple Magic accessories: Magic Keyboard, Magic Keyboard with Touch ID, Magic Trackpad, and Magic Mouse. Compatible with all Macs running macOS 14.0 (Sonoma) and above.',
  },
  {
    question: 'Is my data private?',
    answer: 'Switching is completely local — your Macs talk directly to each other over your local network, and no switching data ever leaves your devices. The only external connections Switchy makes are license activation and periodic validation with Lemon Squeezy (your license key and a device identifier) and software update checks. No analytics, no tracking, no accounts.',
  },
  {
    question: 'Is it a lifetime license for all my Macs?',
    answer: 'Yes — one purchase, yours forever, with no subscriptions or hidden fees. Each license covers up to 5 Macs at a time, and you can deactivate a Mac whenever you like to free up a slot for a new one.',
  },
  {
    question: 'Do I need to install Switchy on all my Macs?',
    answer: 'Yes, Switchy needs to be installed on each Mac you want to switch devices between. The app automatically discovers other Macs running Switchy on your local network.',
  },
]

const ONBOARDING_HERO_STEP = {
  title: 'Switch Everything at Once',
  image: 'Onboarding5.jpg',
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`site-nav ${scrolled ? 'site-nav--scrolled' : ''}`}>
      <a className="brand" href="#top" aria-label="Switchy home">
        <img src={`${import.meta.env.BASE_URL}icon_512x512.png`} alt="" />
        <span>Switchy</span>
      </a>

      <nav className="site-nav__links" aria-label="Main navigation">
        <a href="#how-it-works">How it works</a>
        <a href={`${import.meta.env.BASE_URL}compare/`}>Compare</a>
        <a href="#faq">FAQ</a>
      </nav>

      <LiquidButton className="nav-cta" href={CHECKOUT_URL}>
        {PURCHASE_CTA}
      </LiquidButton>
    </header>
  )
}

function Hero() {
  const [activeHeroDevice, setActiveHeroDevice] = useState(0)

  return (
    <section className="hero" id="top">
      <div className="hero__aurora" aria-hidden="true" />
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__devices" aria-hidden="true">
        <div className="hero-device hero-device--keyboard" data-active={activeHeroDevice === 0}>
          <DeviceAsset type="keyboard" />
        </div>
        <div className="hero-device hero-device--trackpad" data-active={activeHeroDevice === 2}>
          <DeviceAsset type="trackpad" />
        </div>
        <div className="hero-device hero-device--mouse" data-active={activeHeroDevice === 1}>
          <DeviceAsset type="mouse" />
        </div>
      </div>
      <div className="hero__copy">
        <motion.div
          className="hero__eyebrow"
          custom={0.08}
          initial="hidden"
          animate="visible"
          variants={HERO_ENTRANCE}
        >
          <i /> Built for multi-Mac desks
        </motion.div>
        <motion.h1
          aria-label="One keyboard, mouse, or trackpad. For every Mac."
          custom={0.16}
          initial="hidden"
          animate="visible"
          variants={HERO_ENTRANCE}
        >
          <span className="hero__headline-first" aria-hidden="true">
            <span>One</span>
            <TextLoop
              className="hero__headline-loop"
              interval={HERO_WORD_LOOP.interval}
              onIndexChange={setActiveHeroDevice}
            >
              {HERO_WORD_LOOP.words.map((word) => <span key={word}>{word}.</span>)}
            </TextLoop>
          </span>
          <span className="hero__headline-second" aria-hidden="true">For every Mac.</span>
        </motion.h1>
        <motion.p custom={0.25} initial="hidden" animate="visible" variants={HERO_ENTRANCE}>
          Switch your Magic Keyboard, Trackpad, and Mouse between Macs without touching Bluetooth settings.
        </motion.p>
        <motion.div
          className="hero__actions"
          custom={0.34}
          initial="hidden"
          animate="visible"
          variants={HERO_ENTRANCE}
        >
          <motion.a className="button button--primary" href={CHECKOUT_URL} whileTap={{ scale: 0.96 }}>
            {PURCHASE_CTA}
          </motion.a>
        </motion.div>
      </div>

    </section>
  )
}

function Reveal({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24, filter: 'blur(5px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.65, delay, ease: [0.2, 0, 0, 1] }}
    >
      {children}
    </motion.div>
  )
}

function DemoSection() {
  return (
    <section className="demo-section" id="how-it-works">
      <div className="section-shell">
        <Reveal className="section-heading section-heading--split">
          <div>
            <h2>Click once.<br />Start Working.</h2>
          </div>
        </Reveal>

        <Reveal className="demo-frame" delay={0.08}>
          <div className="demo-frame__chrome">
            <span><i /><i /><i /></span>
            <strong>SWITCHY / LIVE DEMO</strong>
            <span>00:24</span>
          </div>
          <video autoPlay loop muted playsInline preload="metadata" poster={`${import.meta.env.BASE_URL}how-it-works.gif`}>
            <source src={`${import.meta.env.BASE_URL}switchy-demo.mp4`} type="video/mp4" />
          </video>
        </Reveal>
      </div>
    </section>
  )
}

function SwitchAllCard() {
  return (
    <article className="bento-card bento-card--wide bento-card--onboarding">
      <div className="bento-card__header">
        <h3>Switch everything at once.</h3>
        <p>Keyboard, trackpad, and mouse — move them all with a single click.</p>
      </div>
      <div className="onboarding-demo">
        <div className="onboarding-demo__frame">
          <div className="onboarding-demo__screen onboarding-demo__screen--menu-focus">
            <img
              src={`${import.meta.env.BASE_URL}images/onboarding/${ONBOARDING_HERO_STEP.image}`}
              alt={ONBOARDING_HERO_STEP.title}
              loading="lazy"
              decoding="async"
              draggable="false"
            />
          </div>
          <span className="onboarding-demo__chin" aria-hidden="true" />
        </div>
      </div>
    </article>
  )
}

function Features() {
  return (
    <section className="features" id="features">
      <div className="section-shell">
        <CableDissolve />

        <div className="bento-grid bento-grid--after-cable">
          <Reveal className="bento-reveal bento-reveal--wide"><SwitchAllCard /></Reveal>

          <Reveal className="bento-reveal" delay={0.05}>
            <article className="bento-card bento-card--night">
              <div className="bento-card__header">
                <h3>Switch with lid closed</h3>
                <p>A powered MacBook can release its accessories without opening the lid.</p>
              </div>
              <div className="sleep-visual" aria-hidden="true">
                <img
                  className="sleep-visual__image"
                  src={`${import.meta.env.BASE_URL}images/macbook-closed-night.jpg`}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  draggable="false"
                />
              </div>
            </article>
          </Reveal>

          <Reveal className="bento-reveal" delay={0.1}>
            <article className="bento-card bento-card--local">
              <div className="bento-card__header">
                <h3>Your desk stays private.</h3>
                <p>No account, tracking, or cloud relay. Your Macs speak directly.</p>
              </div>
              <div className="local-visual" aria-hidden="true">
                <span className="local-visual__lock"><Lock size={52} strokeWidth={1.5} /></span>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  return (
    <section className="faq" id="faq">
      <div className="section-shell faq__grid">
        <Reveal className="faq__intro">
          <h2>FAQ</h2>
          <p>Still wondering if Switchy fits your setup? These are the questions most multi-Mac users ask first.</p>
        </Reveal>

        <Reveal className="faq__list" delay={0.08}>
          <Accordion type="single" collapsible>
            {FAQS.map((item, index) => (
              <AccordionItem value={`faq-${index}`} key={item.question}>
                <AccordionTrigger>
                  <span className="faq__question">{item.question}</span>
                </AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  )
}

function FinalCTA() {
  return (
    <section className="final-cta">
      <div className="final-cta__glow" aria-hidden="true" />
      <h2>Switch your magic accessories<br />between Macs</h2>
      <p>Start with a full three-day trial. No account required.</p>
      <div className="final-cta__actions">
        <motion.a className="button button--light" href={CHECKOUT_URL} whileTap={{ scale: 0.96 }}>
          {PURCHASE_CTA}
        </motion.a>
        <motion.a className="button button--outline" href={DOWNLOAD_URL} whileTap={{ scale: 0.96 }}>
          {TRIAL_CTA} <Download size={17} />
        </motion.a>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="brand">
        <img src={`${import.meta.env.BASE_URL}icon_512x512.png`} alt="" />
        <span>Switchy</span>
      </div>
      <p>One setup. Every Mac.</p>
      <nav aria-label="Footer navigation">
        <a href={`${import.meta.env.BASE_URL}compare/`}>Compare</a>
        <a href={`${import.meta.env.BASE_URL}blog/`}>Blog</a>
        <a href={`${import.meta.env.BASE_URL}privacy/`}>Privacy</a>
      </nav>
      <span>© 2026 Mangobuns</span>
    </footer>
  )
}

export default function App() {
  return (
    <div className="site">
      <Navbar />
      <main>
        <Hero />
        <SwitchingStory />
        <DemoSection />
        <Features />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}
