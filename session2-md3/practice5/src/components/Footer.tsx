import { useTheme } from '../context/ThemeContext'

export default function Footer() {
  useTheme()

  return (
    <footer className="border-t border-slate-200/80 bg-white py-12 transition-colors duration-300 dark:border-slate-800/80 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-100 pb-8 dark:border-slate-900">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-md shadow-blue-500/20">
              <i className="fa-solid fa-graduation-cap text-sm"></i>
            </div>
            <span className="font-outfit text-lg font-bold tracking-tight text-slate-900 transition-colors dark:text-white">
              Rikkei <span className="text-blue-600">Edu</span>
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {['facebook', 'twitter', 'github', 'linkedin'].map((social, i) => (
              <a
                key={i}
                href={`#${social}`}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-400 border border-slate-200/60 hover:text-blue-600 hover:bg-white hover:border-slate-300 hover:shadow-sm transition-all dark:bg-slate-900 dark:border-slate-800/60 dark:text-slate-500 dark:hover:text-blue-400 dark:hover:bg-slate-950"
                aria-label={social}
              >
                <i className={`fa-brands fa-${social}`}></i>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Credits & Quick Links */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-6 pt-8 text-xs font-medium text-slate-400 dark:text-slate-500">
          <p className="font-inter">
            &copy; {new Date().getFullYear()} Rikkei Education. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-blue-600 transition-colors dark:hover:text-blue-400">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-blue-600 transition-colors dark:hover:text-blue-400">
              Terms of Use
            </a>
            <a href="#support" className="hover:text-blue-600 transition-colors dark:hover:text-blue-400">
              Support Center
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
