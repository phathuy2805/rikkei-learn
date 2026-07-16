import { CartProvider } from './context/CartContext'
import CourseList from './components/CourseList'
import CartPanel from './components/CartPanel'

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-6 font-sans">
        <div className="max-w-6xl mx-auto">
          {/* Header Banner */}
          <div className="text-center mb-12">
            <span className="text-blue-500 text-xs font-semibold tracking-wider uppercase bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
              State Coordination
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold mt-3 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent font-outfit">
              Cart State Coordinator
            </h1>
            <p className="text-slate-400 mt-2 max-w-lg mx-auto text-sm">
              Atomically synchronizing shopping cart actions, coupon code mappings, and discount pricing rules inside a React <code>useReducer</code>.
            </p>
          </div>

          {/* Grid Panel Layout */}
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Available Products */}
            <div className="lg:col-span-7">
              <CourseList />
            </div>

            {/* Shopping Cart Summary */}
            <div className="lg:col-span-5 lg:sticky lg:top-6">
              <CartPanel />
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-12 text-center text-xs text-slate-600">
            Rikkei Education • Module 3 • Session 2 • Practice 8
          </div>
        </div>
      </div>
    </CartProvider>
  )
}