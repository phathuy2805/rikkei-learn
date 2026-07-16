import { useCart } from '../context/CartContext'
import { type CartItem } from '../reducers/cartReducer'

const AVAILABLE_COURSES: CartItem[] = [
  {
    id: 1,
    title: 'React Hooks Deep Dive & Global State',
    price: 99,
    instructor: 'Luan Nguyen',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 2,
    title: 'TypeScript for Enterprise Applications',
    price: 149,
    instructor: 'Minh Hoang',
    image: 'https://images.unsplash.com/photo-1516116211223-5c359a36298a?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 3,
    title: 'Tailwind CSS v4 Premium Design systems',
    price: 79,
    instructor: 'Luan Nguyen',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 4,
    title: 'Vite & Rolldown Masterclass',
    price: 119,
    instructor: 'Hai Nam',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80'
  }
]

export default function CourseList() {
  const { state, dispatch } = useCart()

  const handleAddToCart = (course: CartItem) => {
    dispatch({ type: 'ADD_ITEM', payload: course })
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl shadow-blue-500/5">
      <h2 className="font-outfit text-xl font-bold mb-6 flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600/10 text-blue-400 border border-blue-500/20">
          <i className="fa-solid fa-graduation-cap text-xs"></i>
        </span>
        Available Courses
      </h2>

      <div className="grid sm:grid-cols-2 gap-6">
        {AVAILABLE_COURSES.map((course) => {
          const inCart = state.items.some((item) => item.id === course.id)

          return (
            <div
              key={course.id}
              className="bg-slate-950/45 border border-slate-850 rounded-2xl overflow-hidden flex flex-col justify-between transition-all hover:border-slate-750 group"
            >
              {/* Image */}
              <div className="h-36 overflow-hidden bg-slate-800 relative">
                <img
                  src={course.image}
                  alt={course.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-103"
                />
              </div>

              {/* Body */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-outfit text-sm font-bold text-slate-200 leading-snug line-clamp-2 group-hover:text-blue-400 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-[10px] text-slate-500 mt-1">
                    By {course.instructor}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-900/60">
                  <span className="text-sm font-extrabold text-blue-400">
                    ${course.price}
                  </span>

                  <button
                    onClick={() => handleAddToCart(course)}
                    disabled={inCart}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1.5 transition-all ${
                      inCart
                        ? 'bg-slate-900 text-slate-500 border border-slate-850 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-500 text-white shadow-sm'
                    }`}
                  >
                    {inCart ? (
                      <>
                        <i className="fa-solid fa-circle-check"></i> Added
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-plus"></i> Add to Cart
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
