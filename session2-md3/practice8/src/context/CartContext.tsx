import { createContext, useContext, useReducer, type ReactNode, type Dispatch } from 'react'
import { cartReducer, INITIAL_STATE, type CartState, type CartAction } from '../reducers/cartReducer'

interface CartContextType {
  state: CartState
  dispatch: Dispatch<CartAction>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE)

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
