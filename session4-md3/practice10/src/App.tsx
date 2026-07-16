export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 p-8 text-center transition-all duration-300 hover:border-blue-500/50 hover:shadow-blue-500/10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/10 text-blue-400 mb-6 border border-blue-500/20">
          <i className="fa-solid fa-laptop-code text-2xl"></i>
        </div>
        <h1 className="text-3xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent font-outfit">
          React + TS + Tailwind
        </h1>
        <p className="text-slate-400 text-sm leading-relaxed mb-6 font-inter">
          This boilerplate has been successfully initialized. Start building your modern interface with dynamic layouts, responsive elements, and Tailwind utility classes.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <a
            href="https://react.dev"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-medium text-sm transition-all border border-slate-700 hover:border-slate-600"
          >
            <i className="fa-brands fa-react text-blue-400"></i>
            React Docs
          </a>
          <a
            href="https://tailwindcss.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-medium text-sm transition-all border border-slate-700 hover:border-slate-600"
          >
            <i className="fa-solid fa-wind text-teal-400"></i>
            Tailwind CSS
          </a>
        </div>
      </div>
      <div className="mt-8 text-xs text-slate-600 font-inter">
        Rikkei Education â€¢ Module 3 â€¢ Session 4 â€¢ Practice 10
      </div>
    </div>
  )
}
