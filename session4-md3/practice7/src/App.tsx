import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

// Form values type definition
interface RecruitmentFormValues {
  fullName: string
  email: string
  status: 'employed' | 'unemployed'
  currentCompany: string
}

export default function App() {
  const [submissionData, setSubmissionData] = useState<RecruitmentFormValues | null>(null)

  // Yup validation schema with conditional logic using .when()
  const recruitmentSchema = Yup.object().shape({
    fullName: Yup.string()
      .trim()
      .required('Họ và tên là bắt buộc')
      .min(2, 'Họ và tên phải có ít nhất 2 ký tự'),
    email: Yup.string()
      .trim()
      .email('Email không đúng định dạng')
      .required('Email là bắt buộc'),
    status: Yup.string()
      .oneOf(['employed', 'unemployed'], 'Trạng thái việc làm không hợp lệ')
      .required('Trạng thái việc làm là bắt buộc'),
    currentCompany: Yup.string()
      .trim()
      .when('status', {
        is: 'employed',
        then: (schema) => schema.required('Tên công ty hiện tại là bắt buộc khi đã có việc làm'),
        otherwise: (schema) => schema.notRequired(),
      }),
  })

  // Initialize Formik
  const formik = useFormik<RecruitmentFormValues>({
    initialValues: {
      fullName: '',
      email: '',
      status: 'unemployed',
      currentCompany: '',
    },
    validationSchema: recruitmentSchema,
    onSubmit: (values) => {
      // Clear company name if status is unemployed on final submit
      const finalValues: RecruitmentFormValues = {
        ...values,
        currentCompany: values.status === 'employed' ? values.currentCompany.trim() : '',
      }
      setSubmissionData(finalValues)
    },
  })

  const handleResetForm = () => {
    formik.resetForm()
    setSubmissionData(null)
  }

  return (
    <div className="min-h-screen bg-slate-955 text-slate-100 py-12 px-6 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/60 backdrop-blur-md p-6 rounded-2xl border border-slate-800/80">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              Dynamic Yup Validation
            </div>
            <h1 className="text-3xl font-extrabold font-outfit bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Talent Acquisition Portal
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              Submit your candidate profile. The validation schema dynamically adjusts requirements using Yup's conditional `.when()` dependency validation.
            </p>
          </div>
        </div>

        {/* Form and Live States */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          
          {/* Main Form Panel */}
          <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <h2 className="text-lg font-bold font-outfit flex items-center gap-2">
              <i className="fa-solid fa-file-invoice text-blue-400"></i>
              Candidate Profile Form
            </h2>

            {submissionData ? (
              /* Success Submission Card */
              <div className="p-6 bg-emerald-955/20 border border-emerald-500/25 rounded-2xl space-y-4 animate-fade-in">
                <div className="flex items-center gap-3 text-emerald-400">
                  <i className="fa-solid fa-circle-check text-2xl"></i>
                  <div>
                    <h3 className="font-bold text-base font-outfit">Hồ Sơ Tuyển Dụng Đã Lưu!</h3>
                    <p className="text-xs text-slate-400">Hệ thống đã ghi nhận trạng thái thông tin ứng viên.</p>
                  </div>
                </div>

                <div className="mt-4 p-4 rounded-xl bg-slate-950/80 border border-slate-850 space-y-3 text-xs font-mono">
                  <div className="flex justify-between border-b border-slate-900 pb-2">
                    <span className="text-slate-500">Ứng viên:</span>
                    <span className="text-slate-200 font-bold">{submissionData.fullName}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-900 pb-2">
                    <span className="text-slate-500">Email:</span>
                    <span className="text-slate-200">{submissionData.email}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-900 pb-2">
                    <span className="text-slate-500">Trạng thái:</span>
                    <span className={`font-bold ${submissionData.status === 'employed' ? 'text-blue-400' : 'text-amber-400'}`}>
                      {submissionData.status === 'employed' ? 'ĐÃ CÓ VIỆC LÀM' : 'ĐANG TÌM VIỆC'}
                    </span>
                  </div>
                  {submissionData.status === 'employed' && (
                    <div className="flex justify-between pb-1">
                      <span className="text-slate-500">Công ty hiện tại:</span>
                      <span className="text-slate-200 font-bold">{submissionData.currentCompany}</span>
                    </div>
                  )}
                </div>

                <button
                  onClick={handleResetForm}
                  className="w-full py-2.5 bg-slate-950 hover:bg-slate-900 border border-slate-850 hover:border-slate-750 text-slate-400 hover:text-slate-200 rounded-lg text-xs font-bold transition-all cursor-pointer"
                >
                  Nhập Lại Hồ Sơ
                </button>
              </div>
            ) : (
              /* Profile Input Form */
              <form onSubmit={formik.handleSubmit} className="space-y-5">
                
                {/* Full Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase">Họ và Tên</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Nguyễn Văn A"
                    className={`w-full bg-slate-950 border focus:outline-none py-3 px-4 rounded-xl text-sm transition-all ${
                      formik.touched.fullName && formik.errors.fullName
                        ? 'border-rose-500/50 focus:border-rose-500'
                        : 'border-slate-850 hover:border-slate-750 focus:border-blue-500'
                    }`}
                  />
                  {formik.touched.fullName && formik.errors.fullName && (
                    <div className="text-xs text-rose-400 font-semibold flex items-center gap-1.5 mt-0.5">
                      <i className="fa-solid fa-circle-exclamation text-[10px]"></i>
                      <span>{formik.errors.fullName}</span>
                    </div>
                  )}
                </div>

                {/* Email Address */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase">Địa chỉ Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="candidate@recruit.com"
                    className={`w-full bg-slate-950 border focus:outline-none py-3 px-4 rounded-xl text-sm transition-all ${
                      formik.touched.email && formik.errors.email
                        ? 'border-rose-500/50 focus:border-rose-500'
                        : 'border-slate-850 hover:border-slate-750 focus:border-blue-500'
                    }`}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="text-xs text-rose-400 font-semibold flex items-center gap-1.5 mt-0.5">
                      <i className="fa-solid fa-circle-exclamation text-[10px]"></i>
                      <span>{formik.errors.email}</span>
                    </div>
                  )}
                </div>

                {/* Employment Status Dropdown */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase">Trạng Thái Việc Làm</label>
                  <select
                    name="status"
                    value={formik.values.status}
                    onChange={(e) => {
                      formik.handleChange(e)
                      // Proactively clear currentCompany error if switching to unemployed
                      if (e.target.value === 'unemployed') {
                        formik.setFieldValue('currentCompany', '')
                      }
                    }}
                    onBlur={formik.handleBlur}
                    className="w-full bg-slate-950 border border-slate-850 focus:outline-none py-3 px-4 rounded-xl text-sm focus:border-blue-500 transition-all"
                  >
                    <option value="unemployed">Đang tìm việc (Looking for work)</option>
                    <option value="employed">Đã có việc làm (Employed)</option>
                  </select>
                </div>

                {/* Conditional Current Company Field */}
                {formik.values.status === 'employed' && (
                  <div className="flex flex-col gap-2 animate-fade-in">
                    <label className="text-xs font-semibold text-slate-400 uppercase">Công Ty Hiện Tại</label>
                    <input
                      type="text"
                      name="currentCompany"
                      value={formik.values.currentCompany}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Nhập tên doanh nghiệp hiện tại..."
                      className={`w-full bg-slate-950 border focus:outline-none py-3 px-4 rounded-xl text-sm transition-all ${
                        formik.touched.currentCompany && formik.errors.currentCompany
                          ? 'border-rose-500/50 focus:border-rose-500'
                          : 'border-slate-850 hover:border-slate-750 focus:border-blue-500'
                      }`}
                    />
                    {formik.touched.currentCompany && formik.errors.currentCompany && (
                      <div className="text-xs text-rose-400 font-semibold flex items-center gap-1.5 mt-0.5">
                        <i className="fa-solid fa-circle-exclamation text-[10px]"></i>
                        <span>{formik.errors.currentCompany}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-650 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl text-sm font-bold shadow-lg hover:shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  Nộp Đơn Tuyển Dụng
                </button>
              </form>
            )}
          </div>

          {/* Side Panel: State Monitor */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider block">Live Schema State Monitor</span>
              <div className="mt-4 space-y-3 text-xs font-mono bg-slate-950 p-4 rounded-xl border border-slate-850">
                <p className="text-blue-400 font-bold border-b border-slate-850 pb-1">VALUES</p>
                <div>
                  <span className="text-slate-500">status:</span>{' '}
                  <span className="text-slate-200">"{formik.values.status}"</span>
                </div>
                <div>
                  <span className="text-slate-500">currentCompany:</span>{' '}
                  <span className="text-slate-200">"{formik.values.currentCompany}"</span>
                </div>

                <p className="text-amber-500 font-bold border-b border-slate-850 pb-1 pt-2">ERRORS (DYNAMIC)</p>
                <div>
                  <span className="text-slate-500">currentCompany:</span>{' '}
                  <span className={formik.errors.currentCompany ? 'text-rose-400 font-bold' : 'text-slate-500'}>
                    {formik.errors.currentCompany ? `"${formik.errors.currentCompany}"` : 'No Error (Ignored)'}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Conditional Mechanics</span>
              <p className="text-xs text-slate-400 leading-relaxed">
                Khi chọn <strong className="text-slate-200">"Đang tìm việc"</strong>, Yup tự động bỏ qua (ignore) các điều kiện xác thực của trường công ty. Việc chuyển đổi dropdown cũng dọn dẹp các giá trị thừa bên trong để tránh sai lệch dữ liệu đầu ra.
              </p>
            </div>
          </div>
        </div>

        {/* Solution Matrix (Comparison Table) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-bold font-outfit">Dynamic Schema Validation - Solution Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-slate-800 text-xs">
              <thead>
                <tr className="bg-slate-950 text-slate-300 border-b border-slate-800 uppercase font-semibold">
                  <th className="px-4 py-3 border-r border-slate-800">Criteria</th>
                  <th className="px-4 py-3 border-r border-slate-800 text-rose-400">Solution 1: Manual validate() Function</th>
                  <th className="px-4 py-3 text-emerald-400">Solution 2: Yup .when() API (Chosen)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40 text-slate-350">
                <tr>
                  <td className="px-4 py-3 font-semibold bg-slate-950/20 border-r border-slate-800 text-slate-200">Readability</td>
                  <td className="px-4 py-3 border-r border-slate-800">
                    <strong className="text-rose-450">Low.</strong> Requires writing complex nesting `if/else` checks manually for each condition. Form logic becomes messy.
                  </td>
                  <td className="px-4 py-3 text-emerald-350">
                    <strong className="text-emerald-400">High.</strong> Declarative syntax where dependencies are cleanly specified. It reads naturally: "when status is X, then apply Y rule".
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold bg-slate-950/20 border-r border-slate-800 text-slate-200">Maintainability</td>
                  <td className="px-4 py-3 border-r border-slate-800">
                    Hard to track and document rules as the form grows to 10+ dependent fields.
                  </td>
                  <td className="px-4 py-3 text-emerald-350">
                    Very easy. Rules are centrally located within the validation schema configuration rather than mixed inside components.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold bg-slate-950/20 border-r border-slate-800 text-slate-200">Typesafety Integration</td>
                  <td className="px-4 py-3 border-r border-slate-800">
                    Requires manual string typing or validation mapping.
                  </td>
                  <td className="px-4 py-3 text-emerald-350">
                    Fully typed inside Yup's validation pipeline, matching key-value pairs cleanly.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}
