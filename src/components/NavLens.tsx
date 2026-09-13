import { useEffect, useState } from 'react'
import { renderDisplacementMap } from 'liquid-glass-web-react'

// Replicates liquid-glass-web-react's filter chain as *backdrop* filters:
// each [data-glass] element becomes a lens, refracting the live page behind
// it (hero shader included) with per-channel chromatic aberration + a baked
// specular edge — the same displacement-map technique as the reference demo.

const STRENGTH = 0.08
const CHROMA = 0.5
const CURVATURE = 0.8
const DEPTH = 26
const SPECULAR = 1

const CHANNELS = [
  '1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0',
  '0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0',
  '0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0',
]

type Lens = { id: string; w: number; h: number; map: string }

export default function NavLens() {
  const [lenses, setLenses] = useState<Lens[]>([])

  useEffect(() => {
    const supported =
      CSS.supports('backdrop-filter', 'url("#x")') ||
      CSS.supports('-webkit-backdrop-filter', 'url("#x")')
    if (!supported) return

    const els = Array.from(
      document.querySelectorAll<HTMLElement>('[data-glass]'),
    )
    if (els.length === 0) return

    const build = (el: HTMLElement, i: number) => {
      const r = el.getBoundingClientRect()
      const w = Math.max(1, Math.round(r.width))
      const h = Math.max(1, Math.round(r.height))
      if (w <= 1 || h <= 1) return
      const map = renderDisplacementMap({
        size: 256,
        halfWidth: w / 2,
        halfHeight: h / 2,
        radius: h / 2,
        depth: DEPTH,
        domeDepth: CURVATURE * (h / 2),
        splay: 1,
        glow: 0.8,
        glowSpread: 1,
        glowExponent: 1.5,
        edgeHighlight: 0.8,
        edgeWidth: 3,
        edgeExponent: 1.5,
        specularAngle: 130,
      })
      const id = `glass-lens-${i}`
      setLenses((prev) => {
        const next = prev.filter((l) => l.id !== id)
        next.push({ id, w, h, map })
        return next.sort((a, b) => a.id.localeCompare(b.id))
      })
      el.style.backdropFilter = `url(#${id}) saturate(150%)`
      el.style.setProperty('-webkit-backdrop-filter', `url(#${id}) saturate(150%)`)
    }

    const ro = new ResizeObserver((entries) => {
      for (const e of entries) {
        const i = els.indexOf(e.target as HTMLElement)
        if (i >= 0) build(e.target as HTMLElement, i)
      }
    })
    els.forEach((el, i) => {
      build(el, i)
      ro.observe(el)
    })
    return () => ro.disconnect()
  }, [])

  return (
    <svg
      width="0"
      height="0"
      style={{ position: 'absolute' }}
      aria-hidden="true"
    >
      <defs>
        {lenses.map((lens) => {
          const s =
            (STRENGTH * Math.sqrt(lens.w * lens.w + lens.h * lens.h)) /
            Math.SQRT2
          const scales = [s * (1 + 0.2 * CHROMA), s * (1 + 0.1 * CHROMA), s]
          return (
            <filter
              key={lens.id}
              id={lens.id}
              filterUnits="userSpaceOnUse"
              primitiveUnits="userSpaceOnUse"
              x="0"
              y="0"
              width={lens.w}
              height={lens.h}
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodColor="rgb(128,128,128)" result="mapBg" />
              <feImage
                href={lens.map}
                preserveAspectRatio="none"
                x="0"
                y="0"
                width={lens.w}
                height={lens.h}
                result="rawMap"
              />
              <feComposite
                in="rawMap"
                in2="mapBg"
                operator="over"
                result="map"
              />
              {CHANNELS.map((_, i) => (
                <feDisplacementMap
                  key={`d${i}`}
                  in="SourceGraphic"
                  in2="map"
                  scale={scales[i]}
                  xChannelSelector="R"
                  yChannelSelector="G"
                  result={`disp${i}`}
                />
              ))}
              {CHANNELS.map((m, i) => (
                <feColorMatrix
                  key={`c${i}`}
                  in={`disp${i}`}
                  type="matrix"
                  values={m}
                  result={`ch${i}`}
                />
              ))}
              <feComposite
                in="ch0"
                in2="ch1"
                operator="arithmetic"
                k1="0"
                k2="1"
                k3="1"
                k4="0"
                result="rg"
              />
              <feComposite
                in="rg"
                in2="ch2"
                operator="arithmetic"
                k1="0"
                k2="1"
                k3="1"
                k4="0"
                result="lensResult"
              />
              <feColorMatrix
                in="map"
                type="matrix"
                values={`0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 1 0 ${-128 / 255}`}
                result="specMask"
              />
              <feComposite
                in="specMask"
                in2="lensResult"
                operator="arithmetic"
                k1="0"
                k2={SPECULAR}
                k3="1"
                k4="0"
              />
            </filter>
          )
        })}
      </defs>
    </svg>
  )
}
