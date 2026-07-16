import { useState, type FormEvent } from 'react'
import { useCart } from '../context/CartContext'

export default function CartPanel() {
  const { state, dispatch } = useCart()
  const [couponInput, setCouponInput] = useState('')
  const [showCheckoutSuccess, setShowCheckoutSuccess] = useState(false)

  const handleRemoveItem = (id: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id })
  }

  const handleApplyCoupon = (e: FormEvent) => {
    e.preventDefault()
    dispatch({ type: 'APPLY_COUPON', payload: couponInput })
  }

  const handleCheckout = () => {
    dispatch({ type: 'CLEAR_CART' })
    setCouponInput('')
    setShowCheckoutSuccess(true)
    setTimeout(() => {
      setShowCheckoutSuccess(false)
    }, 4000)
  }

  // Cost calculations
  const subtotal = state.items.reduce((sum, item) => sum + item.price, 0)
  const discountAmount = subtotal * (state.discountPercent / 100)

  // Verify if coupon is invalid
  const hasInvalidCoupon = state.couponCode && state.discountPercent === 0

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl shadow-blue-500/5 flex flex-col h-full justify-between">
      <div>
        <h2 className="font-outfit text-xl font-bold mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600/10 text-blue-400 border border-blue-500/20">
              <i className="fa-solid fa-cart-shopping text-xs"></i>
            </span>
            <span>Shopping Cart</span>
          </div>
          {state.items.length > 0 && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-600 text-white font-mono">
              {state.items.length}
            </span>
          )}
        </h2>

        {showCheckoutSuccess && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 text-center mb-6 text-xs text-emerald-400 font-semibold flex items-center justify-center gap-2">
            <i className="fa-solid fa-circle-check text-sm"></i>
            Checkout complete! Thank you for purchasing.
          </div>
        )}

        {/* Selected Items List */}
        {state.items.length > 0 ? (
          <div className="space-y-3.5 mb-6 max-h-[220px] overflow-y-auto pr-1">
            {state.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 p-3 bg-slate-950/40 border border-slate-850 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded bg-slate-800 overflow-hidden shrink-0">
                    <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-200 line-clamp-1">{item.title}</h4>
                    <p className="text-[9px] text-slate-500">Instructor: {item.instructor}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-extrabold text-blue-400">${item.price}</span>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-slate-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-500/10 transition-all text-xs"
                    aria-label="Remove item"
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-slate-950/20 border border-slate-850 rounded-2xl mb-6">
            <div className="text-slate-700 text-3xl mb-2">
              <i className="fa-solid fa-basket-shopping"></i>
            </div>
            <p className="text-xs text-slate-500">Your cart is currently empty.</p>
          </div>
        )}
      </div>

      {/* Pricing Breakdown & Checkout Form */}
      {state.items.length > 0 && (
        <div className="pt-6 border-t border-slate-800/60">
          {/* Coupon Code Input */}
          <form onSubmit={handleApplyCoupon} className="flex gap-2 mb-6">
            <input
              type="text"
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
              placeholder="Enter coupon (e.g. RIKKEI20, EDU10)"
              className="flex-1 bg-slate-950 border border-slate-850 rounded-xl px-3 py-2 text-xs placeholder-slate-650 text-slate-200 focus:outline-none focus:border-blue-500 transition-all"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-350 hover:text-white rounded-xl text-xs font-semibold border border-slate-750 transition-all"
            >
              Apply
            </button>
          </form>

          {/* Coupon feedback */}
          {state.couponCode && (
            <div className="mb-6">
              {state.discountPercent > 0 ? (
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-2.5 text-[10px] text-emerald-400 font-medium flex items-center gap-1.5">
                  <i className="fa-solid fa-circle-check"></i>
                  Coupon <strong>{state.couponCode}</strong> applied successfully! ({state.discountPercent}% off)
                </div>
              ) : hasInvalidCoupon ? (
                <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-2.5 text-[10px] text-rose-400 font-medium flex items-center gap-1.5">
                  <i className="fa-solid fa-circle-xmark"></i>
                  Invalid coupon code <strong>{state.couponCode}</strong>.
                </div>
              ) : null}
            </div>
          )}

          {/* Price Table */}
          <div className="space-y-2 text-xs mb-6 bg-slate-950/20 border border-slate-850 p-4 rounded-2xl">
            <div className="flex justify-between text-slate-450">
              <span>Subtotal:</span>
              <span className="font-semibold text-slate-300">${subtotal}</span>
            </div>
            {state.discountPercent > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>Discount ({state.discountPercent}%):</span>
                <span>-${discountAmount.toFixed(1)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm font-bold text-slate-200 pt-2.5 border-t border-slate-900/60">
              <span>Total Price:</span>
              <span className="text-blue-400">${state.totalPrice.toFixed(1)}</span>
            </div>
          </div>

          {/* Checkout Button */}
          <button
            onClick={handleCheckout}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-blue-500/10 transition-all flex items-center justify-center gap-2"
          >
            <i className="fa-solid fa-credit-card"></i> Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  )
}
