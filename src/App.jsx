import { useState, useEffect, useRef } from 'react'

// --- Custom Hook for Scroll Progress ---
// Only tracks progress within the animation container (400vh)
const useScrollProgress = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const winHeight = window.innerHeight
      // Animation container is 400vh, so total scrollable area for animation is 300vh (400vh - 100vh viewport)
      const animationScrollHeight = winHeight * 3

      if (animationScrollHeight <= 0) {
        setProgress(0)
        return
      }

      const current = window.scrollY
      // Clamp progress to animation section only
      const val = current / animationScrollHeight
      setProgress(Number.isFinite(val) ? Math.min(Math.max(val, 0), 1) : 0)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return progress
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
        {/* Screen */}
        <rect x="20" y="10" width="160" height="100" rx="8" fill="#1a1a1a" />
        <rect x="28" y="18" width="144" height="84" rx="4" fill="#2a2a2a" />
        {/* Notch */}
        <rect x="88" y="10" width="24" height="6" rx="2" fill="#1a1a1a" />
        {/* Base */}
        <path d="M0 110 L20 110 L20 110 L180 110 L200 110 L200 130 Q200 138 192 138 L8 138 Q0 138 0 130 Z" fill="#e5e5e5" />
        <rect x="70" y="115" width="60" height="6" rx="3" fill="#d4d4d4" />
      </svg>
    )
  }

  if (type === 'imac') {
    return (
      <svg viewBox="0 0 200 180" className={className} fill="none">
        {/* Screen */}
        <rect x="10" y="10" width="180" height="110" rx="10" fill="#1a1a1a" />
        <rect x="18" y="18" width="164" height="94" rx="6" fill="#2a2a2a" />
        {/* Chin */}
        <rect x="10" y="120" width="180" height="20" rx="0" fill="#e5e5e5" />
        <rect x="10" y="136" width="180" height="4" rx="2" fill="#f5f5f5" />
        {/* Stand */}
        <path d="M85 140 L115 140 L110 170 L90 170 Z" fill="#d4d4d4" />
        {/* Base */}
        <ellipse cx="100" cy="172" rx="40" ry="8" fill="#e5e5e5" />
      </svg>
    )
  }

  return null
}

// --- Magic Trackpad SVG Component ---
const MagicTrackpad = ({ className = '', style = {} }) => (
  <svg viewBox="0 0 100 70" className={className} style={style} fill="none">
    <rect x="5" y="5" width="90" height="60" rx="8" fill="#f5f5f5" stroke="#e0e0e0" strokeWidth="2" />
    <rect x="12" y="12" width="76" height="46" rx="4" fill="#fafafa" />
    {/* Subtle surface texture */}
    <circle cx="50" cy="35" r="20" fill="#f8f8f8" opacity="0.5" />
  </svg>
)

// --- Main App Component ---
export default function App() {
  const scrollProgress = useScrollProgress()
  const pathRef = useRef(null)

  const [handPos, setHandPos] = useState({ x: 0, y: 0, rotation: 0 })
  const [isGrabbing, setIsGrabbing] = useState(false)
  const [hasDeposited, setHasDeposited] = useState(false)

  // Calculate hand position along path based on scroll
  useEffect(() => {
    const path = pathRef.current
    if (!path || typeof path.getTotalLength !== 'function') return

    try {
      const pathLength = path.getTotalLength()
      if (pathLength === 0) return

      // Map scroll progress to path position (start at 10%, end at 90%)
      let adjustedProgress = (scrollProgress - 0.08) * 1.2
      adjustedProgress = Math.min(Math.max(adjustedProgress, 0), 1)
      if (!Number.isFinite(adjustedProgress)) adjustedProgress = 0

      const point = path.getPointAtLength(adjustedProgress * pathLength)

      // Calculate rotation for natural movement
      const nextDist = Math.min((adjustedProgress + 0.01) * pathLength, pathLength)
      const nextPoint = path.getPointAtLength(nextDist)
      const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI)

      setHandPos({ x: point.x, y: point.y, rotation: angle })

      // Grabbing states
      if (adjustedProgress > 0.05 && adjustedProgress < 0.92) {
        setIsGrabbing(true)
        setHasDeposited(false)
      } else if (adjustedProgress >= 0.92) {
        setIsGrabbing(false)
        setHasDeposited(true)
      } else {
        setIsGrabbing(false)
        setHasDeposited(false)
      }
    } catch (error) {
      console.error('Animation error:', error)
    }
  }, [scrollProgress])

  return (
    <div className="relative bg-cream text-ink font-sans noise-overlay">
      <Navbar />

      {/* Scroll Container - 400vh for 4 animation sections */}
      <div className="relative h-[400vh]">

        {/* Sticky Visual Layer */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex justify-center items-center z-0">

          {/* SVG Canvas */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1200 800"
            preserveAspectRatio="xMidYMid slice"
          >
            {/* Filter for hand-drawn effect */}
            <defs>
              <filter id="rough" x="-10%" y="-10%" width="120%" height="120%">
                <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
              </filter>
            </defs>

            {/* The curved path - hand-drawn style */}
            <path
              ref={pathRef}
              d="M 180,280 C 350,220 450,350 600,400 S 850,480 1020,520"
              fill="none"
              stroke="#1a1a1a"
              strokeOpacity="0.12"
              strokeWidth="2"
              strokeDasharray="12 8"
              strokeLinecap="round"
              className="hand-drawn-path"
            />

            {/* The Moving Hand + Trackpad */}
            <g
              style={{
                transform: `translate(${handPos.x}px, ${handPos.y}px) rotate(${handPos.rotation}deg)`
              }}
              className="transition-transform duration-100 will-change-transform"
            >
              {/* Carried Trackpad */}
              <foreignObject
                width="60"
                height="42"
                x="-15"
                y="15"
                className={`transition-all duration-300 ${isGrabbing ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
              >
                <div className="w-full h-full bg-[#f5f5f5] border border-[#e0e0e0] rounded-lg shadow-xl"
                  style={{ transform: 'rotate(8deg)' }}
                />
              </foreignObject>

              {/* Hand Cursor */}
              <g className={`transition-transform duration-200 ${isGrabbing ? 'scale-90' : 'scale-100'}`}>
                <circle cx="0" cy="0" r="22" fill="#1a1a1a" />
                <text
                  x="0"
                  y="2"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="18"
                >
                  {isGrabbing ? '✊' : '👋'}
                </text>
              </g>
            </g>
          </svg>

          {/* Source Mac (Top Left) */}
          <div className="absolute top-[18%] left-[8%] md:left-[12%] w-48 md:w-64 lg:w-72">
            <div className="relative group">
              <MacDevice type="macbook" className="w-full h-auto drop-shadow-2xl" />
              <div className="absolute -bottom-8 left-0 right-0 text-center">
                <span className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase">
                  MacBook Pro
                </span>
              </div>

              {/* Trackpad sitting on source Mac */}
              <div
                className={`absolute top-[55%] left-[50%] -translate-x-1/2 -translate-y-1/2
                  w-16 h-11 bg-[#f5f5f5] border border-[#e0e0e0] rounded-lg shadow-lg
                  transition-all duration-500 ${isGrabbing || hasDeposited ? 'opacity-0 scale-75' : 'opacity-100 scale-100'}`}
              />
            </div>
          </div>

          {/* Destination Mac (Bottom Right) */}
          <div className="absolute bottom-[18%] right-[8%] md:right-[12%] w-48 md:w-64 lg:w-72">
            <div className="relative group">
              <MacDevice type="imac" className="w-full h-auto drop-shadow-2xl" />
              <div className="absolute -bottom-8 left-0 right-0 text-center">
                <span className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase">
                  iMac
                </span>
              </div>

              {/* Trackpad appearing on destination Mac */}
              <div
                className={`absolute bottom-[35%] left-[50%] -translate-x-1/2
                  w-16 h-11 bg-[#f5f5f5] border border-[#e0e0e0] rounded-lg shadow-lg
                  transition-all duration-700 ${hasDeposited ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}
              />
            </div>
          </div>

        </div>

        {/* Text Scroll Layer */}
        <div className="absolute top-0 left-0 w-full pointer-events-none z-10">

          {/* Section 1: Hero */}
          <div className="h-screen flex flex-col justify-center items-center px-6">
            <div className="inline-block px-4 py-2 rounded-full border border-ink/10 bg-cream/90 backdrop-blur-sm mb-8 text-sm font-medium tracking-wide pointer-events-auto">
              For Mac power users
            </div>
            <h1 className="text-manifesto mb-6">
              Your Magic devices<br />
              <span className="italic">shouldn't</span> be tethered.
            </h1>
            <p className="text-lg md:text-xl text-muted max-w-md text-center font-light">
              One click to switch your keyboard, trackpad, and mouse between Macs.
            </p>
          </div>

          {/* Section 2: The Problem */}
          <div className="h-screen flex flex-col justify-center items-center px-6">
            <h2 className="text-manifesto-secondary max-w-3xl">
              No more System Settings.<br />
              <span className="text-ink">No more unpairing.</span><br />
              No more waiting.
            </h2>
          </div>

          {/* Section 3: The Action */}
          <div className="h-screen flex flex-col justify-center items-center px-6">
            <h2 className="text-manifesto max-w-4xl">
              Pick up your workflow<br />
              <span className="text-muted italic">on one Mac...</span>
            </h2>
          </div>

          {/* Section 4: The Completion */}
          <div className="h-screen flex flex-col justify-center items-center px-6">
            <h2 className="text-manifesto max-w-4xl">
              <span className="text-muted italic">...and continue</span><br />
              on another.
            </h2>
          </div>

        </div>

      </div>

      {/* CTA Section - Outside the scroll animation container */}
      <div className="relative bg-cream py-24 md:py-32 px-6">
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
      </div>
    </div>
  )
}
