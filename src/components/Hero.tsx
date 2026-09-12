import LiquidGlass from './LiquidGlass'
import Reveal from './Reveal'

export default function Hero({ dark }: { dark: boolean }) {
  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden">
      <LiquidGlass dark={dark} />

      {/* soft fade into page background at the bottom */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#f2f2f7] dark:to-[#050507]" />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 pt-24 pb-16 text-center">
        <Reveal>
          <div className="glass mx-auto mb-8 inline-flex items-center gap-3 rounded-full py-2 pr-5 pl-2">
            <img
              src="/memoji.png"
              alt="Illustrated avatar of Brock-Andrew Rabenold"
              className="h-11 w-11 rounded-full object-cover ring-2 ring-white/70 dark:ring-white/20"
            />
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
              Brock-Andrew Rabenold
              <span className="mx-2 text-neutral-400">·</span>
              <span className="text-neutral-500 dark:text-neutral-400">aka Andru</span>
            </span>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <h1 className="tracking-hero text-balance text-5xl leading-[1.02] font-semibold text-neutral-900 sm:text-7xl md:text-[84px] dark:text-white">
            People ops by day.
            <br />
            <span className="bg-gradient-to-r from-indigo-500 via-sky-500 to-teal-400 bg-clip-text text-transparent dark:from-indigo-300 dark:via-sky-300 dark:to-teal-200">
              Pixels by heart.
            </span>
          </h1>
        </Reveal>

        <Reveal delay={240}>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-neutral-600 sm:text-xl dark:text-neutral-300">
            People Operations Planner at Apple. Studio-arts-trained creative
            technologist crafting interfaces where craft meets code.
          </p>
        </Reveal>

        <Reveal delay={360}>
          <div className="mt-10 flex items-center justify-center gap-3">
            <a
              href="#projects"
              className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03] dark:bg-white dark:text-neutral-900"
            >
              See the work
            </a>
            <a
              href="#connect"
              className="glass rounded-full px-6 py-3 text-sm font-semibold text-neutral-800 transition-transform hover:scale-[1.03] dark:text-neutral-100"
            >
              Say hello
            </a>
          </div>
        </Reveal>
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-neutral-500 dark:text-neutral-400">
        <svg className="animate-float" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M6 13l6 6 6-6" />
        </svg>
      </div>
    </section>
  )
}
