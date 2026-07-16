import { useQuery } from '@tanstack/react-query'
import { useFilterStore } from './store/useFilterStore'
import { fetchOrders } from './api/orders'

export default function App() {
  // Zustand State hooks
  const status = useFilterStore((state) => state.status)
  const search = useFilterStore((state) => state.search)
  const setStatus = useFilterStore((state) => state.setStatus)
  const setSearch = useFilterStore((state) => state.setSearch)
  const trimmedSearch = useFilterStore((state) => state.getTrimmedSearch())

  // TanStack Query synchronizes automatically using queryKey
  const {
    data: orders = [],
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ['orders', { status, search: trimmedSearch }],
    queryFn: () => fetchOrders(status, trimmedSearch),
  })

  // Calculations for KPI Cards
  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === 'Pending').length,
    shipped: orders.filter((o) => o.status === 'Shipped').length,
    delivered: orders.filter((o) => o.status === 'Delivered').length,
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-6 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Title Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/60 backdrop-blur-md p-6 rounded-2xl border border-slate-800/80">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              Zustand & TanStack Query Sync
            </div>
            <h1 className="text-3xl font-extrabold font-outfit bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Order Fulfillment Dashboard
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              Automatic sync between Client State (Zustand) and Server State (TanStack Query) using reactive query keys without useEffect.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-400 uppercase">API Status:</span>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800">
              <span
                className={`w-2 h-2 rounded-full ${
                  isFetching ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'
                }`}
              ></span>
              <span className="text-xs font-bold text-slate-350">
                {isFetching ? 'Refetching...' : 'Connected'}
              </span>
            </div>
          </div>
        </div>

        {/* Dashboard Statistics HUD */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700/60 transition-all group">
            <span className="text-xs font-semibold text-slate-450 uppercase tracking-wider group-hover:text-slate-300">Total Matches</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold font-outfit text-white">{stats.total}</span>
              <span className="text-xs text-slate-500 uppercase">Orders</span>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700/60 transition-all group">
            <span className="text-xs font-semibold text-slate-455 uppercase tracking-wider group-hover:text-slate-300">Pending</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold font-outfit text-amber-450">{stats.pending}</span>
              <span className="text-xs text-slate-500 uppercase">Waiting</span>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700/60 transition-all group">
            <span className="text-xs font-semibold text-slate-455 uppercase tracking-wider group-hover:text-slate-300">Shipped</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold font-outfit text-blue-450">{stats.shipped}</span>
              <span className="text-xs text-slate-500 uppercase">In Transit</span>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700/60 transition-all group">
            <span className="text-xs font-semibold text-slate-455 uppercase tracking-wider group-hover:text-slate-300">Delivered</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold font-outfit text-emerald-450">{stats.delivered}</span>
              <span className="text-xs text-slate-500 uppercase">Done</span>
            </div>
          </div>
        </div>

        {/* State Diagnostic Monitor (Developer HUD) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-bold font-outfit flex items-center gap-2">
            <i className="fa-solid fa-server text-blue-400"></i>
            Real-time State Synchronization Matrix
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono bg-slate-950 p-4 rounded-xl border border-slate-850">
            {/* Zustand State */}
            <div className="space-y-2">
              <p className="text-blue-400 font-bold border-b border-slate-800 pb-1 uppercase">Zustand Client State</p>
              <div className="flex justify-between">
                <span className="text-slate-500">status:</span>
                <span className="text-slate-200">"{status}"</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">search (raw):</span>
                <span className="text-slate-200">"{search}"</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">search (trimmed):</span>
                <span className="text-emerald-400">"{trimmedSearch}"</span>
              </div>
            </div>

            {/* TanStack Query State */}
            <div className="space-y-2">
              <p className="text-indigo-400 font-bold border-b border-slate-800 pb-1 uppercase">TanStack Server Query</p>
              <div className="flex justify-between">
                <span className="text-slate-500">queryKey:</span>
                <span className="text-slate-200">
                  {`['orders', { status: "${status}", search: "${trimmedSearch}" }]`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">isLoading (initial):</span>
                <span className={isLoading ? 'text-amber-400' : 'text-slate-400'}>{isLoading.toString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">isFetching (refetching):</span>
                <span className={isFetching ? 'text-amber-400 font-semibold' : 'text-slate-400'}>
                  {isFetching.toString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Controls: Search & Filters */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <h2 className="text-lg font-bold font-outfit flex items-center gap-2">
            <i className="fa-solid fa-filter text-blue-400"></i>
            Search & Filter Controls
          </h2>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Search Input */}
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-xs font-semibold text-slate-450 uppercase">Search Details (Trims spaces automatically)</label>
              <div className="relative">
                <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm"></i>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by customer name, order ID, items..."
                  className="w-full bg-slate-950 border border-slate-850 hover:border-slate-750 focus:border-blue-500 focus:outline-none py-3 pl-11 pr-4 rounded-xl text-sm transition-all"
                />
              </div>
            </div>

            {/* Status Filter Buttons */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-slate-455 uppercase">Status Filter</label>
              <div className="flex gap-2 p-1 bg-slate-950 border border-slate-850 rounded-xl">
                {(['all', 'Pending', 'Shipped', 'Delivered'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatus(s)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      status === s
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                    }`}
                  >
                    {s === 'all' ? 'All' : s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Data List Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl relative min-h-[300px]">
          {/* Loading overlay for fetching updates */}
          {isFetching && !isLoading && (
            <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[1px] flex items-center justify-center z-10 transition-all">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 rounded-full border-4 border-blue-500/10"></div>
                <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 animate-spin"></div>
              </div>
            </div>
          )}

          <div className="px-6 py-5 border-b border-slate-800/80 flex justify-between items-center">
            <h3 className="text-lg font-bold font-outfit">Orders List</h3>
            <span className="text-xs text-slate-400">
              Found {orders.length} order(s)
            </span>
          </div>

          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                <div className="relative w-12 h-12 mb-4">
                  <div className="absolute inset-0 rounded-full border-4 border-indigo-500/10"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-t-indigo-500 animate-spin"></div>
                </div>
                <p className="text-sm font-semibold animate-pulse font-outfit uppercase">
                  Pulling server datasets...
                </p>
              </div>
            ) : error ? (
              <div className="py-20 text-center text-rose-450">
                <i className="fa-solid fa-triangle-exclamation text-3xl mb-3 block"></i>
                <p className="font-semibold text-sm">Failed to retrieve server datasets.</p>
              </div>
            ) : orders.length > 0 ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-950/60 border-b border-slate-800 text-xs text-slate-450 uppercase tracking-wider font-semibold">
                    <th className="px-6 py-4">Order ID</th>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Items Summary</th>
                    <th className="px-6 py-4">Order Date</th>
                    <th className="px-6 py-4 text-right">Total Price</th>
                    <th className="px-6 py-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-800/20 transition-colors font-inter text-sm">
                      <td className="px-6 py-4 font-semibold text-slate-200">#{order.id}</td>
                      <td className="px-6 py-4 font-medium text-slate-100">{order.customer}</td>
                      <td className="px-6 py-4 text-slate-350">{order.items}</td>
                      <td className="px-6 py-4 text-slate-400 text-xs">{order.date}</td>
                      <td className="px-6 py-4 text-right font-bold text-slate-200">${order.total}</td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold inline-block w-24 text-center ${
                            order.status === 'Pending'
                              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                              : order.status === 'Shipped'
                              ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                              : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-slate-500">
                <i className="fa-solid fa-inbox text-3xl mb-3 block"></i>
                <p className="text-sm">No matching orders found on server.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
