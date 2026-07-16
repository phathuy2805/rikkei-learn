import { useSearchParams } from 'react-router-dom'
import { type ChangeEvent } from 'react'

interface Course {
  id: number
  title: string
  category: string
  level: string
  lessons: number
  duration: string
  instructor: string
  rating: number
}

const COURSES: Course[] = [
  { id: 1, title: 'React Hooks Deep Dive', category: 'React', level: 'Intermediate', lessons: 12, duration: '6h 30m', instructor: 'Luan Nguyen', rating: 4.8 },
  { id: 2, title: 'TypeScript for Production Apps', category: 'TypeScript', level: 'Advanced', lessons: 18, duration: '9h 15m', instructor: 'Minh Hoang', rating: 4.9 },
  { id: 3, title: 'Vite & Rolldown Configuration', category: 'Build Tools', level: 'Advanced', lessons: 8, duration: '4h 45m', instructor: 'Hai Nam', rating: 4.7 },
  { id: 4, title: 'Tailwind CSS v4 Premium Design', category: 'Tailwind', level: 'Beginner', lessons: 15, duration: '8h 20m', instructor: 'Luan Nguyen', rating: 4.9 },
  { id: 5, title: 'Global State: Context API & Redux', category: 'React', level: 'Advanced', lessons: 22, duration: '11h 0m', instructor: 'Minh Hoang', rating: 4.6 },
  { id: 6, title: 'React Router v6 State & Routing', category: 'React', level: 'Intermediate', lessons: 10, duration: '5h 10m', instructor: 'Hai Nam', rating: 4.8 }
]

export default function CourseList() {
  const [searchParams, setSearchParams] = useSearchParams()

  // Retrieve values from Search Params (fallback to empty string/defaults)
  const searchQuery = searchParams.get('q') || ''
  const categoryFilter = searchParams.get('category') || 'All'

  // Handling search query change
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchParams(
      (prev) => {
        if (value) {
          prev.set('q', value)
        } else {
          prev.delete('q') // completely clean the parameter
        }
        return prev
      },
      { replace: true } // keep search interaction fluid without bloat history steps
    )
  }

  // Handling category filter selection
  const handleCategorySelect = (category: string) => {
    setSearchParams(
      (prev) => {
        if (category && category !== 'All') {
          prev.set('category', category)
        } else {
          prev.delete('category')
        }
        return prev
      },
      { replace: true }
    )
  }

  const handleClearFilters = () => {
    setSearchParams((prev) => {
      prev.delete('q')
      prev.delete('category')
      return prev
    }, { replace: true })
  }

  // Filtering logic
  const filteredCourses = COURSES.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === 'All' || course.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const categories = ['All', 'React', 'TypeScript', 'Tailwind', 'Build Tools']

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-6 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="text-center mb-12">
          <span className="text-blue-500 text-xs font-semibold tracking-wider uppercase bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            Search Synchronization
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-3 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent font-outfit">
            Course Explorer
          </h1>
          <p className="text-slate-400 mt-2 max-w-md mx-auto text-sm">
            Search filters are synchronized dynamically in the URL. Copy and share the link to preserve your search state.
          </p>
        </div>

        {/* Filters Controls Panel */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-10 shadow-xl shadow-blue-500/5">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Search Input Box */}
            <div className="relative w-full md:max-w-md">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                <i className="fa-solid fa-magnifying-glass"></i>
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search by course title or instructor..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-inter"
                id="search-input"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchParams((prev) => { prev.delete('q'); return prev }, { replace: true })}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500 hover:text-slate-300"
                >
                  <i className="fa-solid fa-circle-xmark"></i>
                </button>
              )}
            </div>

            {/* Clear All Button */}
            {(searchQuery || categoryFilter !== 'All') && (
              <button
                onClick={handleClearFilters}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 border border-rose-500/20 transition-all"
              >
                <i className="fa-solid fa-trash-can"></i>
                Clear Filters
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-800/60">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
                  categoryFilter === cat
                    ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-outfit text-xl font-bold text-slate-200">
            {filteredCourses.length === 0 ? 'No courses found' : `Available Courses (${filteredCourses.length})`}
          </h2>
          {searchQuery && (
            <span className="text-xs text-slate-400 font-inter bg-slate-900 border border-slate-800 px-3 py-1 rounded-lg">
              Filtering for "<span className="text-blue-400 font-semibold">{searchQuery}</span>"
            </span>
          )}
        </div>

        {/* Course Cards Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:-translate-y-1 hover:shadow-lg hover:border-slate-700/50 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      {course.category}
                    </span>
                    <span className="text-xs font-medium text-slate-500">
                      {course.level}
                    </span>
                  </div>
                  <h3 className="font-outfit text-lg font-bold group-hover:text-blue-400 transition-colors leading-snug">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2">
                    Instructor: <span className="font-semibold text-slate-300">{course.instructor}</span>
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/40 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    <i className="fa-solid fa-clock text-slate-500"></i>
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-amber-400 font-semibold">
                    <i className="fa-solid fa-star text-xs"></i>
                    <span>{course.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-900/30 border border-dashed border-slate-800 rounded-3xl">
            <div className="text-slate-600 text-4xl mb-4">
              <i className="fa-solid fa-book-open-reader"></i>
            </div>
            <p className="text-slate-400 font-medium">We couldn't find any courses matching your filters.</p>
            <button
              onClick={handleClearFilters}
              className="mt-4 px-4 py-2 bg-blue-600/10 hover:bg-blue-600/25 text-blue-400 border border-blue-500/30 rounded-xl text-xs font-semibold transition-all"
            >
              Reset Search Parameters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
