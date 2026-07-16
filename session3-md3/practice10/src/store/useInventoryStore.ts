import { create } from 'zustand'

export interface InventoryItem {
  id: string
  name: string
  sku: string
  quantity: number
  category: string
  unit: string
  updateLimit: number
  updateCount: number
}

interface InventoryStoreState {
  selectedItem: InventoryItem | null
  isSidebarOpen: boolean
  selectItem: (item: InventoryItem) => void
  closeSidebar: () => void
  openSidebar: () => void
}

export const useInventoryStore = create<InventoryStoreState>((set) => ({
  selectedItem: null,
  isSidebarOpen: false,
  selectItem: (item) => set({ selectedItem: item, isSidebarOpen: true }),
  closeSidebar: () => set({ selectedItem: null, isSidebarOpen: false }),
  openSidebar: () => set({ isSidebarOpen: true }),
}))
