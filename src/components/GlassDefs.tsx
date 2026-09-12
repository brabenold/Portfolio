import { useEffect } from 'react'

// Shared SVG filter defs for the liquid-glass material.
// feTurbulence + feDisplacementMap refract the element's backdrop the same
// way the hero shader bends its background — wavy edges, real refraction.
export default function GlassDefs() {
  useEffect(() => {
    // pointer-tracked sheen: one delegated listener drives --mx/--my on
    // whichever .liquid-glass element the pointer is over
    const onMove = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.(
        '.liquid-glass, .nav-liquid',
      )
      if (!(el instanceof HTMLElement)) return
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${e.clientX - r.left}px`)
      el.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
    document.addEventListener('pointermove', onMove, { passive: true })
    return () => document.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <svg
      width="0"
      height="0"
      style={{ position: 'absolute' }}
      aria-hidden="true"
    >
      <defs>
        <filter
          id="liquid-glass"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.008 0.011"
            numOctaves="2"
            seed="8"
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="1.8" result="soft" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="soft"
            scale="72"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  )
}
