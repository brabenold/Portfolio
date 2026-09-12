import { useEffect, useState } from 'react'
import { renderDisplacementMap } from 'liquid-glass-web-react'

// Replicates liquid-glass-web-react's filter chain as a *backdrop* filter:
// the nav pill itself is the lens, so the live page behind it (hero shader
// included) is refracted with per-channel chromatic aberration + a baked
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

export default function NavLens() {
  const [state, setState] = useState<{ w: number; h: number; map: string } | null>(
    null,
  )

  useEffect(() => {
    const nav = document.querySelector('[data-nav]')
    if (!nav) return

    const build = () => {
      const r = nav.getBoundingClientRect()
      const w = Math.max(1, Math.round(r.width))
      const h = Math.max(1, Math.round(r.height))
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
      setState({ w, h, map })
    }

    build()
    const ro = new ResizeObserver(build)
    ro.observe(nav)
    return () => ro.disconnect()
  }, [])

  if (!state) return null

  const { w, h, map } = state
  const s = (STRENGTH * Math.sqrt(w * w + h * h)) / Math.SQRT2
  const scales = [s * (1 + 0.2 * CHROMA), s * (1 + 0.1 * CHROMA), s]

  return (
    <svg
      width="0"
      height="0"
      style={{ position: 'absolute' }}
      aria-hidden="true"
    >
      <defs>
        <filter
          id="nav-lens"
          filterUnits="userSpaceOnUse"
          primitiveUnits="userSpaceOnUse"
          x="0"
          y="0"
          width={w}
          height={h}
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodColor="rgb(128,128,128)" result="mapBg" />
          <feImage
            href={map}
            preserveAspectRatio="none"
            x="0"
            y="0"
            width={w}
            height={h}
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
      </defs>
    </svg>
  )
}
