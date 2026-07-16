import { create } from 'zustand'

export type OrderStatus = 'all' | 'Pending' | 'Shipped' | 'Delivered'

interface FilterState {
  status: OrderStatus
  search: string
  setStatus: (status: OrderStatus) => void
  setSearch: (search: string) => void
  getTrimmedSearch: () => string
}

export const useFilterStore = create<FilterState>((set, get) => ({
  status: 'all',
  search: '',
  setStatus: (status) => set({ status }),
  setSearch: (search) => set({ search }),
  getTrimmedSearch: () => get().search.trim(),
}))
