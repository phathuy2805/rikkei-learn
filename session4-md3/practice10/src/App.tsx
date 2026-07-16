import { useState, useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

// Define interfaces for form structures
interface StudentGrade {
  name: string
  score: number | ''
}

interface LMSFormValues {
  courseCode: string
  classSize: number | ''
  students: StudentGrade[]
}

// Yup validation schema matching all rules and constraints
const lmsSchema = Yup.object().shape({
  courseCode: Yup.string()
    .trim()
    .required('Mã môn học là bắt buộc')
    .matches(/^[A-Z]{2,4}\d{3,4}$/, 'Mã môn học phải viết hoa (Ví dụ: CSE301, IT101, PHY102)'),
  classSize: Yup.number()
    .typeError('Sĩ số phải là một số nguyên dương')
    .required('Sĩ số là bắt buộc')
    .integer('Sĩ số phải là số nguyên')
    .min(1, 'Sĩ số không hợp lệ (phải lớn hơn 0)')
    .max(30, 'Hệ thống giới hạn tối đa 30 sinh viên nhập cùng lúc để tránh quá tải UI'),
  students: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required(),
      score: Yup.number()
        .typeError('Điểm thi phải là một số hợp lệ từ 0.0 đến 10.0')
        .required('Điểm thi là bắt buộc')
        .min(0.0, 'Điểm số không được nhỏ hơn 0.0')
        .max(10.0, 'Điểm số không được lớn hơn 10.0'),
    })
  ),
})

export default function App() {
  const [submissionResult, setSubmissionResult] = useState<LMSFormValues | null>(null)
  
  // Initialize React Hook Form with Yup resolver
  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<LMSFormValues>({
    mode: 'onChange',
    defaultValues: {
      courseCode: '',
      classSize: '',
      students: [],
    },
    resolver: yupResolver(lmsSchema) as any,
  })

  // Hook into field arrays for dynamic inputs
  const { fields, replace } = useFieldArray({
    control,
    name: 'students',
  })

  // Watch the classSize input to automatically populate student array rows
  const watchedClassSize = watch('classSize')

  useEffect(() => {
    const size = typeof watchedClassSize === 'number' ? watchedClassSize : parseInt(watchedClassSize || '', 10)
    
    // Automatically generate rows only if size is positive and within limit
    if (size > 0 && size <= 30) {
      const generatedStudents: StudentGrade[] = Array.from({ length: size }, (_, i) => ({
        name: `Sinh viên #${i + 1}`,
        score: '',
      }))
      replace(generatedStudents)
    } else {
      replace([])
    }
  }, [watchedClassSize, replace])

  const onSubmit = (data: LMSFormValues) => {
    setSubmissionResult(data)
  }

  const handleResetForm = () => {
    reset()
    setSubmissionResult(null)
  }

  // Calculate statistics from submission
  const getStats = () => {
    if (!submissionResult) return null
    const scores = submissionResult.students.map((s) => Number(s.score))
    const total = scores.reduce((sum, s) => sum + s, 0)
    const avg = total / scores.length
    const max = Math.max(...scores)
    const min = Math.min(...scores)
    const passed = scores.filter((s) => s >= 5.0).length
    const failed = scores.length - passed

    return { avg, max, min, passed, failed }
  }

  const stats = getStats()

  return (
    <div className="min-h-screen bg-slate-955 text-slate-100 py-12 px-6 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/60 backdrop-blur-md p-6 rounded-2xl border border-slate-800/80">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              Mini LMS Grade Management
            </div>
            <h1 className="text-3xl font-extrabold font-outfit bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Kiosk Quản Lý Chấm Điểm
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Lecturer portal for final grade submission. Enter the course code and class size. The system will dynamically generate score inputs while enforcing strict boundary checks.
            </p>
          </div>
        </div>

        {/* Scoring Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          
          {/* Compositor Form */}
          <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <h2 className="text-lg font-bold font-outfit flex items-center gap-2">
              <i className="fa-solid fa-graduation-cap text-blue-400"></i>
              Grade Submission Form
            </h2>

            {submissionResult ? (
              /* Success Stats Report */
              <div className="space-y-6 animate-fade-in">
                <div className="p-5 bg-emerald-955/20 border border-emerald-500/25 rounded-2xl space-y-2">
                  <div className="flex items-center gap-3 text-emerald-450">
                    <i className="fa-solid fa-circle-check text-2xl"></i>
                    <h3 className="font-bold text-base font-outfit">Đã Hoàn Tất Nhập Điểm!</h3>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Báo cáo thống kê sơ bộ của lớp học phần <strong className="text-slate-200">{submissionResult.courseCode}</strong> (Sĩ số: {submissionResult.students.length} sinh viên).
                  </p>
                </div>

                {/* Class Stats HUD */}
                {stats && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 text-center">
                      <p className="text-[10px] text-slate-500 font-bold uppercase">Điểm Trung Bình</p>
                      <p className="text-2xl font-black text-blue-400 mt-1">{stats.avg.toFixed(2)}</p>
                    </div>
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 text-center">
                      <p className="text-[10px] text-slate-500 font-bold uppercase">Cao Nhất / Thấp Nhất</p>
                      <p className="text-lg font-bold text-slate-200 mt-1">{stats.max} / {stats.min}</p>
                    </div>
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 text-center">
                      <p className="text-[10px] text-slate-500 font-bold uppercase">Đạt (Score &ge; 5)</p>
                      <p className="text-2xl font-black text-emerald-400 mt-1">{stats.passed}</p>
                    </div>
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 text-center">
                      <p className="text-[10px] text-slate-500 font-bold uppercase">Trượt (Score &lt; 5)</p>
                      <p className="text-2xl font-black text-rose-455 mt-1">{stats.failed}</p>
                    </div>
                  </div>
                )}

                {/* Reset button */}
                <button
                  onClick={handleResetForm}
                  className="w-full py-2.5 bg-slate-950 hover:bg-slate-900 border border-slate-850 hover:border-slate-750 text-slate-400 hover:text-slate-200 rounded-lg text-xs font-bold transition-all cursor-pointer"
                >
                  Nhập Điểm Lớp Học Phần Mới
                </button>
              </div>
            ) : (
              /* Input Grading Form */
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                
                {/* Course Code & Student size inputs row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Course Code */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-slate-400 uppercase">Mã Môn Học</label>
                    <input
                      type="text"
                      placeholder="Ví dụ: CSE301, IT102"
                      {...register('courseCode')}
                      className={`w-full bg-slate-950 border focus:outline-none py-3 px-4 rounded-xl text-sm transition-all ${
                        errors.courseCode ? 'border-rose-500/50 focus:border-rose-500' : 'border-slate-850 focus:border-blue-500'
                      }`}
                    />
                    {errors.courseCode && (
                      <div className="text-xs text-rose-400 font-semibold flex items-center gap-1.5 mt-0.5">
                        <i className="fa-solid fa-circle-exclamation text-[10px]"></i>
                        <span>{errors.courseCode.message}</span>
                      </div>
                    )}
                  </div>

                  {/* Sĩ số */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-slate-400 uppercase">Sĩ Số Lớp (Số lượng sinh viên)</label>
                    <input
                      type="number"
                      placeholder="Ví dụ: 5, 10..."
                      {...register('classSize')}
                      className={`w-full bg-slate-950 border focus:outline-none py-3 px-4 rounded-xl text-sm transition-all ${
                        errors.classSize ? 'border-rose-500/50 focus:border-rose-500' : 'border-slate-850 focus:border-blue-500'
                      }`}
                    />
                    {errors.classSize && (
                      <div className="text-xs text-rose-400 font-semibold flex items-center gap-1.5 mt-0.5">
                        <i className="fa-solid fa-circle-exclamation text-[10px]"></i>
                        <span>{errors.classSize.message}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Student Score Array List */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <h3 className="text-sm font-bold text-slate-300">Danh Sách Nhập Điểm Chi Tiết</h3>
                    <span className="text-[10px] text-slate-500">Thang điểm 10.0</span>
                  </div>

                  {fields.length > 0 ? (
                    <div className="max-h-96 overflow-y-auto pr-2 space-y-3.5 divide-y divide-slate-800/10">
                      {fields.map((field, index) => {
                        const hasError = errors.students?.[index]?.score
                        return (
                          <div key={field.id} className="flex items-center justify-between gap-4 pt-3 first:pt-0">
                            <span className="text-sm font-semibold text-slate-300 font-inter">
                              {field.name}
                            </span>
                            <div className="flex flex-col items-end gap-1">
                              <div className="relative w-36">
                                <input
                                  type="text"
                                  placeholder="Nhập điểm..."
                                  {...register(`students.${index}.score` as const)}
                                  className={`w-full bg-slate-950 border focus:outline-none py-2 px-3 rounded-xl text-xs text-right transition-all ${
                                    hasError ? 'border-rose-500/50 focus:border-rose-500' : 'border-slate-850 focus:border-blue-500'
                                  }`}
                                />
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-550">
                                  ĐIỂM
                                </span>
                              </div>
                              {hasError && (
                                <span className="text-[10px] text-rose-400 font-medium">
                                  {errors.students?.[index]?.score?.message}
                                </span>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    /* Locked Scoring Grid State */
                    <div className="py-12 bg-slate-950/60 border border-dashed border-slate-800/80 rounded-xl flex flex-col items-center justify-center text-center text-slate-500 space-y-2">
                      <i className="fa-solid fa-lock text-2xl mb-1 text-slate-650"></i>
                      <p className="text-xs font-semibold">LƯỚI NHẬP ĐIỂM ĐANG KHÓA</p>
                      <p className="text-[10px] text-slate-550 max-w-xs">
                        Nhập sĩ số lớp học hợp lệ ở phía trên (&gt; 0) để tự động khởi tạo lưới nhập điểm thành viên.
                      </p>
                    </div>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={!isValid || fields.length === 0}
                  className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-650 hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 disabled:from-slate-800 disabled:to-slate-800 text-white rounded-xl text-sm font-bold shadow-lg hover:shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  Xác Nhận Đăng Ký Điểm
                </button>
              </form>
            )}
          </div>

          {/* Interactive Flow Diagram Panel (Right Side) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider block">Lưu Đồ Nhập Liệu Điểm LMS</span>
              
              <div className="space-y-4 font-inter text-xs">
                {/* Step 1 */}
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-300 shrink-0">1</div>
                  <div>
                    <h4 className="font-bold text-slate-200">Nhập sĩ số (Class Size)</h4>
                    <p className="text-slate-450 mt-1 leading-relaxed">Giảng viên nhập số lượng sinh viên dự thi môn học.</p>
                  </div>
                </div>

                {/* Connector */}
                <div className="w-0.5 h-4 bg-slate-800 ml-3"></div>

                {/* Step 2 */}
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-300 shrink-0">2</div>
                  <div>
                    <h4 className="font-bold text-slate-200">Kiểm tra hợp lệ & Tạo hàng</h4>
                    <p className="text-slate-455 mt-1 leading-relaxed">
                      Nếu Sĩ số $\le$ 0 hoặc trống, lưới nhập điểm bị khóa. Nếu sĩ số hợp lệ (1 - 30), hàm `useEffect` kích hoạt `replace()` để dựng N ô nhập điểm tương ứng.
                    </p>
                  </div>
                </div>

                {/* Connector */}
                <div className="w-0.5 h-4 bg-slate-800 ml-3"></div>

                {/* Step 3 */}
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-slate-955 border border-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-300 shrink-0">3</div>
                  <div>
                    <h4 className="font-bold text-slate-200">Yup Schema Validation</h4>
                    <p className="text-slate-455 mt-1 leading-relaxed">
                      Kiểm duyệt chặt chẽ từng ô nhập điểm. Phải là số thực, nằm trong tầm từ 0.0 đến 10.0 (chặn nhập chữ cái).
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Yup Constraints */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Yup Schema Constraints</span>
              <ul className="text-xs text-slate-400 space-y-2.5">
                <li className="flex items-start gap-2">
                  <i className="fa-solid fa-check text-blue-450 mt-0.5"></i>
                  <span><strong>Mã môn học:</strong> Viết hoa, 2-4 chữ cái kèm 3-4 chữ số (ví dụ: IT102).</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fa-solid fa-check text-blue-450 mt-0.5"></i>
                  <span><strong>Sĩ số:</strong> Số nguyên dương, nằm trong khoảng 1 - 30.</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fa-solid fa-check text-blue-450 mt-0.5"></i>
                  <span><strong>Điểm thành viên:</strong> Bắt buộc, số thực từ 0.0 đến 10.0.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
