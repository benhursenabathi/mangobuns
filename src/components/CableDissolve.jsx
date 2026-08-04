import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import cableImageUrl from '../../Assets/Cable image.png'

gsap.registerPlugin(ScrollTrigger)

const clamp = (value, min = 0, max = 1) => Math.min(Math.max(value, min), max)
const ramp = (value, start, end) => clamp((value - start) / (end - start))
const smoothstep = (edge0, edge1, value) => {
  const progress = ramp(value, edge0, edge1)
  return progress * progress * (3 - 2 * progress)
}

// Stable random values keep every fragment on the same path when scroll reverses.
const seededRandom = (seed) => {
  let value = seed >>> 0
  return () => {
    value += 0x6D2B79F5
    let result = value
    result = Math.imul(result ^ (result >>> 15), result | 1)
    result ^= result + Math.imul(result ^ (result >>> 7), result | 61)
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296
  }
}

const createCableField = (image, isMobile) => {
  // Keep enough source pixels to render the supplied PNG at its native detail.
  // The smaller mobile working size is still close to 2x its displayed width.
  const width = isMobile ? Math.min(image.naturalWidth, 1100) : image.naturalWidth
  const height = Math.round(width * image.naturalHeight / image.naturalWidth)
  const raw = document.createElement('canvas')
  raw.width = width
  raw.height = height

  const rawContext = raw.getContext('2d', { willReadFrequently: true })
  rawContext.drawImage(image, 0, 0, width, height)
  const rawPixels = rawContext.getImageData(0, 0, width, height)

  const particles = []
  const step = 4
  const random = seededRandom(isMobile ? 2317 : 7919)

  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      const pixelIndex = (y * width + x) * 4
      // The supplied asset is already beautifully cut out. Its native alpha is
      // the most accurate possible particle mask and preserves every soft edge.
      const alpha = rawPixels.data[pixelIndex + 3] / 255
      if (alpha < 0.035) continue

      const bottomToTop = 1 - y / height
      const start = clamp(0.045 + bottomToTop * 0.51 + (random() - 0.5) * 0.1, 0.02, 0.62)
      const sideForce = (x / width - 0.5) * (66 + random() * 38)

      particles.push({
        x: x + step / 2,
        y: y + step / 2,
        cellX: x,
        cellY: y,
        red: rawPixels.data[pixelIndex],
        green: rawPixels.data[pixelIndex + 1],
        blue: rawPixels.data[pixelIndex + 2],
        alpha,
        size: step * (0.8 + random() * 0.55),
        start,
        duration: 0.25 + random() * 0.12,
        velocityX: sideForce + (random() - 0.5) * 155,
        velocityY: random() < 0.18 ? -25 - random() * 65 : 35 + random() * 150,
        growth: 0.15 + random() * 0.95,
        flutter: (random() - 0.5) * 18,
      })
    }
  }

  return { source: raw, particles, width, height, step }
}

export function CableDissolve() {
  const sectionRef = useRef(null)
  const stickyRef = useRef(null)
  const canvasRef = useRef(null)
  const promptRef = useRef(null)
  const headingRef = useRef(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const sticky = stickyRef.current
    const canvas = canvasRef.current
    if (!section || !sticky || !canvas) return undefined

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reducedMotion.matches) return undefined

    let field
    let resizeObserver
    let scrollTrigger
    let disposed = false
    let progress = 0
    const context = canvas.getContext('2d')
    const image = new Image()
    image.decoding = 'async'

    const sizeCanvas = () => {
      const bounds = sticky.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 1.6)
      const width = Math.max(1, Math.round(bounds.width * dpr))
      const height = Math.max(1, Math.round(bounds.height * dpr))
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
      }
      return { width: bounds.width, height: bounds.height, dpr }
    }

    const render = (nextProgress) => {
      if (!field || disposed) return
      progress = clamp(nextProgress)
      const surface = sizeCanvas()
      const { width, height, dpr } = surface
      const imageScale = Math.min(
        (width * (width <= 760 ? 0.98 : 0.9)) / field.width,
        (height * (width <= 760 ? 0.62 : 0.72)) / field.height,
      )
      const imageWidth = field.width * imageScale
      const imageHeight = field.height * imageScale
      const originX = (width - imageWidth) / 2
      const originY = Math.max(74, (height - imageHeight) * 0.46)
      // Clear the last silhouette as the upper edge dissolves so the product
      // cards can take over without a lingering end-state frame.
      const sceneFade = 1 - smoothstep(0.74, 0.9, progress)
      const cornerRadius = 28 / imageScale

      context.setTransform(1, 0, 0, 1, 0, 0)
      context.clearRect(0, 0, canvas.width, canvas.height)
      context.setTransform(
        dpr * imageScale,
        0,
        0,
        dpr * imageScale,
        dpr * originX,
        dpr * originY,
      )
      context.save()
      context.beginPath()
      context.roundRect(0, 0, field.width, field.height, cornerRadius)
      context.clip()
      context.globalAlpha = sceneFade
      context.drawImage(field.source, 0, 0)
      context.restore()

      context.globalCompositeOperation = 'destination-out'
      for (const particle of field.particles) {
        if (progress <= particle.start) continue
        context.fillRect(
          particle.cellX - 0.6,
          particle.cellY - 0.6,
          field.step + 1.2,
          field.step + 1.2,
        )
      }

      context.globalCompositeOperation = 'source-over'
      for (const particle of field.particles) {
        const localProgress = clamp((progress - particle.start) / particle.duration)
        if (localProgress <= 0 || localProgress >= 1) continue

        const eased = 1 - (1 - localProgress) ** 3
        const opacity = particle.alpha * (1 - smoothstep(0.34, 1, localProgress)) * sceneFade
        const x = particle.x + particle.velocityX * eased + Math.sin(eased * Math.PI * 3) * particle.flutter
        const y = particle.y + particle.velocityY * eased + 78 * eased * eased
        const size = particle.size * (1 + particle.growth * eased)

        context.globalAlpha = opacity
        context.fillStyle = `rgb(${particle.red} ${particle.green} ${particle.blue})`
        context.fillRect(x - size / 2, y - size / 2, size, size)
      }

      context.globalAlpha = 1
      context.globalCompositeOperation = 'source-over'
      if (sceneFade > 0) {
        const outlineInset = 0.5 / imageScale
        context.beginPath()
        context.roundRect(
          outlineInset,
          outlineInset,
          field.width - outlineInset * 2,
          field.height - outlineInset * 2,
          cornerRadius,
        )
        context.globalAlpha = sceneFade
        context.lineWidth = 1 / imageScale
        context.strokeStyle = 'rgba(255, 255, 255, 0.1)'
        context.stroke()
        context.globalAlpha = 1
      }
      context.setTransform(1, 0, 0, 1, 0, 0)

      const promptProgress = 1 - smoothstep(0.09, 0.31, progress)
      if (promptRef.current) {
        gsap.set(promptRef.current, {
          opacity: promptProgress,
          y: -8 * (1 - promptProgress),
        })
      }

      const headingProgress = 1 - smoothstep(
        window.innerWidth <= 760 ? 0.52 : 0.72,
        window.innerWidth <= 760 ? 0.75 : 0.9,
        progress,
      )
      if (headingRef.current) {
        const headingExit = 1 - headingProgress
        gsap.set(headingRef.current, {
          autoAlpha: headingProgress,
          y: -26 * headingExit,
          filter: `blur(${3 * headingExit}px)`,
        })
      }
    }

    const initialise = async () => {
      try {
        image.src = cableImageUrl
        await image.decode()
        if (disposed) return

        field = createCableField(image, window.innerWidth <= 760)
        section.dataset.ready = 'true'
        resizeObserver = new ResizeObserver(() => render(progress))
        resizeObserver.observe(sticky)
        scrollTrigger = ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: ({ progress: nextProgress }) => render(nextProgress),
          onRefresh: ({ progress: nextProgress }) => render(nextProgress),
        })
        render(scrollTrigger.progress)
        ScrollTrigger.refresh()
      } catch {
        // The original image remains visible if canvas preparation is unavailable.
      }
    }

    initialise()

    return () => {
      disposed = true
      resizeObserver?.disconnect()
      scrollTrigger?.kill()
    }
  }, [])

  return (
    <section className="cable-story" ref={sectionRef} aria-label="A cable dissolving to show that Switchy works wirelessly">
      <div className="cable-story__sticky" ref={stickyRef}>
        <div className="cable-story__heading" ref={headingRef}>
          <h2>No cables needed</h2>
        </div>
        <div className="cable-story__glow" aria-hidden="true" />
        <img
          className="cable-story__fallback"
          src={cableImageUrl}
          alt="A USB-C cable, ready to be left behind"
          draggable="false"
        />
        <canvas className="cable-story__canvas" ref={canvasRef} aria-hidden="true" />

        <div className="cable-story__prompt" ref={promptRef} aria-hidden="true">
          <span>Keep scrolling</span>
          <i />
          <strong>Let the cable go</strong>
        </div>

      </div>
    </section>
  )
}
