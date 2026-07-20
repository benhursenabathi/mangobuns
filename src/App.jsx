import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  IconArrowUpRight as ArrowUpRight,
  IconCheck as Check,
  IconCommand as Command,
  IconDeviceIpadHorizontal as RectangleHorizontal,
  IconDownload as Download,
  IconKeyboard as Keyboard,
  IconLock as Lock,
  IconMouse as Mouse,
  IconSparkles as Sparkles,
  IconWifi as Wifi,
} from '@tabler/icons-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { TextLoop } from '@/components/ui/text-loop'
import { SwitchingStory } from '@/components/SwitchingStory'

const CHECKOUT_URL = 'https://mangobuns.lemonsqueezy.com/checkout/buy/68fb31f9-8ae3-45db-bcc3-b7e49bec2817'
const DOWNLOAD_URL = `${import.meta.env.BASE_URL}downloads/Switchy.dmg`

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
    question: 'What is Switchy?',
    answer: 'Switchy is a menu bar app for macOS that lets you share Magic accessories between your work and personal Macs with a single click. No cables, no unpairing, no digging through System Settings.',
  },
  {
    question: 'How does the handoff work?',
    answer: 'Switchy runs on both Macs and discovers them over your local network. Choose a Mac from the menu bar and Switchy releases the selected accessories from one Mac, then connects them to the other.',
  },
  {
    question: 'Which accessories are supported?',
    answer: 'Magic Keyboard, Magic Keyboard with Touch ID, Magic Trackpad, and Magic Mouse are supported. Switchy works with Macs running macOS 14.0 Sonoma or newer.',
  },
  {
    question: 'Does it work with a closed MacBook?',
    answer: 'Yes. A MacBook connected to power can release its accessories while the lid is closed and the Mac is asleep, so your desk setup can stay exactly as it is.',
  },
  {
    question: 'Is my data private?',
    answer: 'The handoff happens locally between your Macs. Switchy has no accounts, analytics, or tracking. External connections are limited to license activation and software update checks.',
  },
  {
    question: 'What does one license include?',
    answer: 'A one-time $9.99 purchase unlocks Switchy for up to five Macs. There is no subscription, and every download starts with a full three-day free trial.',
  },
]

const DEVICE_LABELS = [
  { label: 'KEYBOARD', icon: Keyboard },
  { label: 'TRACKPAD', icon: RectangleHorizontal },
  { label: 'MOUSE', icon: Mouse },
]

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

      <motion.a className="nav-cta" href={DOWNLOAD_URL} whileTap={{ scale: 0.96 }}>
        Try free <Download size={15} strokeWidth={2} />
      </motion.a>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__aurora" aria-hidden="true" />
      <div className="hero__grid" aria-hidden="true" />
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
            <TextLoop className="hero__headline-loop" interval={HERO_WORD_LOOP.interval}>
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
          <motion.a className="button button--primary" href={DOWNLOAD_URL} whileTap={{ scale: 0.96 }}>
            Download free trial <Download size={17} strokeWidth={2.1} />
          </motion.a>
          <motion.a className="button button--ghost" href={CHECKOUT_URL} whileTap={{ scale: 0.96 }}>
            Buy once — $9.99
          </motion.a>
        </motion.div>
        <motion.div
          className="hero__meta"
          custom={0.42}
          initial="hidden"
          animate="visible"
          variants={HERO_ENTRANCE}
        >
          <span><Check size={13} /> 3-day trial</span>
          <span><Check size={13} /> Up to 5 Macs</span>
          <span><Check size={13} /> macOS 14+</span>
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
            <span>00:08</span>
          </div>
          <video autoPlay loop muted playsInline poster={`${import.meta.env.BASE_URL}how-it-works.gif`}>
            {/* Add public/switching-demo.mp4 later; the browser falls back to the current film. */}
            <source src={`${import.meta.env.BASE_URL}switching-demo.mp4`} type="video/mp4" />
            <source src={`${import.meta.env.BASE_URL}Macbook A.mp4`} type="video/mp4" />
          </video>
        </Reveal>
      </div>
    </section>
  )
}

function SwitchAllCard() {
  return (
    <article className="bento-card bento-card--wide bento-card--orange">
      <div className="bento-card__header">
        <h3>Switch everything at once.</h3>
        <p>Move a keyboard, trackpad, and mouse together—or choose only what you need.</p>
      </div>
      <div className="switch-command">
        <div className="switch-command__top">
          <span className="switch-command__app"><Command size={14} /> Switchy</span>
          <span className="switch-command__online"><i /> 2 Macs online</span>
        </div>
        <div className="switch-command__target">
          <span className="switch-command__mac-icon">M</span>
          <div><small>SWITCH TO</small><strong>Studio Mac</strong></div>
          <ArrowUpRight size={17} />
        </div>
        <div className="switch-command__devices">
          {DEVICE_LABELS.map(({ label, icon: Icon }) => (
            <div key={label}><Icon size={15} /><span>{label}</span><i /></div>
          ))}
        </div>
        <button type="button">Switch all devices <span>⌘↵</span></button>
      </div>
    </article>
  )
}

function Features() {
  return (
    <section className="features" id="features">
      <div className="section-shell">
        <Reveal className="section-heading section-heading--features">
          <div>
            <h2>No cables needed</h2>
          </div>
          <p>A tiny menu bar utility with an unusually large effect on a two-Mac desk.</p>
        </Reveal>

        <div className="bento-grid">
          <Reveal className="bento-reveal bento-reveal--wide"><SwitchAllCard /></Reveal>

          <Reveal className="bento-reveal" delay={0.05}>
            <article className="bento-card bento-card--night">
              <div className="bento-card__header">
                <h3>Asleep, not out.</h3>
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
                <span><Wifi size={18} /></span>
                <i /><i /><i />
                <span><Lock size={18} /></span>
              </div>
            </article>
          </Reveal>

          <Reveal className="bento-reveal bento-reveal--wide" delay={0.08}>
            <article className="bento-card bento-card--wide bento-card--license">
              <div className="license-copy">
                <h3>$9.99 once.<br />Five Macs forever.</h3>
                <p>Try every feature free for three days. Keep it with a single lifetime purchase.</p>
                <motion.a href={DOWNLOAD_URL} whileTap={{ scale: 0.96 }}>Try free <Download size={16} /></motion.a>
              </div>
              <div className="license-orbit" aria-hidden="true">
                <span className="license-orbit__center"><Sparkles size={24} /></span>
                {[1, 2, 3, 4, 5].map((index) => <i key={index} style={{ '--index': index }}>M{index}</i>)}
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
        <motion.a className="button button--light" href={DOWNLOAD_URL} whileTap={{ scale: 0.96 }}>
          Download Switchy <Download size={17} />
        </motion.a>
        <motion.a className="button button--outline" href={CHECKOUT_URL} whileTap={{ scale: 0.96 }}>
          Buy for $9.99 <ArrowUpRight size={17} />
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
