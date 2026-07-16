import { useEffect, useState } from 'react'
import { useCountdown } from '../hooks/useCountdown'

interface Product {
  name: string
  originalPrice: number
  salePrice: number
  stockTotal: number
  stockSold: number
  image: string
}

export default function FlashSale() {
  const [purchaseSuccess, setPurchaseSuccess] = useState(false)
  const [soldCount, setSoldCount] = useState(14)

  const product: Product = {
    name: 'iPad Pro 11-inch M4 Chip (Wi-Fi, 256GB)',
    originalPrice: 999,
    salePrice: 799,
    stockTotal: 20,
    stockSold: soldCount,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=400&q=80'
  }

  const { seconds, isActive, start, pause, reset } = useCountdown({
    initialSeconds: 90,
    onComplete: () => {}
  })

  // Start the countdown automatically when mounted
  useEffect(() => {
    start()
  }, [start])

  // Format time to MM:SS
  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60)
    const secs = time % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  };

  const handlePurchase = () => {
    if (seconds === 0 || purchaseSuccess) return
    setPurchaseSuccess(true)
    setSoldCount((prev) => prev + 1)
    setTimeout(() => {
      setPurchaseSuccess(false)
    }, 3000)
  }

  const handleResetSale = () => {
    reset()
    start()
    setSoldCount(14)
  }

  const isSaleEnded = seconds === 0
  const stockPercent = (product.stockSold / product.stockTotal) * 100

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl shadow-blue-500/5 flex flex-col h-full justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-600/10 text-rose-400 border border-rose-500/20">
              <i className="fa-solid fa-bolt text-sm animate-bounce"></i>
            </div>
            <h2 className="font-outfit text-xl font-bold">Flash Sale</h2>
          </div>

          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 uppercase tracking-wide">
            Ending Soon
          </span>
        </div>

        {/* Dynamic Digital Timer Display */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-1.5">
            {formatTime(seconds)
              .split('')
              .map((char, idx) => {
                if (char === ':') {
                  return (
                    <span key={idx} className="text-xl font-bold text-slate-500 px-1 animate-pulse">
                      :
                    </span>
                  )
                }
                return (
                  <div
                    key={idx}
                    className={`h-12 w-8 md:h-14 md:w-10 flex items-center justify-center rounded-lg border font-mono text-xl md:text-2xl font-bold shadow-inner ${
                      isSaleEnded
                        ? 'bg-slate-950 border-slate-900 text-slate-600'
                        : seconds < 15
                        ? 'bg-rose-950/80 border-rose-800/80 text-rose-400'
                        : 'bg-slate-950 border-slate-800 text-blue-400'
                    }`}
                  >
                    {char}
                  </div>
                )
              })}
          </div>
        </div>

        {/* Product Details Card */}
        <div className="rounded-2xl border border-slate-850 bg-slate-950/30 overflow-hidden flex flex-col sm:flex-row gap-4 p-4">
          <div className="h-28 w-full sm:w-28 rounded-lg overflow-hidden bg-slate-800 shrink-0">
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col justify-between py-1">
            <div>
              <h3 className="font-outfit text-sm font-bold text-slate-200 line-clamp-2">
                {product.name}
              </h3>
              <div className="flex items-baseline gap-2 mt-2">
                <span className={`text-base font-extrabold font-outfit ${isSaleEnded ? 'text-slate-500' : 'text-rose-400'}`}>
                  ${product.salePrice}
                </span>
                <span className="text-xs text-slate-500 line-through">${product.originalPrice}</span>
              </div>
            </div>

            {/* Stock status */}
            <div className="mt-3">
              <div className="flex justify-between text-[10px] font-semibold text-slate-400 mb-1.5">
                <span>Sold: {product.stockSold}/{product.stockTotal} items</span>
                <span>{Math.round(stockPercent)}%</span>
              </div>
              <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${isSaleEnded ? 'bg-slate-700' : 'bg-rose-500'}`}
                  style={{ width: `${stockPercent}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Control Actions */}
      <div className="mt-8 pt-6 border-t border-slate-800/65">
        {purchaseSuccess && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-3 text-center mb-6 text-xs font-semibold text-emerald-400 flex items-center justify-center gap-2">
            <i className="fa-solid fa-circle-check"></i> Purchase successful! Item added to cart.
          </div>
        )}

        {isSaleEnded && (
          <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-3 text-center mb-6 text-xs font-semibold text-rose-400 flex items-center justify-center gap-2">
            <i className="fa-solid fa-triangle-exclamation"></i> The flash sale event has ended!
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handlePurchase}
            disabled={isSaleEnded || purchaseSuccess}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs transition-all shadow-lg text-white bg-rose-600 hover:bg-rose-500 shadow-rose-500/10 disabled:bg-slate-900 disabled:border-slate-800 disabled:text-slate-600 disabled:shadow-none disabled:cursor-not-allowed"
          >
            <i className="fa-solid fa-cart-shopping"></i> {isSaleEnded ? 'Sale Closed' : 'Buy Now'}
          </button>

          <div className="flex gap-2">
            {isActive ? (
              <button
                onClick={pause}
                disabled={isSaleEnded}
                className="flex-1 sm:flex-initial px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-750 rounded-xl font-semibold text-xs transition-all disabled:opacity-50"
                aria-label="Pause timer"
              >
                <i className="fa-solid fa-pause"></i>
              </button>
            ) : (
              <button
                onClick={start}
                disabled={isSaleEnded}
                className="flex-1 sm:flex-initial px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-xs transition-all disabled:opacity-50"
                aria-label="Resume timer"
              >
                <i className="fa-solid fa-play"></i>
              </button>
            )}

            <button
              onClick={handleResetSale}
              className="px-4 py-2.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 rounded-xl font-semibold text-xs transition-all"
              title="Reset Timer and Sale"
            >
              <i className="fa-solid fa-rotate-left"></i> Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
