import { useReducer, type ReactNode } from 'react'
import { CartContext } from './CartContext'
import { cartReducer, INITIAL_STATE } from '../reducers/cartReducer'

export function CartProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE)

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    )
}
