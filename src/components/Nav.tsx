export default function Nav({
  dark,
  onToggle,
}: {
  dark: boolean
  onToggle: () => void
}) {
  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav className="glass flex w-full max-w-xl items-center justify-between gap-2 rounded-full py-2 pr-2 pl-5 sm:pl-6">
        <a
          href="#top"
          className="flex items-center gap-2.5 text-[15px] font-semibold tracking-tight"
        >
          <img
            src="/memoji.png"
            alt=""
            className="h-7 w-7 rounded-full object-cover ring-1 ring-black/5 dark:ring-white/15"
          />
          Andru
        </a>

        <div className="flex items-center gap-1 text-[13px] font-medium text-neutral-600 dark:text-neutral-300">
          <a
            href="#work"
            className="rounded-full px-3 py-1.5 transition-colors hover:bg-black/5 hover:text-neutral-900 dark:hover:bg-white/10 dark:hover:text-white"
          >
            Work
          </a>
          <a
            href="#projects"
            className="rounded-full px-3 py-1.5 transition-colors hover:bg-black/5 hover:text-neutral-900 dark:hover:bg-white/10 dark:hover:text-white"
          >
            Projects
          </a>
          <a
            href="#connect"
            className="rounded-full px-3 py-1.5 transition-colors hover:bg-black/5 hover:text-neutral-900 dark:hover:bg-white/10 dark:hover:text-white"
          >
            Connect
          </a>
          <button
            onClick={onToggle}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="ml-1 flex h-8 w-8 items-center justify-center rounded-full border border-black/10 bg-white/60 text-neutral-700 transition-all hover:scale-105 hover:bg-white dark:border-white/15 dark:bg-white/10 dark:text-neutral-200 dark:hover:bg-white/20"
          >
            {dark ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
              </svg>
            )}
          </button>
        </div>
      </nav>
    </header>
  )
}
