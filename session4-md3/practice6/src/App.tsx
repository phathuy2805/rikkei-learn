import { useState } from 'react'
import { useForm } from 'react-hook-form'

// Type definition for blog fields
interface BlogPostFormValues {
  title: string
  description: string
  content: string
  author: string
  category: string
}

let renderCount = 0

export default function App() {
  const [submittedData, setSubmittedData] = useState<BlogPostFormValues | null>(null)
  
  renderCount++

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<BlogPostFormValues>({
    mode: 'onChange', // Validate dynamically on input change
    defaultValues: {
      title: '',
      description: '',
      content: '',
      author: '',
      category: 'Technology',
    },
  })

  const onSubmit = (data: BlogPostFormValues) => {
    setSubmittedData(data)
  }

  const handleResetForm = () => {
    reset()
    setSubmittedData(null)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-6 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/60 backdrop-blur-md p-6 rounded-2xl border border-slate-800/80">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              React Hook Form Suite
            </div>
            <h1 className="text-3xl font-extrabold font-outfit bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Blog Post Editorial Console
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              Create and edit long form blog articles smoothly. Utilizing an uncontrolled architecture via ref-based inputs to completely eliminate state-driven lag during drafting.
            </p>
          </div>
        </div>

        {/* Real-time Diagnostics HUD */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Re-render Monitor */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Performance Monitor</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold font-outfit text-white">
                {renderCount}
              </span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Re-renders
              </span>
            </div>
            <span className="text-xs text-slate-400 mt-2">
              Notice how this count does <strong className="text-emerald-400">NOT</strong> increase as you type in the editor!
            </span>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Form Control Mode</span>
            <div className="mt-2 flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>
              <span className="text-xl font-bold font-outfit text-slate-200">
                UNCONTROLLED
              </span>
            </div>
            <span className="text-xs text-slate-400 mt-2">
              Bypasses standard React state. Hooks DOM nodes directly to references.
            </span>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
            <span className="text-xs font-semibold text-violet-400 uppercase tracking-wider">Form Validation State</span>
            <div className="mt-2 flex items-center gap-2">
              <span
                className={`w-3.5 h-3.5 rounded-full ${
                  isValid ? 'bg-emerald-500' : isDirty ? 'bg-rose-500' : 'bg-slate-700'
                }`}
              ></span>
              <span className="text-xl font-bold font-outfit text-slate-200">
                {isValid ? 'READY' : isDirty ? 'INVALID' : 'EMPTY'}
              </span>
            </div>
            <span className="text-xs text-slate-400 mt-2">
              Evaluated efficiently by RHF.
            </span>
          </div>
        </div>

        {/* Editor and Preview Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          
          {/* Uncontrolled Editor Form (Left Side) */}
          <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <h2 className="text-lg font-bold font-outfit flex items-center gap-2">
              <i className="fa-solid fa-pen-nib text-blue-400"></i>
              Article Composer
            </h2>

            {submittedData ? (
              /* Success Submission Card */
              <div className="p-6 bg-emerald-950/20 border border-emerald-500/25 rounded-2xl space-y-4 animate-fade-in">
                <div className="flex items-center gap-3 text-emerald-400">
                  <i className="fa-solid fa-circle-check text-2xl"></i>
                  <div>
                    <h3 className="font-bold text-base font-outfit">Bài Viết Đã Đăng Thành Công!</h3>
                    <p className="text-xs text-slate-400">Dữ liệu thô bên dưới đã được lưu trữ.</p>
                  </div>
                </div>

                <div className="mt-4 p-4 rounded-xl bg-slate-950/80 border border-slate-850 space-y-3 text-xs leading-relaxed">
                  <div className="flex justify-between border-b border-slate-900 pb-2">
                    <span className="text-slate-500">Tiêu đề:</span>
                    <span className="text-slate-200 font-bold max-w-[200px] truncate">{submittedData.title}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-900 pb-2">
                    <span className="text-slate-500">Thể loại / Tác giả:</span>
                    <span className="text-slate-305">{submittedData.category} • {submittedData.author}</span>
                  </div>
                  <div className="pt-1">
                    <span className="text-slate-500 block mb-1">Nội dung bài viết ({submittedData.content.length} ký tự):</span>
                    <p className="text-slate-300 font-serif line-clamp-3 bg-slate-900 p-3 rounded-lg border border-slate-850">
                      {submittedData.content}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleResetForm}
                  className="w-full py-2.5 bg-slate-950 hover:bg-slate-900 border border-slate-850 hover:border-slate-750 text-slate-400 hover:text-slate-200 rounded-lg text-xs font-bold transition-all cursor-pointer"
                >
                  Viết Bài Mới
                </button>
              </div>
            ) : (
              /* Input Form */
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                
                {/* Title */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase">Tiêu Đề Bài Viết</label>
                  <input
                    type="text"
                    placeholder="Nhập tiêu đề (ít nhất 10 ký tự)..."
                    {...register('title', {
                      required: 'Tiêu đề là bắt buộc',
                      minLength: { value: 10, message: 'Tiêu đề phải chứa tối thiểu 10 ký tự' },
                    })}
                    className={`w-full bg-slate-950 border focus:outline-none py-3 px-4 rounded-xl text-sm transition-all ${
                      errors.title ? 'border-rose-500/50 focus:border-rose-500' : 'border-slate-850 focus:border-blue-500'
                    }`}
                  />
                  {errors.title && (
                    <div className="text-xs text-rose-400 font-semibold flex items-center gap-1.5 mt-0.5">
                      <i className="fa-solid fa-circle-exclamation text-[10px]"></i>
                      <span>{errors.title.message}</span>
                    </div>
                  )}
                </div>

                {/* Category & Author row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-slate-400 uppercase">Thể Loại</label>
                    <select
                      {...register('category')}
                      className="w-full bg-slate-950 border border-slate-855 focus:outline-none py-3 px-4 rounded-xl text-sm focus:border-blue-500 transition-all"
                    >
                      <option value="Technology">Technology</option>
                      <option value="Design">Design</option>
                      <option value="Programming">Programming</option>
                      <option value="Marketing">Marketing</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-slate-400 uppercase">Tác Giả</label>
                    <input
                      type="text"
                      placeholder="Tên tác giả..."
                      {...register('author', { required: 'Tác giả là bắt buộc' })}
                      className={`w-full bg-slate-950 border focus:outline-none py-3 px-4 rounded-xl text-sm transition-all ${
                        errors.author ? 'border-rose-500/50 focus:border-rose-500' : 'border-slate-850 focus:border-blue-500'
                      }`}
                    />
                    {errors.author && (
                      <div className="text-xs text-rose-400 font-semibold flex items-center gap-1.5 mt-0.5">
                        <i className="fa-solid fa-circle-exclamation text-[10px]"></i>
                        <span>{errors.author.message}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Short Description */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase">Mô Tả Ngắn</label>
                  <input
                    type="text"
                    placeholder="Mô tả tóm tắt nội dung bài viết (ít nhất 20 ký tự)..."
                    {...register('description', {
                      required: 'Mô tả ngắn là bắt buộc',
                      minLength: { value: 20, message: 'Mô tả phải chứa tối thiểu 20 ký tự' },
                    })}
                    className={`w-full bg-slate-950 border focus:outline-none py-3 px-4 rounded-xl text-sm transition-all ${
                      errors.description ? 'border-rose-500/50 focus:border-rose-500' : 'border-slate-850 focus:border-blue-500'
                    }`}
                  />
                  {errors.description && (
                    <div className="text-xs text-rose-400 font-semibold flex items-center gap-1.5 mt-0.5">
                      <i className="fa-solid fa-circle-exclamation text-[10px]"></i>
                      <span>{errors.description.message}</span>
                    </div>
                  )}
                </div>

                {/* Content Area */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold text-slate-400 uppercase">Nội Dung Bài Viết</label>
                    <span className="text-[10px] text-slate-500">Min 50 characters</span>
                  </div>
                  <textarea
                    rows={8}
                    placeholder="Hãy viết gì đó thú vị... (Tối thiểu 50 ký tự để được phê duyệt xuất bản)"
                    {...register('content', {
                      required: 'Nội dung bài viết là bắt buộc',
                      minLength: { value: 50, message: 'Nội dung bài viết quá ngắn. Cần chứa tối thiểu 50 ký tự.' },
                    })}
                    className={`w-full bg-slate-955 border focus:outline-none py-3 px-4 rounded-xl text-sm font-serif transition-all leading-relaxed ${
                      errors.content ? 'border-rose-500/50 focus:border-rose-500' : 'border-slate-850 focus:border-blue-500'
                    }`}
                  />
                  {errors.content && (
                    <div className="text-xs text-rose-400 font-semibold flex items-center gap-1.5 mt-0.5">
                      <i className="fa-solid fa-circle-exclamation text-[10px]"></i>
                      <span>{errors.content.message}</span>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-650 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl text-sm font-bold shadow-lg hover:shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  Đăng Tải Bài Viết
                </button>
              </form>
            )}
          </div>

          {/* Guide and Concepts (Right Side) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block">Understanding Uncontrolled Components</span>
              <div className="text-xs text-slate-400 space-y-3 leading-relaxed">
                <p>
                  Trong React truyền thống (Controlled Components), mỗi phím gõ của người dùng đều kích hoạt hàm cập nhật trạng thái (`useState`), làm kích hoạt toàn bộ component render lại từ đầu.
                </p>
                <p className="border-l-2 border-amber-500/40 pl-3 text-slate-350">
                  Đối với các ô soạn thảo bài viết lớn (textarea), việc render liên tục hàng trăm lần khi đang viết lách sẽ chiếm dụng lượng lớn tài nguyên Main Thread $\rightarrow$ gây ra hiện tượng lag chữ cực kỳ ức chế.
                </p>
                <p>
                  <strong className="text-white">Giải pháp React Hook Form:</strong> RHF loại bỏ hoàn toàn `value` và `onChange` liên tục của React. Thư viện sử dụng cơ chế **Uncontrolled Component** bằng cách lưu trữ giá trị trực tiếp tại DOM thông qua `ref`.
                </p>
                <p>
                  Nó chỉ đọc giá trị và kích hoạt render lại khi cần thiết (ví dụ khi hiển thị/xóa cảnh báo lỗi validation). Do đó giúp trải nghiệm gõ bài viết mượt mà tuyệt đối 60 FPS!
                </p>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Native Validation Rules</span>
              <ul className="text-xs text-slate-400 space-y-2.5">
                <li className="flex items-start gap-2">
                  <i className="fa-solid fa-check text-blue-450 mt-0.5"></i>
                  <span><strong>Tiêu đề:</strong> Bắt buộc, tối thiểu 10 ký tự.</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fa-solid fa-check text-blue-450 mt-0.5"></i>
                  <span><strong>Mô tả ngắn:</strong> Bắt buộc, tối thiểu 20 ký tự.</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fa-solid fa-check text-blue-450 mt-0.5"></i>
                  <span><strong>Nội dung:</strong> Bắt buộc, tối thiểu 50 ký tự.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
