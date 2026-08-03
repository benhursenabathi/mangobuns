import * as React from 'react'
import { cva } from 'class-variance-authority'

/**
 * This is the JSX equivalent of the supplied shadcn/cva component. The
 * project is JSX-first, so the visual API is kept small and focused on the
 * one liquid CTA that needs it.
 */
export const liquidbuttonVariants = cva(
  'liquid-button inline-flex items-center justify-center whitespace-nowrap',
  {
    variants: {
      variant: {
        default: '',
      },
      size: {
        default: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export const LiquidButton = React.forwardRef(function LiquidButton(
  { href, className, children, variant, size, ...props },
  ref,
) {
  const Component = href ? 'a' : 'button'

  return (
    <Component
      ref={ref}
      href={href}
      className={liquidbuttonVariants({ variant, size, className })}
      data-slot="button"
      {...props}
    >
      <span className="liquid-button__surface" aria-hidden="true" />
      <span className="liquid-button__backdrop" aria-hidden="true" />
      <span className="liquid-button__content">{children}</span>
      <GlassFilter />
    </Component>
  )
})

function GlassFilter() {
  return (
    <svg
      className="liquid-button__filter"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <filter
          id="switchy-liquid-glass"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05 0.05"
            numOctaves="1"
            seed="1"
            result="turbulence"
          />
          <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurredNoise"
            scale="70"
            xChannelSelector="R"
            yChannelSelector="B"
            result="displaced"
          />
          <feGaussianBlur in="displaced" stdDeviation="4" result="finalBlur" />
          <feComposite in="finalBlur" in2="finalBlur" operator="over" />
        </filter>
      </defs>
    </svg>
  )
}
