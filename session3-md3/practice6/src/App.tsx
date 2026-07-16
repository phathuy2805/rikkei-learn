import { useState, useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchRevenueData, type MonthlyRevenue } from './api/revenue'

// Sub-component: Revenue Dashboard (Uses useQuery)
function RevenueDashboard({ staleTimeMs }: { staleTimeMs: number }) {
  const {
    data: revenue = [],
    isLoading,
    isFetching,
    refetch,
    dataUpdatedAt,
    isStale,
  } = useQuery({
    queryKey: ['revenue'],
    queryFn: fetchRevenueData,
    staleTime: staleTimeMs,
    gcTime: 1000 * 60 * 10, // Keep in cache for 10 minutes
  })

  // States updated safely inside useEffect to adhere to purity rules
  const [secondsSinceUpdate, setSecondsSinceUpdate] = useState(0)
  const [remainingFreshTime, setRemainingFreshTime] = useState(0)

  useEffect(() => {
    if (!dataUpdatedAt) return

    const updateStats = () => {
      const now = Date.now()
      const elapsed = Math.floor((now - dataUpdatedAt) / 1000)
      const remaining = Math.max(0, Math.ceil((staleTimeMs - (now - dataUpdatedAt)) / 1000))
      
      setSecondsSinceUpdate(elapsed)
      setRemainingFreshTime(remaining)
    }

    // Defer the initial update to prevent synchronous cascading renders warning
    const timer = setTimeout(updateStats, 0)
    const interval = setInterval(updateStats, 1000)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [dataUpdatedAt, staleTimeMs])

  const isFresh = !isStale

  if (isLoading) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 flex flex-col items-center justify-center min-h-[400px]">
        <div className="relative w-12 h-12 mb-4">
          <div className="absolute inset-0 rounded-full border-4 border-blue-500/10"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 animate-spin"></div>
        </div>
        <p className="text-sm font-semibold tracking-wider text-blue-450 uppercase animate-pulse font-outfit">
          Loading Financial Records (2s delay)...
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Dev HUD / Status Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Cache Lifespan Status */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
          <span className="text-xs font-semibold text-slate-405 uppercase tracking-wider">Cache Lifespan State</span>
          <div className="flex items-center gap-2 mt-2">
            <span
              className={`w-3.5 h-3.5 rounded-full ${
                isFresh ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-amber-500 shadow-[0_0_8px_#f59e0b]'
              }`}
            ></span>
            <span className="text-2xl font-bold font-outfit uppercase">
              {isFresh ? 'Fresh' : 'Stale'}
            </span>
          </div>
          <span className="text-xs text-slate-400 mt-2">
            {isFresh
              ? `Freshness expires in: ${remainingFreshTime}s`
              : 'Data marked stale. Will refetch on tab switch/mount.'}
          </span>
        </div>

        {/* Sync Info */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
          <span className="text-xs font-semibold text-slate-405 uppercase tracking-wider">Last Server Sync</span>
          <div className="mt-2">
            <span className="text-3xl font-bold font-outfit text-blue-400">
              {secondsSinceUpdate}
            </span>
            <span className="text-sm font-semibold text-slate-400 ml-1">seconds ago</span>
          </div>
          <span className="text-xs text-slate-400 mt-2">
            Time elapsed since the last actual API request completed.
          </span>
        </div>

        {/* Background Fetch Status */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
          <span className="text-xs font-semibold text-slate-405 uppercase tracking-wider">Background Refetch</span>
          <div className="mt-2 flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                isFetching ? 'bg-blue-400 animate-ping' : 'bg-slate-500'
              }`}
            ></span>
            <span className="text-2xl font-bold font-outfit uppercase text-slate-200">
              {isFetching ? 'Fetching...' : 'Idle'}
            </span>
          </div>
          <span className="text-xs text-slate-400 mt-2">
            {isFetching ? 'Querying API to sync state...' : 'No active background requests.'}
          </span>
        </div>
      </div>

      {/* Main Revenue Grid & Control Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-5">
          <div>
            <h3 className="text-lg font-bold font-outfit">Monthly Revenue Data</h3>
            <p className="text-xs text-slate-400">StaleTime is set to {staleTimeMs / 1000 / 60} minutes.</p>
          </div>
          
          {/* Action buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => {
                refetch()
              }}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-lg hover:shadow-blue-500/20 cursor-pointer"
            >
              <i className={`fa-solid fa-arrows-rotate ${isFetching ? 'animate-spin' : ''}`}></i>
              Force Refresh (Làm mới)
            </button>
          </div>
        </div>

        {/* Revenue Table */}
        <div className="overflow-x-auto relative">
          {isFetching && (
            <div className="absolute inset-0 bg-slate-950/10 backdrop-blur-[0.5px] flex items-center justify-center z-10"></div>
          )}
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/60 border-b border-slate-800 text-xs text-slate-450 uppercase tracking-wider font-semibold">
                <th className="px-6 py-4">Month</th>
                <th className="px-6 py-4 text-right">Revenue</th>
                <th className="px-6 py-4 text-right">Expenses</th>
                <th className="px-6 py-4 text-right">Net Profit</th>
                <th className="px-6 py-4 text-center">Top Performing Agent</th>
                <th className="px-6 py-4 text-center">Target Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {revenue.map((row: MonthlyRevenue) => (
                <tr key={row.month} className="hover:bg-slate-800/20 transition-colors font-inter text-sm">
                  <td className="px-6 py-4 font-semibold text-slate-200">{row.month}</td>
                  <td className="px-6 py-4 text-right font-medium text-slate-100">${row.revenue.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right text-slate-400">${row.expenses.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right font-bold text-emerald-400">${row.profit.toLocaleString()}</td>
                  <td className="px-6 py-4 text-center text-slate-350">{row.topAgent}</td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold inline-block w-28 text-center ${
                        row.targetMet
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}
                    >
                      {row.targetMet ? 'Target Met' : 'Missed'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// Sub-component: HR Dashboard (Mock screen)
function HRDashboard() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6 min-h-[400px]">
      <div>
        <h3 className="text-xl font-bold font-outfit">HR & Personnel Directory</h3>
        <p className="text-slate-455 text-sm mt-1">Manage employee profiles, roles, and payroll schedules.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { name: 'Nguyễn Văn A', role: 'Sales Director', dept: 'Commercial' },
          { name: 'Trần Thị B', role: 'Senior Developer', dept: 'Engineering' },
          { name: 'Lê Hoàng C', role: 'UX Researcher', dept: 'Product' },
          { name: 'Phạm Minh D', role: 'DevOps Specialist', dept: 'Infrastructure' },
        ].map((emp) => (
          <div key={emp.name} className="p-4 rounded-xl bg-slate-950 border border-slate-850 flex justify-between items-center">
            <div>
              <p className="font-semibold text-slate-200">{emp.name}</p>
              <p className="text-xs text-slate-500 mt-0.5">{emp.role}</p>
            </div>
            <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-slate-900 border border-slate-800 text-slate-400 uppercase">
              {emp.dept}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Main App Container
export default function App() {
  const [activeTab, setActiveTab] = useState<'revenue' | 'hr'>('revenue')
  const [staleTimeSetting, setStaleTimeSetting] = useState<'optimized' | 'immediate'>('optimized')
  const queryClient = useQueryClient()

  // Calculate actual staleTime in milliseconds
  const staleTimeMs = staleTimeSetting === 'optimized' ? 1000 * 60 * 5 : 0

  // Diagnostic helper: Clear Cache completely
  const handleClearCache = () => {
    queryClient.clear()
  }

  return (
    <div className="min-h-screen bg-slate-955 text-slate-100 py-12 px-6 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/60 backdrop-blur-md p-6 rounded-2xl border border-slate-800/80">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              StaleTime & Lifecycles
            </div>
            <h1 className="text-3xl font-extrabold font-outfit bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Executive Analytics Dashboard
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              Simulating staleTime cache lifecycles. Switch tabs to observe that the 2-second loading spinner is bypassed when cached data is fresh.
            </p>
          </div>

          {/* StaleTime Toggle */}
          <div className="flex flex-col gap-1.5 bg-slate-955 p-3 rounded-xl border border-slate-850">
            <span className="text-[10px] font-bold text-slate-500 uppercase">Configuration:</span>
            <div className="flex gap-2">
              <button
                onClick={() => setStaleTimeSetting('optimized')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  staleTimeSetting === 'optimized'
                    ? 'bg-emerald-500/15 border border-emerald-500/35 text-emerald-450'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Optimized (5m staleTime)
              </button>
              <button
                onClick={() => setStaleTimeSetting('immediate')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  staleTimeSetting === 'immediate'
                    ? 'bg-rose-500/15 border border-rose-500/35 text-rose-455'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Unoptimized (0s staleTime)
              </button>
            </div>
          </div>
        </div>

        {/* Tab Controllers */}
        <div className="flex justify-between items-center bg-slate-900 border border-slate-800 p-2.5 rounded-2xl">
          <div className="flex gap-2 bg-slate-955 p-1 rounded-xl border border-slate-850">
            <button
              onClick={() => setActiveTab('revenue')}
              className={`px-6 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'revenue' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <i className="fa-solid fa-chart-line"></i>
              Revenue Dashboard
            </button>
            <button
              onClick={() => setActiveTab('hr')}
              className={`px-6 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'hr' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <i className="fa-solid fa-user-group"></i>
              HR Settings
            </button>
          </div>

          <button
            onClick={handleClearCache}
            className="px-4 py-2 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
          >
            <i className="fa-solid fa-trash-can"></i>
            Wipe Query Cache
          </button>
        </div>

        {/* Dynamic Sandbox Display */}
        {activeTab === 'revenue' ? (
          <RevenueDashboard staleTimeMs={staleTimeMs} />
        ) : (
          <HRDashboard />
        )}

      </div>
    </div>
  )
}
