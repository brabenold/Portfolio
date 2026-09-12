import Reveal from './Reveal'

const LINKS = [
  {
    label: 'GitHub',
    handle: '@brabenold',
    href: 'https://github.com/brabenold',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.15c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.78 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.26 5.68.41.35.77 1.05.77 2.13v3.16c0 .3.21.67.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
      </svg>
    ),
  },
  {
    label: 'X / Twitter',
    handle: '@brockandru',
    href: 'https://x.com/brockandru',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-6.4L6.4 22H3.2l7.3-8.3L1.2 2h6.4l4.4 5.8L18.9 2zm-1.1 18h1.7L7.7 3.9H5.9L17.8 20z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    handle: 'brock.rabenold@gmail.com',
    href: 'mailto:brock.rabenold@gmail.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer id="connect" className="scroll-mt-28 px-5 pt-28 pb-14 sm:px-8">
      <Reveal>
        <div className="glass mx-auto max-w-6xl rounded-[32px] px-8 py-12 text-center sm:px-12">
          <img
            src="/memoji.png"
            alt=""
            className="animate-float mx-auto h-16 w-16 rounded-full object-cover ring-2 ring-white/70 dark:ring-white/20"
          />
          <h2 className="tracking-hero mt-5 text-3xl font-semibold text-neutral-900 sm:text-4xl dark:text-white">
            Let's make something people feel.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[15px] text-neutral-600 dark:text-neutral-300">
            Open to conversations about design engineering, creative tech, and
            the people side of building.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noreferrer"
                className="flex w-full items-center gap-3 rounded-2xl border border-black/8 bg-white/50 px-5 py-3.5 text-left transition-all hover:-translate-y-0.5 hover:bg-white/80 sm:w-auto dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
              >
                <span className="text-neutral-700 dark:text-neutral-200">{l.icon}</span>
                <span>
                  <span className="block text-[13px] font-semibold text-neutral-800 dark:text-neutral-100">
                    {l.label}
                  </span>
                  <span className="block text-xs text-neutral-500 dark:text-neutral-400">
                    {l.handle}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </Reveal>

      <p className="mt-10 text-center text-xs text-neutral-400 dark:text-neutral-500">
        © {new Date().getFullYear()} Brock-Andrew Rabenold · Built with React,
        GLSL &amp; too much attention to corner radius
      </p>
    </footer>
  )
}
