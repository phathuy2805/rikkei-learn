import { useFormik } from 'formik'
import { useForm } from 'react-hook-form'

// Global counters to track re-renders
let formikRenderCount = 0
let rhfRenderCount = 0

// Sub-component: Formik (Controlled Component Form)
function FormikForm() {
  formikRenderCount++
  console.log(`Rendered FormikForm: ${formikRenderCount}`)

  const formik = useFormik({
    initialValues: {
      input1: '',
      input2: '',
      input3: '',
      input4: '',
      input5: '',
    },
    onSubmit: (values) => {
      alert(`Formik Submitted: ${JSON.stringify(values)}`)
    },
  })

  return (
    <div className="bg-slate-900 border border-rose-500/20 rounded-2xl p-6 space-y-6 shadow-xl relative">
      <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 rounded-full blur-2xl"></div>

      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
        <div>
          <h3 className="font-bold text-lg font-outfit text-white">Chế bản 1: Formik Form</h3>
          <span className="text-[10px] font-semibold text-rose-400 uppercase">Controlled Architecture</span>
        </div>
        <div className="px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-center">
          <p className="text-[10px] text-slate-400 font-bold uppercase">Renders</p>
          <p className="text-xl font-black text-rose-400">{formikRenderCount}</p>
        </div>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-4 text-sm">
        {[1, 2, 3, 4, 5].map((num) => {
          const fieldName = `input${num}` as const
          return (
            <div key={num} className="flex flex-col gap-1.5">
              <label className="text-xs text-slate-455 font-semibold uppercase">Field {num}</label>
              <input
                type="text"
                name={fieldName}
                value={formik.values[fieldName as 'input1' | 'input2' | 'input3' | 'input4' | 'input5']}
                onChange={formik.handleChange}
                placeholder={`Type here to trigger re-renders...`}
                className="w-full bg-slate-950 border border-slate-850 focus:border-rose-500 focus:outline-none py-2 px-3.5 rounded-xl text-xs transition-all"
              />
            </div>
          )
        })}

        <button
          type="submit"
          className="w-full py-2.5 bg-rose-650 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all shadow-lg hover:shadow-rose-500/10 cursor-pointer"
        >
          Submit Formik
        </button>
      </form>
    </div>
  )
}

// Sub-component: React Hook Form (Uncontrolled Component Form)
function RHFForm() {
  rhfRenderCount++
  console.log(`Rendered RHFForm: ${rhfRenderCount}`)

  const { register, handleSubmit } = useForm({
    defaultValues: {
      input1: '',
      input2: '',
      input3: '',
      input4: '',
      input5: '',
    },
  })

  const onSubmit = (values: Record<string, string>) => {
    alert(`React Hook Form Submitted: ${JSON.stringify(values)}`)
  }

  return (
    <div className="bg-slate-900 border border-emerald-500/20 rounded-2xl p-6 space-y-6 shadow-xl relative">
      <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl"></div>

      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
        <div>
          <h3 className="font-bold text-lg font-outfit text-white">Chế bản 2: RHF Form</h3>
          <span className="text-[10px] font-semibold text-emerald-400 uppercase">Uncontrolled Architecture</span>
        </div>
        <div className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
          <p className="text-[10px] text-slate-400 font-bold uppercase">Renders</p>
          <p className="text-xl font-black text-emerald-400">{rhfRenderCount}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-sm">
        {[1, 2, 3, 4, 5].map((num) => {
          return (
            <div key={num} className="flex flex-col gap-1.5">
              <label className="text-xs text-slate-450 font-semibold uppercase">Field {num}</label>
              <input
                type="text"
                placeholder="Type here safely (0 lag)..."
                {...register(`input${num}` as 'input1' | 'input2' | 'input3' | 'input4' | 'input5')}
                className="w-full bg-slate-950 border border-slate-855 focus:border-emerald-500 focus:outline-none py-2 px-3.5 rounded-xl text-xs transition-all"
              />
            </div>
          )
        })}

        <button
          type="submit"
          className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-lg hover:shadow-emerald-500/10 cursor-pointer"
        >
          Submit RHF
        </button>
      </form>
    </div>
  )
}

// Main Dashboard Component
export default function App() {
  const handleResetCounters = () => {
    formikRenderCount = 0
    rhfRenderCount = 0
    // Force reload window to completely reset JS heap and counters cleanly
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-slate-955 text-slate-100 py-12 px-6 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/60 backdrop-blur-md p-6 rounded-2xl border border-slate-800/80">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              Performance Benchmark Panel
            </div>
            <h1 className="text-3xl font-extrabold font-outfit bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Controlled vs Uncontrolled Forms
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              Type inside both forms. Open your Browser Console to see the live <code className="text-slate-300">console.log</code> updates. Witness the render cycles directly.
            </p>
          </div>
          <button
            onClick={handleResetCounters}
            className="px-4 py-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-slate-100 rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            Reset Console & Counters
          </button>
        </div>

        {/* Form Benchmark Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <FormikForm />
          <RHFForm />
        </div>

        {/* Diagnostic Matrix Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div>
            <h2 className="text-lg font-bold font-outfit text-white">Diagnostic performance matrix</h2>
            <p className="text-xs text-slate-400 mt-1">Based on typing 10 consecutive characters in Field 1 of each form.</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-slate-800 text-xs">
              <thead>
                <tr className="bg-slate-950 text-slate-300 border-b border-slate-800 uppercase font-semibold">
                  <th className="px-4 py-3 border-r border-slate-800">Action / Typing characters</th>
                  <th className="px-4 py-3 border-r border-slate-800 text-rose-400 text-center">Chế bản 1 (Formik - Controlled)</th>
                  <th className="px-4 py-3 text-emerald-400 text-center">Chế bản 2 (RHF - Uncontrolled)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40 text-slate-350 font-mono text-center">
                <tr>
                  <td className="px-4 py-3 text-left font-sans bg-slate-950/20 border-r border-slate-800 text-slate-200">Initial Mount</td>
                  <td className="px-4 py-3 border-r border-slate-800">1 Render</td>
                  <td className="px-4 py-3">1 Render</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-left font-sans bg-slate-950/20 border-r border-slate-800 text-slate-200">Gõ chữ thứ 1</td>
                  <td className="px-4 py-3 border-r border-slate-800 text-rose-400">2 Renders (+1)</td>
                  <td className="px-4 py-3 text-emerald-400">1 Render (0)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-left font-sans bg-slate-950/20 border-r border-slate-800 text-slate-200">Gõ chữ thứ 5</td>
                  <td className="px-4 py-3 border-r border-slate-800 text-rose-400">6 Renders (+5)</td>
                  <td className="px-4 py-3 text-emerald-400">1 Render (0)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-left font-sans bg-slate-950/20 border-r border-slate-800 text-slate-200">Gõ chữ thứ 10</td>
                  <td className="px-4 py-3 border-r border-slate-800 text-rose-455">11 Renders (+10)</td>
                  <td className="px-4 py-3 text-emerald-450">1 Render (0)</td>
                </tr>
                <tr className="bg-slate-950/40 font-bold font-sans">
                  <td className="px-4 py-3 text-left border-r border-slate-800 text-slate-200">Tổng Re-renders sau 10 ký tự</td>
                  <td className="px-4 py-3 border-r border-slate-800 text-rose-400">11 Renders</td>
                  <td className="px-4 py-3 text-emerald-400">1 Render</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-emerald-955/20 border border-emerald-500/20 rounded-xl p-4 flex gap-3 text-xs text-slate-350 leading-relaxed">
            <i className="fa-solid fa-circle-info text-emerald-400 text-base mt-0.5"></i>
            <div>
              <p className="font-bold text-emerald-300">Technical Conclusion for Tech Lead:</p>
              <p className="mt-1 text-slate-400">
                Đối với biểu mẫu gồm 100 trường nhập liệu động của hệ thống ERP, việc chọn **React Hook Form (Uncontrolled)** là quyết định kiến trúc bắt buộc. RHF cô lập các thay đổi tại DOM và chỉ kích hoạt re-render cục bộ hoặc khi submit, giải phóng 100% Main Thread khỏi gánh nặng re-render của React Virtual DOM. Ngược lại, Formik sẽ khiến trình duyệt liên tục chạy lại render toàn bộ cây 100 trường nhập liệu, gây lag nghiêm trọng trên các thiết bị cấu hình trung bình.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
