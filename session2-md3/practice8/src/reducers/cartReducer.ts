/**
 * COMPARISON: MULTIPLE INDEPENDENT STATE VARIABLES (useState) VS CONSOLIDATED REDUCER (useReducer)
 * 
 * | Dimension | Option A: Multiple useState Hooks | Option B: Consolidated useReducer |
 * | :--- | :--- | :--- |
 * | **State Atomicity** | **Weak**. Multiple consecutive updates (e.g., updating items, then coupon, then recalculating total price) cause multiple re-renders and potential async issues. | **Excellent**. The entire state is updated atomically in one single transition inside a pure function. |
 * | **Logic Location** | **Scattered**. Business logic is spread across component event handlers, making components large and hard to test. | **Centralized**. All business logic lives in the `cartReducer` pure function, decoupleable and easily unit-tested. |
 * | **TypeScript Support** | **Moderate**. Requires independent hooks typed individually. Hard to tie dependencies together statically. | **Excellent**. Discriminated Unions on `CartAction` guarantee strict compile-time checking of parameters based on action type. |
 * | **Data Integrity** | **Prone to bugs**. Developers must remember to add boundary checks (like checking for duplicate items) before setting states. | **Guaranteed**. The reducer acts as a central guard, preventing state corruption (e.g., rejecting additions of duplicate items). |
 * 
 * ---
 * 
 * ### ACTIONS DISCRIMINATED UNION MATRIX
 * 
 * | Action Type | Payload Type | Description | State Changes |
 * | :--- | :--- | :--- | :--- |
 * | `ADD_ITEM` | `CartItem` | Adds a course to the shopping cart. | Appends the item to the list if not duplicate, recalculates total. |
 * | `REMOVE_ITEM` | `number` (Course ID) | Removes a course from the cart. | Filters out the item matching the ID, recalculates total. |
 * | `APPLY_COUPON` | `string` (Coupon Code) | Validates and applies a discount code. | Sets coupon name, updates discount percent (10% or 20%), recalculates total. |
 * | `CLEAR_CART` | `void` (None) | Empties the shopping cart. | Resets items, coupon, discount, and total price to initial defaults. |
 */

export interface CartItem {
  id: number
  title: string
  price: number
  instructor: string
  image: string
}

export interface CartState {
  items: CartItem[]
  couponCode: string | null
  discountPercent: number
  totalPrice: number
}

export type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'APPLY_COUPON'; payload: string }
  | { type: 'CLEAR_CART' }

export const INITIAL_STATE: CartState = {
  items: [],
  couponCode: null,
  discountPercent: 0,
  totalPrice: 0
}

// Helper to calculate total price after discount
function calculateTotal(items: CartItem[], discountPercent: number): number {
  const subtotal = items.reduce((sum, item) => sum + item.price, 0)
  const discountAmount = subtotal * (discountPercent / 100)
  return Math.max(0, subtotal - discountAmount)
}

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      // Data integrity constraint: prevent duplicate item additions
      const exists = state.items.some((item) => item.id === action.payload.id)
      if (exists) {
        return state // Refuse action, return state unchanged
      }
      
      const newItems = [...state.items, action.payload]
      return {
        ...state,
        items: newItems,
        totalPrice: calculateTotal(newItems, state.discountPercent)
      }
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter((item) => item.id !== action.payload)
      return {
        ...state,
        items: newItems,
        totalPrice: calculateTotal(newItems, state.discountPercent)
      }
    }

    case 'APPLY_COUPON': {
      const coupon = action.payload.trim().toUpperCase()
      let discount = 0

      // Simple mock coupon evaluation
      if (coupon === 'RIKKEI20') {
        discount = 20
      } else if (coupon === 'EDU10') {
        discount = 10
      }

      return {
        ...state,
        couponCode: coupon || null,
        discountPercent: discount,
        totalPrice: calculateTotal(state.items, discount)
      }
    }

    case 'CLEAR_CART':
      return INITIAL_STATE

    default:
      return state
  }
}
