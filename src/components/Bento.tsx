import type { ReactNode } from 'react'
import Reveal from './Reveal'

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-sm font-semibold tracking-[0.18em] text-indigo-500 uppercase dark:text-indigo-300">
      {children}
    </p>
  )
}

function Heading({ children }: { children: ReactNode }) {
  return (
    <h2 className="tracking-hero mt-2 text-3xl font-semibold text-neutral-900 sm:text-4xl dark:text-white">
      {children}
    </h2>
  )
}

function Card({
  className = '',
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <div className={`glass-card rounded-[28px] p-7 ${className}`}>{children}</div>
  )
}

/* ---------------- Mockups ---------------- */

function TidepoolMockup() {
  return (
    <div className="mt-5 overflow-hidden rounded-xl border border-black/5 bg-white/70 shadow-sm dark:border-white/10 dark:bg-white/[0.06]">
      <div className="flex items-center gap-1.5 border-b border-black/5 px-3 py-2 dark:border-white/10">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-[10px] font-medium text-neutral-400">Tidepool</span>
      </div>
      <div className="flex">
        <div className="w-20 shrink-0 space-y-1.5 border-r border-black/5 p-2.5 dark:border-white/10">
          {['Today', 'Tides', 'Focus', 'Vault'].map((s, i) => (
            <div
              key={s}
              className={`rounded-md px-2 py-1 text-[10px] font-medium ${
                i === 0
                  ? 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-300'
                  : 'text-neutral-400'
              }`}
            >
              {s}
            </div>
          ))}
        </div>
        <div className="flex-1 space-y-2 p-3">
          {[0.9, 0.65, 0.8].map((w, i) => (
            <div key={i} className="flex items-center gap-2">
              <span
                className={`h-2 w-2 rounded-full ${
                  ['bg-teal-400', 'bg-indigo-400', 'bg-pink-400'][i]
                }`}
              />
              <div
                className="h-2 rounded-full bg-neutral-200/80 dark:bg-white/10"
                style={{ width: `${w * 100}%` }}
              />
            </div>
          ))}
          <div className="mt-3 flex gap-2">
            <div className="h-12 flex-1 rounded-lg bg-gradient-to-br from-teal-300/60 to-indigo-300/60 dark:from-teal-500/30 dark:to-indigo-500/30" />
            <div className="h-12 flex-1 rounded-lg bg-gradient-to-br from-pink-300/60 to-amber-200/60 dark:from-pink-500/25 dark:to-amber-400/20" />
          </div>
        </div>
      </div>
    </div>
  )
}

function IslandMockup() {
  return (
    <div className="mt-6 flex justify-center">
      <div className="group flex h-9 w-32 cursor-default items-center justify-between rounded-full bg-black px-3 text-white shadow-lg transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:w-56 dark:bg-neutral-900 dark:ring-1 dark:ring-white/15">
        <span className="h-4 w-4 shrink-0 rounded-full bg-gradient-to-br from-rose-400 to-orange-400" />
        <div className="flex items-end gap-[3px] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {[0.5, 0.9, 0.65, 1, 0.7].map((d, i) => (
            <span
              key={i}
              className="eq-bar w-[3px] rounded-full bg-teal-300"
              style={{ height: '14px', animationDelay: `${i * 0.12}s`, transform: `scaleY(${d})` }}
            />
          ))}
        </div>
        <span className="text-[10px] font-medium whitespace-nowrap opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          Now playing
        </span>
      </div>
    </div>
  )
}

function LagoonMockup() {
  return (
    <div className="relative mt-5 h-40 overflow-hidden rounded-xl border border-black/5 bg-gradient-to-br from-cyan-100 via-sky-50 to-teal-100 dark:border-white/10 dark:from-cyan-950 dark:via-sky-950 dark:to-teal-950">
      <div className="animate-drift absolute -top-6 -left-6 h-28 w-28 rounded-full bg-cyan-300/50 blur-2xl dark:bg-cyan-500/30" />
      <div
        className="animate-drift absolute right-0 -bottom-8 h-32 w-32 rounded-full bg-teal-300/50 blur-2xl dark:bg-teal-500/25"
        style={{ animationDelay: '-5s' }}
      />
      <div
        className="animate-drift absolute top-6 right-10 h-16 w-16 rounded-full bg-sky-300/60 blur-xl dark:bg-sky-400/30"
        style={{ animationDelay: '-9s' }}
      />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 200 120" fill="none">
        <path d="M0 70 Q50 40 100 70 T200 70" stroke="rgba(13,148,136,0.5)" strokeWidth="1.5" />
        <path d="M0 85 Q50 58 100 85 T200 85" stroke="rgba(56,189,248,0.45)" strokeWidth="1.5" />
        <path d="M0 100 Q50 76 100 100 T200 100" stroke="rgba(34,211,238,0.35)" strokeWidth="1.5" />
      </svg>
    </div>
  )
}

const SKILLS = [
  'Design Engineering',
  'iOS · SwiftUI',
  'GLSL Shaders',
  'Creative Technology',
  'Visual Design',
  'SwiftData',
  'WebGL',
  'Motion & Interaction',
  'Prototyping',
  'Design Systems',
]

/* ---------------- Section ---------------- */

export default function Bento() {
  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8">
      {/* Work */}
      <section id="work" className="scroll-mt-28 pt-24">
        <Reveal>
          <Eyebrow>Work &amp; Craft</Eyebrow>
          <Heading>Built at the intersection of design and code.</Heading>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-6">
          <Reveal className="lg:col-span-4" delay={60}>
            <Card className="h-full">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold tracking-[0.16em] text-neutral-400 uppercase">
                    Currently
                  </p>
                  <h3 className="mt-1.5 text-2xl font-semibold text-neutral-900 dark:text-white">
                    Creative Technologist
                  </h3>
                  <p className="mt-1 text-[15px] font-medium text-neutral-500 dark:text-neutral-400">
                    Design engineering, end to end
                  </p>
                </div>
                <span className="liquid-glass rounded-full px-3.5 py-1.5 text-xs font-semibold text-neutral-600 dark:text-neutral-300">
                  macOS · iOS · Web
                </span>
              </div>
              <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-300">
                From concept to shipped product — sketches, prototypes,
                shaders, and production code. If it lives on a screen, I want
                it to feel considered.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 text-xs font-medium">
                {['Interface Design', 'Creative Coding', 'Systems Thinking', 'Rapid Prototyping'].map(
                  (t) => (
                    <span
                      key={t}
                      className="rounded-full border border-black/8 bg-white/50 px-3 py-1.5 text-neutral-600 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300"
                    >
                      {t}
                    </span>
                  ),
                )}
              </div>
            </Card>
          </Reveal>

          <Reveal className="lg:col-span-2" delay={140}>
            <Card className="flex h-full flex-col justify-between">
              <div>
                <p className="text-xs font-semibold tracking-[0.16em] text-neutral-400 uppercase">
                  Roots
                </p>
                <h3 className="mt-1.5 text-xl font-semibold text-neutral-900 dark:text-white">
                  Studio arts → creative tech
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-300">
                  A digital studio arts background — trained to see, fluent in
                  code. Equal parts designer and engineer.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-3">
                <img
                  src="/memoji.png"
                  alt=""
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-white/70 dark:ring-white/15"
                />
                <p className="text-xs leading-snug text-neutral-500 dark:text-neutral-400">
                  Design-first, always.
                  <br />
                  Prototype-obsessed.
                </p>
              </div>
            </Card>
          </Reveal>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="scroll-mt-28 pt-24">
        <Reveal>
          <Eyebrow>Featured Projects</Eyebrow>
          <Heading>Things I've shipped, things I'm dreaming up.</Heading>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-6">
          <Reveal className="md:col-span-2 lg:col-span-3" delay={60}>
            <a
              href="https://github.com/brabenold/Tidepool"
              target="_blank"
              rel="noreferrer"
              className="block h-full"
            >
              <Card className="h-full">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
                      Tidepool
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-300">
                      An external-brain dashboard for an ADHD life. macOS,
                      SwiftUI + SwiftData — liquid glass native.
                    </p>
                  </div>
                  <span className="rounded-full bg-teal-500/15 px-3 py-1 text-[11px] font-semibold text-teal-700 dark:text-teal-300">
                    SwiftUI
                  </span>
                </div>
                <TidepoolMockup />
              </Card>
            </a>
          </Reveal>

          <Reveal className="md:col-span-2 lg:col-span-3" delay={140}>
            <a
              href="https://github.com/brabenold/dynamic-island"
              target="_blank"
              rel="noreferrer"
              className="block h-full"
            >
              <Card className="h-full">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
                      Dynamic Island for macOS
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-300">
                      Bringing the iPhone's liveliest surface to the Mac
                      notch. Hover the pill.
                    </p>
                  </div>
                  <span className="rounded-full bg-indigo-500/15 px-3 py-1 text-[11px] font-semibold text-indigo-700 dark:text-indigo-300">
                    Swift
                  </span>
                </div>
                <IslandMockup />
                <p className="mt-5 text-center text-[11px] text-neutral-400">
                  expands on hover · just like the real thing
                </p>
              </Card>
            </a>
          </Reveal>

          <Reveal className="lg:col-span-2" delay={60}>
            <Card className="h-full">
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
                Lagoon
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-300">
                A creative studio playground — generative color fields and
                shader sketches.
              </p>
              <LagoonMockup />
            </Card>
          </Reveal>

          <Reveal className="lg:col-span-4" delay={140}>
            <Card className="h-full">
              <p className="text-xs font-semibold tracking-[0.16em] text-neutral-400 uppercase">
                Skills &amp; Craft
              </p>
              <h3 className="mt-1.5 text-xl font-semibold text-neutral-900 dark:text-white">
                The toolkit
              </h3>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {SKILLS.map((s) => (
                  <span
                    key={s}
                    className="liquid-glass rounded-full px-4 py-2 text-[13px] font-medium text-neutral-700 transition-transform hover:scale-105 dark:text-neutral-200"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <p className="mt-5 text-sm text-neutral-500 dark:text-neutral-400">
                From shader math to org design — the common thread is systems
                that feel human.
              </p>
            </Card>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
