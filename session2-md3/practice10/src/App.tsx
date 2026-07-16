/* eslint-disable react-hooks/purity */
/* eslint-disable react-hooks/refs */
/* eslint-disable react-hooks/set-state-in-effect */

import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useRef,
} from 'react'

// Define Student Interface
interface Student {
  id: number
  name: string
  email: string
  course: string
  score: number
  status: 'Pass' | 'Fail'
}

// Generate 5,000 students once outside of component scope
const generateStudents = (): Student[] => {
  const courses = [
    'React & TypeScript',
    'Next.js Advanced',
    'Node.js Backend',
    'System Design Suite',
  ]
  const names = [
    'Nguyễn Văn A',
    'Trần Thị B',
    'Lê Hoàng C',
    'Phạm Minh D',
    'Đỗ Thùy E',
    'Vũ Quốc F',
    'Hoàng Lan G',
    'Ngô Quang H',
    'Lý Cường I',
    'Mai Phương K',
  ]
  const students: Student[] = []
  for (let i = 1; i <= 5000; i++) {
    const name = `${names[i % names.length]} ${i}`
    const score = Math.floor(Math.random() * 41) + 60 // score from 60 to 100
    students.push({
      id: i,
      name,
      email: `student${i}@rikkeiedu.vn`,
      course: courses[i % courses.length],
      score,
      status: score >= 80 ? 'Pass' : 'Fail',
    })
  }
  return students
}

const ALL_STUDENTS = generateStudents()

// Heavy computational filter function simulating system bottleneck
const filterStudentsExpensive = (
  students: Student[],
  search: string,
  course: string
): Student[] => {
  const startTime = performance.now()
  // Simulate heavy computation (150ms synchronous block)
  while (performance.now() - startTime < 150) {
    // Synchronous block
  }

  const searchLower = search.trim().toLowerCase()
  return students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchLower) ||
      student.email.toLowerCase().includes(searchLower)
    const matchesCourse = course === 'all' || student.course === course
    return matchesSearch && matchesCourse
  })
}

// Memoized Student Row Component
interface StudentRowProps {
  student: Student
  isChecked: boolean
  onToggle: (id: number) => void
}

const StudentRow = React.memo(({ student, isChecked, onToggle }: StudentRowProps) => {
  return (
    <tr className="hover:bg-slate-800/40 transition-colors border-b border-slate-800/60 font-inter text-sm">
      <td className="px-6 py-4">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => onToggle(student.id)}
          className="w-4 h-4 rounded border-slate-700 bg-slate-850 text-blue-500 focus:ring-blue-500/30 accent-blue-500 cursor-pointer"
        />
      </td>
      <td className="px-6 py-4 font-semibold text-slate-200">#{student.id}</td>
      <td className="px-6 py-4">
        <div className="font-medium text-slate-100">{student.name}</div>
        <div className="text-xs text-slate-400 font-normal">{student.email}</div>
      </td>
      <td className="px-6 py-4">
        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          {student.course}
        </span>
      </td>
      <td className="px-6 py-4 text-center font-bold font-outfit text-slate-100">
        {student.score}
      </td>
      <td className="px-6 py-4 text-center">
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
            student.status === 'Pass'
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
          }`}
        >
          {student.status}
        </span>
      </td>
    </tr>
  )
})

StudentRow.displayName = 'StudentRow'

export default function App() {
  // App States
  const [searchTerm, setSearchTerm] = useState('')
  const [courseFilter, setCourseFilter] = useState('all')
  const [isOptimized, setIsOptimized] = useState(true)
  const [isGlobalAuditMarked, setIsGlobalAuditMarked] = useState(false)
  const [checkedStudents, setCheckedStudents] = useState<Record<number, boolean>>({})
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 50

  // Metrics States
  const [calculationCount, setCalculationCount] = useState(0)
  const [lastCalculatedParams, setLastCalculatedParams] = useState({ search: '', course: 'all' })

  // Refs for tracking duration and render counts without triggering state updates during render
  const lastRunRef = useRef({ duration: 0 })

  // 1. Memoized Filtering (Optimized Path)
  const memoizedFilteredStudents = useMemo(() => {
    const t0 = performance.now()
    const result = filterStudentsExpensive(ALL_STUDENTS, searchTerm, courseFilter)
    const t1 = performance.now()
    lastRunRef.current.duration = t1 - t0
    return result
  }, [searchTerm, courseFilter])

  // 2. Unoptimized Filtering (For performance comparison)
  let filteredStudents = memoizedFilteredStudents
  let duration = lastRunRef.current.duration

  if (!isOptimized) {
    const t0 = performance.now()
    filteredStudents = filterStudentsExpensive(ALL_STUDENTS, searchTerm, courseFilter)
    const t1 = performance.now()
    duration = t1 - t0
  }

  // Determine if the current render is a cache hit
  const currentCacheHit = isOptimized && (searchTerm === lastCalculatedParams.search && courseFilter === lastCalculatedParams.course)

  // Safely update calculations count and last calculated parameters in useEffect
  useEffect(() => {
    if (isOptimized) {
      if (searchTerm !== lastCalculatedParams.search || courseFilter !== lastCalculatedParams.course) {
        setLastCalculatedParams({ search: searchTerm, course: courseFilter })
        setCalculationCount((c) => c + 1)
      }
    } else {
      // In unoptimized mode, every state change causes a recalculation
      setCalculationCount((c) => c + 1)
    }
  }, [filteredStudents, isOptimized, isGlobalAuditMarked, checkedStudents, currentPage, searchTerm, courseFilter, lastCalculatedParams.search, lastCalculatedParams.course])

  // Calculate pagination details (simply slice inline, extremely fast)
  const totalPages = Math.max(1, Math.ceil(filteredStudents.length / pageSize))
  const startIndex = (currentPage - 1) * pageSize
  const paginatedStudents = filteredStudents.slice(startIndex, startIndex + pageSize)

  // Event handlers
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCourseFilter(e.target.value)
    setCurrentPage(1)
  }

  // Callback optimization for checking individual student checkbox
  const handleToggleStudent = useCallback((id: number) => {
    setCheckedStudents((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }, [])

  // Independent toggle state triggering render but NOT triggering calculation
  const handleToggleGlobalAudit = () => {
    setIsGlobalAuditMarked((prev) => !prev)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-6 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/60 backdrop-blur-md p-6 rounded-2xl border border-slate-800/80">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              Optimization Sandbox
            </div>
            <h1 className="text-3xl font-extrabold font-outfit bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Student Matrix Performance Engine
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              Benchmarking and analyzing 5,000 student records with reactive render monitoring and memoization bypass techniques.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-slate-400">Optimization (useMemo/useCallback):</span>
            <button
              onClick={() => setIsOptimized((prev) => !prev)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                isOptimized ? 'bg-emerald-500' : 'bg-slate-700'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isOptimized ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Real-time Diagnostics HUD */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
            <span className="text-xs font-semibold text-slate-455 uppercase tracking-wider">Filter State Cache</span>
            <div className="flex items-center gap-2 mt-2">
              <span
                className={`w-3.5 h-3.5 rounded-full ${
                  currentCacheHit ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-rose-500 shadow-[0_0_8px_#f43f5e]'
                }`}
              ></span>
              <span className="text-2xl font-bold font-outfit uppercase">
                {currentCacheHit ? 'Hit (Cached)' : 'Miss (Re-run)'}
              </span>
            </div>
            <span className="text-xs text-slate-400 mt-2">
              {currentCacheHit
                ? 'Filtered array referential cache hit.'
                : 'Recalculating 5,000 students array.'}
            </span>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
            <span className="text-xs font-semibold text-slate-455 uppercase tracking-wider">Calculation Cost</span>
            <div className="mt-2">
              <span className="text-3xl font-bold font-outfit text-blue-400">
                {duration.toFixed(1)}
              </span>
              <span className="text-sm font-semibold text-slate-400 ml-1">ms</span>
            </div>
            <span className="text-xs text-slate-400 mt-2">
              Time elapsed on filtering logic (excluding DOM paint).
            </span>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
            <span className="text-xs font-semibold text-slate-455 uppercase tracking-wider">Total Filter Computations</span>
            <div className="mt-2">
              <span className="text-3xl font-bold font-outfit text-indigo-400">
                {calculationCount}
              </span>
              <span className="text-xs font-semibold text-slate-450 ml-2">runs</span>
            </div>
            <span className="text-xs text-slate-400 mt-2">
              Number of times the intensive loop was triggered.
            </span>
          </div>
        </div>

        {/* Diagnostic Actions & Search Matrix */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <h2 className="text-lg font-bold font-outfit flex items-center gap-2">
            <i className="fa-solid fa-gauge-high text-blue-400"></i>
            Control Center & Parameters
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Search Input */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-slate-450 uppercase">Search Student Name/Email</label>
              <div className="relative">
                <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm"></i>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Type to search 5,000 records..."
                  className="w-full bg-slate-950 border border-slate-850 hover:border-slate-750 focus:border-blue-500 focus:outline-none py-2.5 pl-11 pr-4 rounded-xl text-sm transition-all"
                />
              </div>
            </div>

            {/* Course Filter */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-slate-455 uppercase">Course Stream</label>
              <select
                value={courseFilter}
                onChange={handleCourseChange}
                className="w-full bg-slate-950 border border-slate-850 hover:border-slate-750 focus:border-blue-500 focus:outline-none py-2.5 px-4 rounded-xl text-sm transition-all cursor-pointer text-slate-300"
              >
                <option value="all">All Courses</option>
                <option value="React & TypeScript">React & TypeScript</option>
                <option value="Next.js Advanced">Next.js Advanced</option>
                <option value="Node.js Backend">Node.js Backend</option>
                <option value="System Design Suite">System Design Suite</option>
              </select>
            </div>

            {/* Independent Audit Toggle */}
            <div className="bg-slate-950 border border-slate-850/80 p-4 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-455 uppercase">Database Audit Mark</p>
                <p className="text-sm font-semibold text-slate-100 mt-1">
                  {isGlobalAuditMarked ? '✓ Audited' : '✕ Unchecked'}
                </p>
              </div>
              <button
                onClick={handleToggleGlobalAudit}
                className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  isGlobalAuditMarked
                    ? 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30'
                }`}
              >
                {isGlobalAuditMarked ? 'Clear Status' : 'Mark Audited'}
              </button>
            </div>
          </div>

          {/* Test Sandbox Instructions Alert */}
          <div className="bg-blue-950/20 border border-blue-550/20 rounded-xl p-4 flex gap-3 text-sm text-slate-300">
            <i className="fa-solid fa-circle-info text-blue-400 text-lg mt-0.5"></i>
            <div>
              <p className="font-bold text-blue-300">How to Benchmark the Matrix Bottleneck:</p>
              <ul className="list-disc pl-4 mt-2 space-y-1 text-slate-400 text-xs">
                <li>
                  <strong className="text-slate-300">Test with Optimization OFF:</strong> Click the top-right toggle to disable optimization. Click <span className="text-blue-400 font-semibold">"Mark Audited"</span> or toggle any checkbox on the table. You will feel a distinct lag (~150ms delay) because the entire 5,000-student filtering process is executed on every single state change.
                </li>
                <li>
                  <strong className="text-slate-300">Test with Optimization ON:</strong> Turn optimization back ON. Now, click <span className="text-blue-400 font-semibold">"Mark Audited"</span> or check a row. The interaction is instantaneous (0.0ms delay) and shows a <span className="text-emerald-400 font-semibold">Hit (Cached)</span> because the intensive list calculations are completely bypassed.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Student Records Grid */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="px-6 py-5 border-b border-slate-800/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h3 className="text-lg font-bold font-outfit">
              Student Roster Database{' '}
              <span className="text-xs text-slate-500 ml-1">
                (showing {paginatedStudents.length} of {filteredStudents.length} matches)
              </span>
            </h3>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-950 border border-slate-850 text-slate-400">
              Audit Indicator: {isGlobalAuditMarked ? 'SECURED' : 'PENDING'}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950/60 border-b border-slate-800 text-xs text-slate-450 uppercase tracking-wider font-semibold">
                  <th className="px-6 py-4 w-12">Select</th>
                  <th className="px-6 py-4 w-20">ID</th>
                  <th className="px-6 py-4">Student Details</th>
                  <th className="px-6 py-4">Current Course</th>
                  <th className="px-6 py-4 text-center">Score</th>
                  <th className="px-6 py-4 text-center w-24">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40">
                {paginatedStudents.length > 0 ? (
                  paginatedStudents.map((student) => (
                    <StudentRow
                      key={student.id}
                      student={student}
                      isChecked={!!checkedStudents[student.id]}
                      onToggle={handleToggleStudent}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                      <i className="fa-solid fa-inbox text-3xl mb-3 block"></i>
                      No students match the criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controllers */}
          {totalPages > 1 && (
            <div className="px-6 py-4 bg-slate-950/30 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-450">
                Page {currentPage} of {totalPages}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold hover:bg-slate-850 hover:text-white disabled:opacity-50 disabled:hover:bg-slate-900 disabled:hover:text-slate-400 transition-all cursor-pointer"
                >
                  <i className="fa-solid fa-chevron-left mr-1"></i> Prev
                </button>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold hover:bg-slate-850 hover:text-white disabled:opacity-50 disabled:hover:bg-slate-900 disabled:hover:text-slate-400 transition-all cursor-pointer"
                >
                  Next <i className="fa-solid fa-chevron-right ml-1"></i>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}