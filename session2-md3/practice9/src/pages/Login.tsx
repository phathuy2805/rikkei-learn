import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const { login, isAuthenticated } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/classroom', { replace: true })
        }
    }, [isAuthenticated, navigate])

    const from = location.state?.from?.pathname || '/classroom'
    const isRedirected = !!location.state?.from

    const handleLoginSubmit = async (usernameValue: string) => {
        if (!usernameValue.trim()) {
            setError('Please enter a username.')
            return
        }
        setError('')
        setIsSubmitting(true)
        try {
            const success = await login(usernameValue.trim())
            if (success) {
                // IMPERATIVE REDIRECTION: Using replace: true prevents the login screen
                // from remaining in the history stack, avoiding "Back" button loops.
                navigate(from, { replace: true })
            } else {
                setError('Authentication failed.')
            }
        } catch {
            setError('An unexpected error occurred.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        handleLoginSubmit(username)
    }

    const triggerQuickLogin = (role: 'admin' | 'student') => {
        const quickUser = role === 'admin' ? 'Admin' : 'Alice'
        setUsername(quickUser)
        setPassword('••••••••')
        handleLoginSubmit(quickUser)
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between py-12 px-6 font-sans">
            <div className="max-w-md w-full mx-auto my-auto space-y-6">
                {/* Redirect Notice Banner */}
                {isRedirected && (
                    <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm flex gap-3 animate-fade-in">
                        <i className="fa-solid fa-circle-exclamation mt-0.5 text-base flex-shrink-0"></i>
                        <div>
                            <span className="font-semibold block">
                                Authentication Required
                            </span>
                            You attempted to access{' '}
                            <code className="bg-slate-950/50 px-1 py-0.5 rounded text-amber-300 font-mono text-xs">
                                {from}
                            </code>{' '}
                            which is a protected boundary. Please log in first.
                        </div>
                    </div>
                )}

                <div className="bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-slate-800 p-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500"></div>

                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 mb-4 border border-blue-500/20">
                            <i className="fa-solid fa-user-shield text-xl"></i>
                        </div>
                        <h2 className="text-2xl font-bold font-outfit">
                            Virtual Gateway Login
                        </h2>
                        <p className="text-xs text-slate-400 mt-1 font-inter">
                            Please enter your credentials to authenticate.
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="p-3 mb-6 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
                            <i className="fa-solid fa-triangle-exclamation"></i>
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                Username
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                                    <i className="fa-solid fa-user text-sm"></i>
                                </span>
                                <input
                                    type="text"
                                    placeholder="e.g., Alice, Admin"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    disabled={isSubmitting}
                                    className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-sm font-medium"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                Password
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                                    <i className="fa-solid fa-lock text-sm"></i>
                                </span>
                                <input
                                    type="password"
                                    placeholder="Password (any will work)"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    disabled={isSubmitting}
                                    className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-sm font-medium"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-500 text-white rounded-xl font-semibold shadow-lg transition-all text-center flex items-center justify-center gap-2 cursor-pointer text-sm"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Authenticating...
                                </>
                            ) : (
                                <>
                                    Authenticate
                                    <i className="fa-solid fa-arrow-right-to-bracket text-xs"></i>
                                </>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-6 flex items-center justify-center">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-800"></div>
                        </div>
                        <span className="relative px-3 bg-slate-900 text-xs text-slate-500 font-semibold uppercase tracking-wider">
                            Quick Login Sandbox
                        </span>
                    </div>

                    {/* Quick Login Buttons */}
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={() => triggerQuickLogin('student')}
                            disabled={isSubmitting}
                            className="py-2.5 px-3 bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 disabled:bg-slate-950 disabled:border-slate-800 rounded-xl text-xs font-semibold text-slate-300 transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                            <i className="fa-solid fa-graduation-cap text-indigo-400"></i>
                            As Student
                        </button>
                        <button
                            onClick={() => triggerQuickLogin('admin')}
                            disabled={isSubmitting}
                            className="py-2.5 px-3 bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 disabled:bg-slate-950 disabled:border-slate-800 rounded-xl text-xs font-semibold text-slate-300 transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                            <i className="fa-solid fa-chalkboard-user text-violet-400"></i>
                            As Instructor
                        </button>
                    </div>
                </div>
            </div>

            <div className="text-center text-xs text-slate-600 font-inter">
                Rikkei Education • Module 3 • Session 2 • Practice 9
            </div>
        </div>
    )
}
