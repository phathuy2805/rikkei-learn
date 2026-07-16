import { useState } from 'react'
import { useQuery, useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query'
import { useInventoryStore, type InventoryItem } from './store/useInventoryStore'
import { fetchInventory, updateInventoryQuantity } from './api/inventory'

// Sub-component: InventoryForm (Self-contained form state that resets automatically when key changes)
interface InventoryFormProps {
  selectedItem: InventoryItem
  mutation: UseMutationResult<InventoryItem, Error, { id: string; qty: number }, unknown>
  closeSidebar: () => void
}

function InventoryForm({ selectedItem, mutation, closeSidebar }: InventoryFormProps) {
  const [inputQty, setInputQty] = useState(() => selectedItem.quantity.toString())
  const [localError, setLocalError] = useState<string | null>(null)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    const parsedQty = parseInt(inputQty.trim(), 10)
    
    // Client-side stock check
    if (isNaN(parsedQty)) {
      setLocalError('Please enter a valid integer.')
      return
    }
    if (parsedQty < 0) {
      setLocalError('Negative stock quantities are not allowed.')
      return
    }

    setLocalError(null)
    mutation.mutate({ id: selectedItem.id, qty: parsedQty })
  }

  return (
    <form onSubmit={handleSave} className="space-y-4">
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-slate-455 uppercase">New Audit Count</label>
        <div className="relative">
          <input
            type="number"
            value={inputQty}
            onChange={(e) => setInputQty(e.target.value)}
            placeholder="Enter quantity count..."
            className="w-full bg-slate-950 border border-slate-850 hover:border-slate-750 focus:border-blue-500 focus:outline-none py-3 pl-4 pr-16 rounded-xl text-sm transition-all"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500">
            {selectedItem.unit}
          </span>
        </div>
      </div>

      {/* Validation Error Notices */}
      {localError && (
        <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex gap-2">
          <i className="fa-solid fa-circle-exclamation mt-0.5"></i>
          <span>{localError}</span>
        </div>
      )}

      {mutation.isError && (
        <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex gap-2">
          <i className="fa-solid fa-triangle-exclamation mt-0.5"></i>
          <span>{mutation.error.message}</span>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={closeSidebar}
          className="flex-1 py-2.5 bg-slate-950 border border-slate-850 hover:bg-slate-900 text-slate-400 hover:text-slate-200 rounded-lg text-xs font-bold transition-all cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={mutation.isPending}
          className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-650 text-white rounded-lg text-xs font-bold transition-all shadow-lg hover:shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer"
        >
          {mutation.isPending ? (
            <>
              <i className="fa-solid fa-spinner animate-spin"></i>
              Saving...
            </>
          ) : (
            'Save Changes'
          )}
        </button>
      </div>
    </form>
  )
}

// Main App Container
export default function App() {
  const queryClient = useQueryClient()
  
  // Zustand Client State selectors
  const selectedItem = useInventoryStore((state) => state.selectedItem)
  const isSidebarOpen = useInventoryStore((state) => state.isSidebarOpen)
  const selectItem = useInventoryStore((state) => state.selectItem)
  const closeSidebar = useInventoryStore((state) => state.closeSidebar)

  // TanStack Query for Inventory List (Server State)
  const {
    data: items = [],
    isLoading,
    isFetching,
    error: queryError,
  } = useQuery({
    queryKey: ['inventory'],
    queryFn: fetchInventory,
  })

  // TanStack Query Mutation for updating quantity
  const mutation = useMutation({
    mutationFn: ({ id, qty }: { id: string; qty: number }) =>
      updateInventoryQuantity(id, qty),
    onSuccess: () => {
      // 1. Invalidate cache to trigger background refetch of list
      queryClient.invalidateQueries({ queryKey: ['inventory'] })
      // 2. Close Sidebar drawer (Zustand client state)
      closeSidebar()
    },
  })

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-6 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/60 backdrop-blur-md p-6 rounded-2xl border border-slate-800/80">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              Zustand & TanStack Query Sync Engine
            </div>
            <h1 className="text-3xl font-extrabold font-outfit bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Warehouse Audit Matrix
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              End-to-End state management sandbox. Selecting an item opens the Zustand Sidebar. Saving runs a TanStack Mutation, updating the server database and invalidating list cache.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-405 uppercase">Sync Status:</span>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-955 border border-slate-800">
              <span
                className={`w-2 h-2 rounded-full ${
                  isFetching || mutation.isPending ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'
                }`}
              ></span>
              <span className="text-xs font-bold text-slate-350">
                {mutation.isPending ? 'Updating Server...' : isFetching ? 'Refetching List...' : 'Synced'}
              </span>
            </div>
          </div>
        </div>

        {/* Diagnostic HUD Monitor */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Zustand Client HUD */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Zustand State (Client-Side)</span>
              <div className="mt-4 space-y-2 text-xs font-mono bg-slate-950 p-4 rounded-xl border border-slate-850">
                <div className="flex justify-between">
                  <span className="text-slate-500">isSidebarOpen:</span>
                  <span className="text-slate-200">{isSidebarOpen.toString().toUpperCase()}</span>
                </div>
                <div className="flex justify-between border-t border-slate-850/60 pt-2 mt-2">
                  <span className="text-slate-500">selectedItemId:</span>
                  <span className="text-slate-200">
                    {selectedItem ? `"${selectedItem.id}"` : 'null'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">selectedItemName:</span>
                  <span className="text-slate-200 max-w-[200px] truncate">
                    {selectedItem ? `"${selectedItem.name}"` : 'null'}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-[10px] text-slate-500 mt-3">
              Manages purely UI state: selected row, drawer open/close.
            </p>
          </div>

          {/* TanStack Server HUD */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">TanStack Query State (Server-Side)</span>
              <div className="mt-4 space-y-2 text-xs font-mono bg-slate-950 p-4 rounded-xl border border-slate-850">
                <div className="flex justify-between">
                  <span className="text-slate-500">queryKey:</span>
                  <span className="text-slate-200">["inventory"]</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">isFetching:</span>
                  <span className="text-slate-200">{isFetching.toString().toUpperCase()}</span>
                </div>
                <div className="flex justify-between border-t border-slate-850/60 pt-2 mt-2">
                  <span className="text-slate-500">mutation.status:</span>
                  <span className="text-slate-200">{mutation.status.toUpperCase()}</span>
                </div>
              </div>
            </div>
            <p className="text-[10px] text-slate-500 mt-3">
              Manages remote server database states, query cache, invalidations.
            </p>
          </div>
        </div>

        {/* Data list and Sidebar Form Container */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Inventory Table (Left Side) */}
          <div className="flex-1 w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl min-h-[300px] relative">
            {isFetching && !isLoading && (
              <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[0.5px] flex items-center justify-center z-10"></div>
            )}
            
            <div className="px-6 py-5 border-b border-slate-800/80 flex justify-between items-center bg-slate-900">
              <h3 className="text-lg font-bold font-outfit">Inventory Stock Records</h3>
              <span className="text-xs text-slate-400">
                {items.length} skus logged
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
                    Syncing warehouse matrix...
                  </p>
                </div>
              ) : queryError ? (
                <div className="py-20 text-center text-rose-455">
                  <i className="fa-solid fa-triangle-exclamation text-3xl mb-3 block"></i>
                  <p className="font-semibold text-sm">Failed to retrieve server datasets.</p>
                </div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-950/60 border-b border-slate-800 text-xs text-slate-450 uppercase tracking-wider font-semibold">
                      <th className="px-6 py-4">Item Details / SKU</th>
                      <th className="px-6 py-4 text-center">Category</th>
                      <th className="px-6 py-4 text-right">In Stock</th>
                      <th className="px-6 py-4 text-center">Updates Used</th>
                      <th className="px-6 py-4 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/40">
                    {items.map((item: InventoryItem) => (
                      <tr
                        key={item.id}
                        className={`hover:bg-slate-800/20 transition-colors font-inter text-sm ${
                          selectedItem?.id === item.id ? 'bg-blue-500/5' : ''
                        }`}
                      >
                        <td className="px-6 py-4">
                          <div className="font-semibold text-slate-100">{item.name}</div>
                          <div className="text-xs text-slate-500 font-normal mt-0.5">{item.sku}</div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                            {item.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="font-bold text-slate-200">
                            {item.quantity} <span className="text-xs text-slate-500 font-normal">{item.unit}</span>
                          </div>
                          <span
                            className={`text-[10px] font-bold ${
                              item.quantity === 0
                                ? 'text-rose-455'
                                : item.quantity < 10
                                ? 'text-amber-450'
                                : 'text-emerald-400'
                            }`}
                          >
                            {item.quantity === 0 ? 'OUT OF STOCK' : item.quantity < 10 ? 'LOW STOCK' : 'IN STOCK'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="text-xs text-slate-350">
                            {item.updateCount} / {item.updateLimit} limit
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => selectItem(item)}
                            className="px-3.5 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 hover:border-blue-500/30 text-xs font-bold transition-all cursor-pointer"
                          >
                            Select (Audit)
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Right Sidebar Edit Drawer */}
          {isSidebarOpen && selectedItem && (
            <div className="w-full lg:w-96 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6 animate-fade-in relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl"></div>
              
              {/* Header Drawer */}
              <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <div>
                  <h3 className="font-bold text-lg font-outfit text-white">Stock Adjustment</h3>
                  <span className="text-[10px] font-semibold text-slate-500 uppercase">Item ID: #{selectedItem.id}</span>
                </div>
                <button
                  onClick={closeSidebar}
                  className="text-slate-400 hover:text-slate-200 transition-colors w-7 h-7 flex items-center justify-center bg-slate-950 border border-slate-855 rounded-lg cursor-pointer"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>

              {/* Selected Item Brief */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-855 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-550">Name:</span>
                  <span className="text-slate-200 font-semibold">{selectedItem.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-550">SKU:</span>
                  <span className="text-slate-300 font-mono">{selectedItem.sku}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-555">Update Limits Used:</span>
                  <span className="text-slate-300 font-bold">
                    {selectedItem.updateCount} / {selectedItem.updateLimit} changes
                  </span>
                </div>
              </div>

              {/* Self-contained form resetting with key */}
              <InventoryForm
                key={selectedItem.id}
                selectedItem={selectedItem}
                mutation={mutation}
                closeSidebar={closeSidebar}
              />
            </div>
          )}
        </div>

        {/* Visual Dataflow Diagram Block */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <h2 className="text-xl font-bold font-outfit flex items-center gap-2">
            <i className="fa-solid fa-project-diagram text-blue-400"></i>
            Architectural Dataflow Diagram
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
            {/* Step 1 */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-850 text-center relative group hover:border-blue-500/30 transition-all">
              <span className="w-5 h-5 rounded-full bg-blue-500 text-slate-955 text-[10px] font-bold inline-flex items-center justify-center mb-2">1</span>
              <p className="text-xs font-bold text-slate-200">Fetch Data</p>
              <p className="text-[10px] text-slate-500 mt-1">TanStack Query gets stock from server</p>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex justify-center text-slate-600 text-sm">
              <i className="fa-solid fa-chevron-right"></i>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-850 text-center relative group hover:border-blue-500/30 transition-all">
              <span className="w-5 h-5 rounded-full bg-blue-500 text-slate-955 text-[10px] font-bold inline-flex items-center justify-center mb-2">2</span>
              <p className="text-xs font-bold text-slate-200">Zustand Select</p>
              <p className="text-[10px] text-slate-500 mt-1">Saves selectedItem, opens right Sidebar Drawer</p>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex justify-center text-slate-600 text-sm">
              <i className="fa-solid fa-chevron-right"></i>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-850 text-center relative group hover:border-blue-500/30 transition-all">
              <span className="w-5 h-5 rounded-full bg-blue-500 text-slate-955 text-[10px] font-bold inline-flex items-center justify-center mb-2">3</span>
              <p className="text-xs font-bold text-slate-200">TanStack Mutate</p>
              <p className="text-[10px] text-slate-500 mt-1">Triggers Mutation on form submission</p>
            </div>
          </div>
          
          <div className="p-4 rounded-xl bg-emerald-955/20 border border-emerald-500/20 text-xs text-slate-300 leading-relaxed">
            <strong className="text-emerald-400">Unified Sync (Đại Thống Nhất):</strong> When the mutation succeeds, the query cache is invalidated using <code className="text-slate-350">queryClient.invalidateQueries</code>, causing TanStack Query to refetch data, which instantly updates the main list table. Simultaneously, Zustand closes the Sidebar and clears the state. The entire cycle completes automatically with strict, predictable boundaries!
          </div>
        </div>

      </div>
    </div>
  )
}
