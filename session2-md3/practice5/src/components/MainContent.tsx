import { useTheme } from '../context/ThemeContext'

interface Course {
  id: number
  title: string
  category: string
  progress: number
  lessons: string
  instructor: string
  image: string
}

export default function MainContent() {
  useTheme()

  const courses: Course[] = [
    {
      id: 1,
      title: 'Advanced React patterns & Context API',
      category: 'Development',
      progress: 65,
      lessons: '12/18 lessons',
      instructor: 'Alex Rivera',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 2,
      title: 'TypeScript Mastery for Web Apps',
      category: 'Development',
      progress: 80,
      lessons: '24/30 lessons',
      instructor: 'Sarah Jenkins',
      image: 'https://images.unsplash.com/photo-1516116211223-5c359a36298a?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 3,
      title: 'UI Design Fundamentals & Styling',
      category: 'Design',
      progress: 40,
      lessons: '4/10 lessons',
      instructor: 'Emma Watson',
      image: 'https://images.unsplash.com/photo-1541462608141-2f58c679e480?auto=format&fit=crop&w=400&q=80',
    },
  ]

  return (
    <main className="flex-1 bg-slate-50 transition-colors duration-300 py-12 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-6">
        {/* Welcome Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 md:p-12 text-white shadow-xl shadow-blue-500/10 mb-10">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span> Live Platform
            </span>
            <h1 className="mt-4 font-outfit text-3xl md:text-5xl font-extrabold tracking-tight">
              Welcome back, Jane!
            </h1>
            <p className="mt-4 text-blue-100 text-sm md:text-base leading-relaxed">
              You have completed 3 assignments this week. Keep up the momentum and finish your context API practice! Your progress is currently 12% higher than average students.
            </p>
          </div>
          {/* Background decorations */}
          <div className="absolute right-0 top-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-white/5 blur-3xl"></div>
          <div className="absolute left-1/3 bottom-0 -mb-24 h-48 w-48 rounded-full bg-indigo-500/20 blur-3xl"></div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: 'Active Courses', value: '4', icon: 'fa-book-open', color: 'text-blue-500 bg-blue-500/10' },
            { label: 'Completed Lessons', value: '40', icon: 'fa-circle-check', color: 'text-emerald-500 bg-emerald-500/10' },
            { label: 'Study Hours', value: '18.5 hrs', icon: 'fa-clock', color: 'text-amber-500 bg-amber-500/10' },
            { label: 'Certificates earned', value: '2', icon: 'fa-award', color: 'text-violet-500 bg-violet-500/10' }
          ].map((stat, i) => (
            <div key={i} className="flex items-center gap-4 rounded-2xl border border-slate-200/60 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-slate-300 dark:border-slate-800/60 dark:bg-slate-950 dark:hover:border-slate-700">
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${stat.color}`}>
                <i className={`fa-solid ${stat.icon} text-lg`}></i>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
                <p className="font-outfit text-xl font-bold text-slate-800 transition-colors dark:text-white">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Courses Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-outfit text-2xl font-bold text-slate-900 transition-colors dark:text-white">
              My Courses
            </h2>
            <button className="text-sm font-semibold text-blue-600 hover:text-blue-500 transition-colors dark:text-blue-400 dark:hover:text-blue-300">
              View All
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div
                key={course.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800/60 dark:bg-slate-950"
              >
                {/* Image & Category tag */}
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 backdrop-blur-sm px-2.5 py-0.5 text-xs font-semibold text-slate-800 shadow-sm">
                    {course.category}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                  <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
                    Instructor: {course.instructor}
                  </span>
                  <h3 className="mt-2 font-outfit text-lg font-bold leading-snug text-slate-900 transition-colors dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {course.title}
                  </h3>

                  {/* Progress bar */}
                  <div className="mt-6">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
                      <span>{course.lessons}</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800">
                      <div
                        className="h-1.5 rounded-full bg-blue-600 transition-all duration-500"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Button */}
                  <button className="mt-6 w-full rounded-xl border border-slate-200 bg-transparent py-2.5 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900">
                    Resume Lesson
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
