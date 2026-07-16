import { useTheme } from '../context/ThemeContext'

export default function Header() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md transition-colors duration-300 dark:border-slate-800/80 dark:bg-slate-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-500/20">
            <i className="fa-solid fa-graduation-cap text-lg"></i>
          </div>
          <span className="font-outfit text-xl font-bold tracking-tight text-slate-900 transition-colors dark:text-white">
            Rikkei <span className="text-blue-600">Edu</span>
          </span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#courses" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors dark:text-slate-400 dark:hover:text-blue-400">
            Courses
          </a>
          <a href="#dashboard" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors dark:text-slate-400 dark:hover:text-blue-400">
            Dashboard
          </a>
          <a href="#analytics" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors dark:text-slate-400 dark:hover:text-blue-400">
            Analytics
          </a>
          <a href="#resources" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors dark:text-slate-400 dark:hover:text-blue-400">
            Resources
          </a>
        </nav>

        {/* Right Section: Theme Toggle & User profile */}
        <div className="flex items-center gap-4">
          {/* Custom Theme Switch Toggle */}
          <button
            onClick={toggleTheme}
            className="relative flex h-8 w-16 cursor-pointer items-center rounded-full bg-slate-200 p-1 transition-all duration-300 dark:bg-slate-800"
            aria-label="Toggle Theme"
            id="theme-toggle-btn"
          >
            {/* Sliding Ball */}
            <div
              className={`flex h-6 w-6 transform items-center justify-center rounded-full bg-white shadow-md transition-transform duration-300 ${
                theme === 'dark' ? 'translate-x-8 bg-slate-950' : 'translate-x-0 bg-white'
              }`}
            >
              {theme === 'dark' ? (
                <i className="fa-solid fa-moon text-xs text-amber-400"></i>
              ) : (
                <i className="fa-solid fa-sun text-xs text-amber-500"></i>
              )}
            </div>
          </button>

          {/* User profile (Avatar mock) */}
          <div className="h-9 w-9 rounded-full border border-slate-200 bg-slate-100 p-0.5 dark:border-slate-800 dark:bg-slate-900">
            <div className="h-full w-full rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white text-xs font-semibold">
              JD
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
