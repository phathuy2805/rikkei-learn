import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Home() {
  const { isAuthenticated, user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between py-12 px-6 font-sans">
      <div className="max-w-4xl mx-auto w-full my-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Left Side: Brand and Hero */}
        <div className="flex-1 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            Security Gateway Active
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight font-outfit">
            Next-Gen Virtual{' '}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Classroom
            </span>
          </h1>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-lg mx-auto lg:mx-0 font-inter">
            Access exclusive lectures, interact with live coding workbenches, and collaborate with certified instructors in a secure sandbox workspace.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Link
              to="/classroom"
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-blue-500/25 transition-all text-center flex items-center justify-center gap-2 text-sm"
            >
              Enter Virtual Classroom
              <i className="fa-solid fa-arrow-right text-xs"></i>
            </Link>
            {!isAuthenticated ? (
              <Link
                to="/login"
                className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700 rounded-xl font-semibold transition-all text-center text-sm"
              >
                Sign In
              </Link>
            ) : (
              <button
                onClick={logout}
                className="w-full sm:w-auto px-8 py-3.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 hover:border-red-500/30 rounded-xl font-semibold transition-all text-center cursor-pointer text-sm"
              >
                Log Out
              </button>
            )}
          </div>
        </div>

        {/* Right Side: Interactive Boundary Explanation Dashboard */}
        <div className="flex-1 w-full max-w-md bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-slate-800/80 p-8 shadow-2xl relative overflow-hidden group hover:border-indigo-500/30 transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl"></div>
          
          <h2 className="text-xl font-bold mb-6 font-outfit flex items-center gap-2">
            <i className="fa-solid fa-shield-halved text-indigo-400"></i>
            Security Guard Status
          </h2>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 uppercase font-semibold">User Authentication</p>
                <p className="text-sm font-semibold mt-1">
                  {isAuthenticated ? `Logged in as ${user?.username}` : 'Anonymous Access'}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  isAuthenticated
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                }`}
              >
                {isAuthenticated ? 'Authenticated' : 'Unverified'}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <p className="text-xs text-slate-500 uppercase font-semibold">Boundary Rules</p>
              <div className="mt-2 space-y-2 text-xs text-slate-400">
                <div className="flex items-start gap-2">
                  <i className="fa-solid fa-circle-check text-emerald-500 mt-0.5"></i>
                  <span>Direct URL access to <code>/classroom</code> is forbidden if unauthorized.</span>
                </div>
                <div className="flex items-start gap-2">
                  <i className="fa-solid fa-circle-check text-emerald-500 mt-0.5"></i>
                  <span>Unauthorized request auto-redirects to <code>/login</code>.</span>
                </div>
                <div className="flex items-start gap-2">
                  <i className="fa-solid fa-circle-check text-emerald-500 mt-0.5"></i>
                  <span>Post-login returns to original route and clears history stack.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-slate-600 font-inter">
        Rikkei Education • Module 3 • Session 2 • Practice 9
      </div>
    </div>
  )
}
