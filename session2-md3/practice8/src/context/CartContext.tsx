import {
    createContext,
    useContext,
    type Dispatch,
} from 'react'
import {
    type CartAction,
    type CartState,
} from '../reducers/cartReducer'

export interface CartContextType {
    state: CartState
    dispatch: Dispatch<CartAction>
}

export const CartContext = createContext<CartContextType | undefined>(undefined)

export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
}

