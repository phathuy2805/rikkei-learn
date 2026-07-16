import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import type { ReactNode } from 'react'

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-100">
        <div className="relative w-16 h-16 mb-4">
          <div className="absolute inset-0 rounded-full border-4 border-blue-500/10"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 border-r-blue-500/50 animate-spin"></div>
        </div>
        <p className="text-sm font-semibold tracking-wider text-blue-400 uppercase animate-pulse font-outfit">
          Securing Access Boundary
        </p>
      </div>
    )
  }

  if (!isAuthenticated) {
    // Redirect to login, preserving target location in state
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <>{children}</>
}
