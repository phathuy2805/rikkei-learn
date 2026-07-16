import { type InventoryItem } from '../store/useInventoryStore'

const MOCK_INVENTORY: InventoryItem[] = [
    {
        id: 'INV-001',
        name: 'MacBook Air M3 16GB',
        sku: 'MBA-M3-16G-512',
        quantity: 24,
        category: 'Laptops',
        unit: 'units',
        updateLimit: 3,
        updateCount: 0,
    },
    {
        id: 'INV-002',
        name: 'iPhone 15 Pro 128GB',
        sku: 'IPH15P-128-GR',
        quantity: 15,
        category: 'Phones',
        unit: 'units',
        updateLimit: 2,
        updateCount: 0,
    },
    {
        id: 'INV-003',
        name: 'Keychron Q1 Max Keyboard',
        sku: 'KCY-Q1M-BRWN',
        quantity: 45,
        category: 'Keyboards',
        unit: 'units',
        updateLimit: 3,
        updateCount: 0,
    },
    {
        id: 'INV-004',
        name: 'Sony LinkBuds S Earbuds',
        sku: 'SON-LBS-WHT',
        quantity: 8,
        category: 'Audio',
        unit: 'units',
        updateLimit: 3,
        updateCount: 0,
    },
    {
        id: 'INV-005',
        name: 'LG DualUp Monitor 28MQ780',
        sku: 'LG-DUP-28MQ',
        quantity: 0,
        category: 'Monitors',
        unit: 'units',
        updateLimit: 1,
        updateCount: 0,
    },
]

export const fetchInventory = async (): Promise<InventoryItem[]> => {
    // Simulate 500ms network delay
    await new Promise((resolve) => setTimeout(resolve, 500))
    // Return deep copy to prevent direct mutations of the cache
    return JSON.parse(JSON.stringify(MOCK_INVENTORY))
}

export const updateInventoryQuantity = async (
    id: string,
    quantity: number,
): Promise<InventoryItem> => {
    // Simulate 800ms API write delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Validation Trap 1: Negative quantities
    if (quantity < 0) {
        throw new Error(
            'Quantity cannot be negative! Please enter a valid non-negative integer.',
        )
    }

    const index = MOCK_INVENTORY.findIndex((item) => item.id === id)
    if (index === -1) {
        throw new Error('Item not found in inventory database.')
    }

    const item = MOCK_INVENTORY[index]

    // Validation Trap 2: Update quota limit exceeded
    if (item.updateCount >= item.updateLimit) {
        throw new Error(
            `API Error: Update quota exceeded for SKU "${item.sku}". Max allowed changes during audit is ${item.updateLimit}.`,
        )
    }

    // Update item details
    MOCK_INVENTORY[index] = {
        ...item,
        quantity,
        updateCount: item.updateCount + 1,
    }

    return MOCK_INVENTORY[index]
}
