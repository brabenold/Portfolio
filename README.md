# Andru — Personal Portfolio

High-fidelity personal portfolio for **Brock-Andrew Rabenold** (aka Andru).

Pure liquid-glass aesthetic: an interactive WebGL shader hero (domain-warped
FBM refraction with specular highlights, caustics and a pointer lens),
Apple-product-page typography, frosted-glass bento grid, and a seamless
dark/light mode — frosted materials adapt across both.

## Stack

- React 19 + TypeScript + Vite 8
- Tailwind CSS 4 (`@tailwindcss/vite`)
- Hand-rolled WebGL1 fragment shader — no three.js dependency

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
```

Requires Node 20.19+ or 22.12+.

## Build / Lint

```bash
npm run build      # tsc -b && vite build → dist/
npm run lint       # oxlint
```

## Structure

| Path | What |
| --- | --- |
| `src/components/LiquidGlass.tsx` | Interactive liquid-glass shader (hero background) |
| `src/components/Nav.tsx` | Floating frosted-glass nav + theme toggle |
| `src/components/Hero.tsx` | Hero typography + Memoji badge |
| `src/components/Bento.tsx` | Work / Projects / Skills bento grid with CSS mockups |
| `src/components/Footer.tsx` | Connect section + social links |
| `src/components/Reveal.tsx` | IntersectionObserver scroll reveals |
| `src/theme.ts` | Dark/light mode hook (system-aware, persisted) |

`public/memoji.png` is an AI-generated Memoji-style avatar.
