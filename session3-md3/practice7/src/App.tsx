import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchCustomers, type Customer } from './api/customers'

export default function App() {
  const [uiSolution, setUiSolution] = useState<'solution1' | 'solution2'>('solution2')
  const queryClient = useQueryClient()

  // TanStack Query for Customer Data
  const {
    data: customers = [],
    isLoading,
    isFetching,
    refetch,
    error,
  } = useQuery({
    queryKey: ['customers'],
    queryFn: fetchCustomers,
    staleTime: 1000 * 60 * 10, // 10 minutes staleTime
  })

  // Trigger Hard Load by wiping the cache and refetching
  const handleTriggerHardLoad = () => {
    queryClient.clear()
    refetch()
  }

  // Trigger Soft Load by simply refetching in the background (cache remains)
  const handleTriggerSoftLoad = () => {
    refetch()
  }

  // Determine which UI elements to show based on selected UI Solution
  const showFullscreenSpinner = uiSolution === 'solution1' && (isLoading || isFetching)
  const showSkeletonLoader = uiSolution === 'solution2' && isLoading
  const showBackgroundIndicator = uiSolution === 'solution2' && isFetching && !isLoading

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-6 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/60 backdrop-blur-md p-6 rounded-2xl border border-slate-800/80">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              UX Loading Analysis Sandbox
            </div>
            <h1 className="text-3xl font-extrabold font-outfit bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Customer Data Relations Hub
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              Comparing loading state UX: Initial load (isLoading) vs Background refetch (isFetching). Toggle solutions below to test.
            </p>
          </div>

          {/* Solution Selector */}
          <div className="flex flex-col gap-1.5 bg-slate-950 p-3 rounded-xl border border-slate-850">
            <span className="text-[10px] font-bold text-slate-500 uppercase">UI Strategy:</span>
            <div className="flex gap-2">
              <button
                onClick={() => setUiSolution('solution2')}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  uiSolution === 'solution2'
                    ? 'bg-emerald-500/15 border border-emerald-500/35 text-emerald-400'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Solution 2 (Differentiated - Soft/Hard)
              </button>
              <button
                onClick={() => setUiSolution('solution1')}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  uiSolution === 'solution1'
                    ? 'bg-rose-500/15 border border-rose-500/35 text-rose-400'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Solution 1 (Unified Full Spinner)
              </button>
            </div>
          </div>
        </div>

        {/* Diagnostic ActionsHUD */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <h2 className="text-lg font-bold font-outfit flex items-center gap-2">
            <i className="fa-solid fa-gauge-high text-blue-400"></i>
            Simulation Control Panel
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Hard Load Trigger */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-850 flex flex-col justify-between">
              <div>
                <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-450 border border-blue-500/20 text-[10px] font-bold uppercase">
                  isLoading Trigger
                </span>
                <h3 className="font-bold text-slate-200 mt-2">Trigger Initial Hard Load</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Clears the cache entirely and fetches. Simulates a new visitor entering the page with no previous session cache.
                </p>
              </div>
              <button
                onClick={handleTriggerHardLoad}
                className="mt-4 w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                Simulate Hard Load (Wipe Cache)
              </button>
            </div>

            {/* Soft Load Trigger */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-850 flex flex-col justify-between">
              <div>
                <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[10px] font-bold uppercase">
                  isFetching Trigger
                </span>
                <h3 className="font-bold text-slate-200 mt-2">Trigger Background Soft Load</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Refetches without deleting cache. Simulates the 10-minute auto-refresh query polling that syncs data in the background.
                </p>
              </div>
              <button
                onClick={handleTriggerSoftLoad}
                className="mt-4 w-full py-2.5 bg-indigo-650 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                Simulate Soft Load (Keep Cache)
              </button>
            </div>
          </div>
        </div>

        {/* Visual Benchmark HUD */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
            <span className="text-xs font-semibold text-slate-450 uppercase tracking-wider">TanStack Query Key</span>
            <div className="mt-2 text-sm font-mono text-slate-300">
              {`['customers']`}
            </div>
            <span className="text-xs text-slate-400 mt-2">
              Query identifier used to query data cache.
            </span>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
            <span className="text-xs font-semibold text-slate-405 uppercase tracking-wider">isLoading (Initial loading)</span>
            <div className="flex items-center gap-2 mt-2">
              <span
                className={`w-3.5 h-3.5 rounded-full ${
                  isLoading ? 'bg-amber-500 shadow-[0_0_8px_#f59e0b]' : 'bg-slate-700'
                }`}
              ></span>
              <span className="text-2xl font-bold font-outfit uppercase">
                {isLoading ? 'TRUE' : 'FALSE'}
              </span>
            </div>
            <span className="text-xs text-slate-400 mt-2">
              True only when cache is empty and query is running.
            </span>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
            <span className="text-xs font-semibold text-slate-405 uppercase tracking-wider">isFetching (Active request)</span>
            <div className="flex items-center gap-2 mt-2">
              <span
                className={`w-3.5 h-3.5 rounded-full ${
                  isFetching ? 'bg-blue-500 shadow-[0_0_8px_#3b82f6]' : 'bg-slate-700'
                }`}
              ></span>
              <span className="text-2xl font-bold font-outfit uppercase">
                {isFetching ? 'TRUE' : 'FALSE'}
              </span>
            </div>
            <span className="text-xs text-slate-400 mt-2">
              True whenever any query network request is in-flight.
            </span>
          </div>
        </div>

        {/* Customer Records Table Panel */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl relative min-h-[300px]">
          
          {/* Solution 1: Fullscreen White-out/Blocking Spinner */}
          {showFullscreenSpinner && (
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md flex flex-col items-center justify-center z-30 transition-all animate-fade-in">
              <div className="relative w-14 h-14 mb-4">
                <div className="absolute inset-0 rounded-full border-4 border-rose-500/10"></div>
                <div className="absolute inset-0 rounded-full border-4 border-t-rose-500 animate-spin"></div>
              </div>
              <p className="text-sm font-bold tracking-wider text-rose-450 uppercase animate-pulse font-outfit">
                SOLUTION 1 ACTIVE: BLOCKED SCREEN (2s delay)...
              </p>
              <p className="text-xs text-slate-500 mt-2 max-w-xs text-center leading-relaxed">
                Notice how you cannot see the table or click anything. All work is disrupted!
              </p>
            </div>
          )}

          {/* Solution 2 Soft Load: Subtle top-sliding loading bar */}
          {showBackgroundIndicator && (
            <div className="absolute top-0 left-0 w-full h-[3px] bg-slate-950 overflow-hidden z-20">
              <div className="h-full bg-gradient-to-r from-blue-500 via-indigo-400 to-violet-500 w-1/3 rounded animate-[shimmer_1.5s_infinite] origin-left"></div>
            </div>
          )}

          <div className="px-6 py-5 border-b border-slate-800/80 flex justify-between items-center bg-slate-900">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-bold font-outfit">Customer Database</h3>
              {showBackgroundIndicator && (
                <span className="px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[9px] font-bold uppercase animate-pulse flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping"></span>
                  Background Sync
                </span>
              )}
            </div>
            <span className="text-xs text-slate-400">
              {showSkeletonLoader ? 'Loading...' : `Showing ${customers.length} Accounts`}
            </span>
          </div>

          <div className="overflow-x-auto">
            {showSkeletonLoader ? (
              /* Solution 2 Hard Load: Skeleton Rows */
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-950/60 border-b border-slate-800 text-xs text-slate-500 uppercase tracking-wider font-semibold">
                    <th className="px-6 py-4">Account ID</th>
                    <th className="px-6 py-4">Full Name</th>
                    <th className="px-6 py-4">Associated Company</th>
                    <th className="px-6 py-4 text-right">Total Spent</th>
                    <th className="px-6 py-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/20">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="px-6 py-5">
                        <div className="h-4 bg-slate-800 rounded w-16"></div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="h-4 bg-slate-800 rounded w-36"></div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="h-4 bg-slate-800 rounded w-28"></div>
                      </td>
                      <td className="px-6 py-5 flex justify-end">
                        <div className="h-4 bg-slate-800 rounded w-20"></div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="h-6 bg-slate-800 rounded-full w-24 mx-auto"></div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : error ? (
              <div className="py-20 text-center text-rose-450">
                <i className="fa-solid fa-triangle-exclamation text-3xl mb-3 block"></i>
                <p className="font-semibold text-sm">Failed to retrieve server datasets.</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-950/60 border-b border-slate-800 text-xs text-slate-450 uppercase tracking-wider font-semibold">
                    <th className="px-6 py-4">Account ID</th>
                    <th className="px-6 py-4">Full Name</th>
                    <th className="px-6 py-4">Associated Company</th>
                    <th className="px-6 py-4 text-right">Total Spent</th>
                    <th className="px-6 py-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40">
                  {customers.map((c: Customer) => (
                    <tr key={c.id} className="hover:bg-slate-800/20 transition-colors font-inter text-sm">
                      <td className="px-6 py-4 font-semibold text-slate-200">#{c.id}</td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-100">{c.name}</div>
                        <div className="text-xs text-slate-500 font-normal">{c.email}</div>
                      </td>
                      <td className="px-6 py-4 text-slate-350">{c.company}</td>
                      <td className="px-6 py-4 text-right font-bold text-slate-200">${c.spent.toLocaleString()}</td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold inline-block w-24 text-center ${
                            c.status === 'Active'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                          }`}
                        >
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* UX Strategy Analysis Matrix (In-App Report) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <h2 className="text-xl font-bold font-outfit flex items-center gap-2">
            <i className="fa-solid fa-square-poll-vertical text-blue-400"></i>
            UX Strategy Analysis Matrix
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-slate-800 text-xs">
              <thead>
                <tr className="bg-slate-950 text-slate-300 border-b border-slate-800 uppercase tracking-wider font-semibold">
                  <th className="px-4 py-3 border-r border-slate-800">Evaluation Criteria</th>
                  <th className="px-4 py-3 border-r border-slate-800 text-rose-400">Solution 1 (Unified Spinner)</th>
                  <th className="px-4 py-3 text-emerald-400">Solution 2 (Differentiated Strategy)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40 text-slate-350">
                <tr>
                  <td className="px-4 py-3 font-semibold bg-slate-950/20 border-r border-slate-800 text-slate-200">UX Interruption</td>
                  <td className="px-4 py-3 border-r border-slate-800">
                    <strong className="text-rose-450">High.</strong> Screen whites-out/covers every 10 minutes. Blocks clicks and scrolling. Annoying and breaks user flow.
                  </td>
                  <td className="px-4 py-3 text-emerald-350">
                    <strong className="text-emerald-400">Zero.</strong> Existing data stays visible and interactive during background sync.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold bg-slate-950/20 border-r border-slate-800 text-slate-200">Initial Load (Hard)</td>
                  <td className="px-4 py-3 border-r border-slate-800">
                    Boring full-screen loading spinner. Feel slow and static.
                  </td>
                  <td className="px-4 py-3 text-emerald-350">
                    Smooth, modern skeleton loader. Fits exact UI structure, giving a feel of instant loading.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold bg-slate-950/20 border-r border-slate-800 text-slate-200">Background Sync (Soft)</td>
                  <td className="px-4 py-3 border-r border-slate-800">
                    Forces the same giant blocking spinner. Complete overkill.
                  </td>
                  <td className="px-4 py-3 text-emerald-350">
                    Subtle shimmer line at the top and a tiny glowing ping. Keeps page clean and fully usable.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold bg-slate-950/20 border-r border-slate-800 text-slate-200">Implementation Cost</td>
                  <td className="px-4 py-3 border-r border-slate-800">
                    <strong className="text-emerald-400">Low.</strong> Simple boolean condition checks both flags interchangeably.
                  </td>
                  <td className="px-4 py-3 text-emerald-350">
                    <strong className="text-amber-500">Medium.</strong> Requires separate checking of <code className="text-slate-300">isLoading</code> vs <code className="text-slate-300">isFetching</code>, plus writing skeleton UI rows.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-xl p-4 flex gap-3 text-sm text-slate-300">
            <i className="fa-solid fa-circle-check text-emerald-400 text-lg mt-0.5"></i>
            <div>
              <p className="font-bold text-emerald-300">Final Verdict & Chosed Strategy:</p>
              <p className="mt-1 text-slate-400 text-xs leading-relaxed">
                We chose <strong className="text-emerald-400">Solution 2</strong>. By differentiating initial loading (`isLoading`) from background refreshes (`isFetching`), we prevent the screen from resetting, allowing employees to read, scroll, and click row details uninterrupted while background synchronization happens seamlessly.
              </p>
            </div>
          </div>
        </div>

      </div>
      
      {/* Custom Shimmer CSS for top progress bar */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  )
}
