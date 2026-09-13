import { useEffect } from 'react'

// Z-stack parallax: elements tagged [data-depth] drift with the pointer and
// scroll at a rate proportional to their depth (0 = glued to background,
// 1 = frontmost). The glass pills end up sliding over different parts of the
// shader, which is also what makes the refraction read.
export default function DepthLayers() {
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>('[data-depth]'),
    )
    if (els.length === 0) return

    const layers = els.map((el) => ({
      el,
      depth: Number(el.dataset.depth) || 0,
      scale: el.dataset.scale ? Number(el.dataset.scale) : 1,
    }))

    let tx = 0
    let ty = 0
    let mx = 0
    let my = 0
    let raf = 0

    const onMove = (e: PointerEvent) => {
      mx = (e.clientX / window.innerWidth) * 2 - 1
      my = (e.clientY / window.innerHeight) * 2 - 1
    }

    const tick = () => {
      raf = requestAnimationFrame(tick)
      tx += (mx - tx) * 0.06
      ty += (my - ty) * 0.06
      const sy = window.scrollY
      for (const { el, depth, scale } of layers) {
        const dx = tx * depth * 16
        const dy = ty * depth * 11
        // scroll drift: deeper layers slide up less, so foreground rises.
        // frontmost layer (nav) is pinned — it already stays via fixed header.
        const drift = depth < 0.9 ? -Math.min(sy, 600) * depth * 0.06 : 0
        el.style.transform = `translate3d(${dx}px, ${dy + drift}px, 0)${
          scale !== 1 ? ` scale(${scale})` : ''
        }`
      }
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return null
}
