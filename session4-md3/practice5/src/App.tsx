import { useFormik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'

// Type definition for form values
interface CreditCardFormValues {
    fullName: string
    cccd: string
    monthlyIncome: string
}

export default function App() {
    const [submissionResult, setSubmissionResult] =
        useState<CreditCardFormValues | null>(null)

    // Yup validation schema matching all criteria & traps
    const creditCardSchema = Yup.object().shape({
        fullName: Yup.string()
            .trim()
            .required('Họ và tên là bắt buộc')
            .min(2, 'Họ và tên phải có ít nhất 2 ký tự')
            .matches(
                /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂÂÊÔƠƯưăâêôơư\s]+$/,
                'Họ và tên chỉ được chứa chữ cái và khoảng trắng',
            ),
        cccd: Yup.string()
            .required('Số CCCD là bắt buộc')
            .matches(/^\d{12}$/, 'Số CCCD phải chứa chính xác 12 chữ số'),
        monthlyIncome: Yup.number()
            .typeError(
                'Thu nhập hàng tháng phải là một số hợp lệ (không chứa chữ hoặc ký tự đặc biệt)',
            )
            .required('Thu nhập hàng tháng là bắt buộc')
            .min(5000001, 'Thu nhập hàng tháng phải lớn hơn 5.000.000đ'),
    })

    // Initialize Formik
    const formik = useFormik<CreditCardFormValues>({
        initialValues: {
            fullName: '',
            cccd: '',
            monthlyIncome: '',
        },
        validationSchema: creditCardSchema,
        onSubmit: (values) => {
            // Set submission result to display in UI
            setSubmissionResult({
                fullName: values.fullName.trim(),
                cccd: values.cccd.trim(),
                monthlyIncome: values.monthlyIncome.toString().trim(),
            })
        },
    })

    const handleResetForm = () => {
        formik.resetForm()
        setSubmissionResult(null)
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-6 font-sans">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header Block */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/60 backdrop-blur-md p-6 rounded-2xl border border-slate-800/80">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
                            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                            Formik & Yup Integration
                        </div>
                        <h1 className="text-3xl font-extrabold font-outfit bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
                            Credit Card Application Portal
                        </h1>
                        <p className="text-slate-400 text-sm mt-1 max-w-xl">
                            Apply for a credit card securely. All information is
                            validated in real-time on the client-side using
                            Formik state management and Yup schema validation.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
                    {/* Main Form Panel */}
                    <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
                        <h2 className="text-lg font-bold font-outfit flex items-center gap-2">
                            <i className="fa-solid fa-address-card text-blue-400"></i>
                            Application Details
                        </h2>

                        {submissionResult ? (
                            /* Success Submission Card */
                            <div className="p-6 bg-emerald-950/20 border border-emerald-500/25 rounded-2xl space-y-4 animate-fade-in">
                                <div className="flex items-center gap-3 text-emerald-400">
                                    <i className="fa-solid fa-circle-check text-2xl"></i>
                                    <div>
                                        <h3 className="font-bold text-base font-outfit">
                                            Hồ Sơ Đã Gửi Thành Công!
                                        </h3>
                                        <p className="text-xs text-slate-400">
                                            Yêu cầu mở thẻ tín dụng của bạn đang
                                            được duyệt.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-4 p-4 rounded-xl bg-slate-950/80 border border-slate-850 space-y-3 text-xs font-mono">
                                    <div className="flex justify-between border-b border-slate-900 pb-2">
                                        <span className="text-slate-500">
                                            Họ và tên:
                                        </span>
                                        <span className="text-slate-200 font-bold">
                                            {submissionResult.fullName}
                                        </span>
                                    </div>
                                    <div className="flex justify-between border-b border-slate-900 pb-2">
                                        <span className="text-slate-500">
                                            Số CCCD:
                                        </span>
                                        <span className="text-slate-200">
                                            {submissionResult.cccd}
                                        </span>
                                    </div>
                                    <div className="flex justify-between pb-1">
                                        <span className="text-slate-500">
                                            Thu nhập tháng:
                                        </span>
                                        <span className="text-emerald-400 font-bold">
                                            {parseInt(
                                                submissionResult.monthlyIncome,
                                                10,
                                            ).toLocaleString('vi-VN')}{' '}
                                            đ
                                        </span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleResetForm}
                                    className="w-full py-2.5 bg-slate-950 hover:bg-slate-900 border border-slate-850 hover:border-slate-750 text-slate-400 hover:text-slate-200 rounded-lg text-xs font-bold transition-all cursor-pointer"
                                >
                                    Nộp Đơn Khác
                                </button>
                            </div>
                        ) : (
                            /* Input Form */
                            <form
                                onSubmit={formik.handleSubmit}
                                className="space-y-5"
                            >
                                {/* Full Name */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-semibold text-slate-400 uppercase">
                                        Họ và Tên
                                    </label>
                                    <div className="relative">
                                        <i className="fa-solid fa-user absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm"></i>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formik.values.fullName}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            placeholder="Nguyễn Văn A"
                                            className={`w-full bg-slate-950 border focus:outline-none py-3 pl-11 pr-4 rounded-xl text-sm transition-all ${
                                                formik.touched.fullName &&
                                                formik.errors.fullName
                                                    ? 'border-rose-500/50 focus:border-rose-500'
                                                    : 'border-slate-850 hover:border-slate-750 focus:border-blue-500'
                                            }`}
                                        />
                                    </div>
                                    {formik.touched.fullName &&
                                        formik.errors.fullName && (
                                            <div className="text-xs text-rose-400 font-semibold flex items-center gap-1.5 mt-1">
                                                <i className="fa-solid fa-circle-exclamation text-[10px]"></i>
                                                <span>
                                                    {formik.errors.fullName}
                                                </span>
                                            </div>
                                        )}
                                </div>

                                {/* CCCD */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-semibold text-slate-400 uppercase">
                                        Căn cước công dân (CCCD - 12 số)
                                    </label>
                                    <div className="relative">
                                        <i className="fa-solid fa-id-card absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm"></i>
                                        <input
                                            type="text"
                                            name="cccd"
                                            maxLength={12}
                                            value={formik.values.cccd}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            placeholder="012345678901"
                                            className={`w-full bg-slate-950 border focus:outline-none py-3 pl-11 pr-4 rounded-xl text-sm transition-all ${
                                                formik.touched.cccd &&
                                                formik.errors.cccd
                                                    ? 'border-rose-500/50 focus:border-rose-500'
                                                    : 'border-slate-850 hover:border-slate-750 focus:border-blue-500'
                                            }`}
                                        />
                                    </div>
                                    {formik.touched.cccd &&
                                        formik.errors.cccd && (
                                            <div className="text-xs text-rose-400 font-semibold flex items-center gap-1.5 mt-1">
                                                <i className="fa-solid fa-circle-exclamation text-[10px]"></i>
                                                <span>
                                                    {formik.errors.cccd}
                                                </span>
                                            </div>
                                        )}
                                </div>

                                {/* Monthly Income */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-semibold text-slate-400 uppercase">
                                        Thu Nhập Hàng Tháng (đ)
                                    </label>
                                    <div className="relative">
                                        <i className="fa-solid fa-money-bill-wave absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm"></i>
                                        <input
                                            type="text"
                                            name="monthlyIncome"
                                            value={formik.values.monthlyIncome}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            placeholder="Ví dụ: 6000000"
                                            className={`w-full bg-slate-950 border focus:outline-none py-3 pl-11 pr-4 rounded-xl text-sm transition-all ${
                                                formik.touched.monthlyIncome &&
                                                formik.errors.monthlyIncome
                                                    ? 'border-rose-500/50 focus:border-rose-500'
                                                    : 'border-slate-850 hover:border-slate-750 focus:border-blue-500'
                                            }`}
                                        />
                                    </div>
                                    {formik.touched.monthlyIncome &&
                                        formik.errors.monthlyIncome && (
                                            <div className="text-xs text-rose-400 font-semibold flex items-center gap-1.5 mt-1">
                                                <i className="fa-solid fa-circle-exclamation text-[10px]"></i>
                                                <span>
                                                    {
                                                        formik.errors
                                                            .monthlyIncome
                                                    }
                                                </span>
                                            </div>
                                        )}
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={!formik.isValid || !formik.dirty}
                                    className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 disabled:from-slate-800 disabled:to-slate-800 text-white rounded-xl text-sm font-bold shadow-lg hover:shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    Nộp Đơn Đăng Ký
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Side Panel: Live Data Flow Monitor & Docs */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Live State Monitor */}
                        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
                            <div>
                                <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                                    Formik & Yup Live State HUD
                                </span>
                                <div className="mt-4 space-y-3 text-xs font-mono bg-slate-950 p-4 rounded-xl border border-slate-855">
                                    <p className="text-blue-400 font-bold border-b border-slate-850 pb-1">
                                        VALUES
                                    </p>
                                    <div>
                                        <span className="text-slate-550">
                                            fullName:
                                        </span>{' '}
                                        <span className="text-slate-200">
                                            "{formik.values.fullName}"
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-slate-555">
                                            cccd:
                                        </span>{' '}
                                        <span className="text-slate-200">
                                            "{formik.values.cccd}"
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-slate-555">
                                            monthlyIncome:
                                        </span>{' '}
                                        <span className="text-slate-200">
                                            "{formik.values.monthlyIncome}"
                                        </span>
                                    </div>

                                    <p className="text-amber-500 font-bold border-b border-slate-850 pb-1 pt-2">
                                        VALIDATION ERRORS
                                    </p>
                                    <div>
                                        <span className="text-slate-550">
                                            fullName:
                                        </span>{' '}
                                        <span
                                            className={
                                                formik.errors.fullName
                                                    ? 'text-rose-400'
                                                    : 'text-slate-550'
                                            }
                                        >
                                            {formik.errors.fullName
                                                ? `"${formik.errors.fullName}"`
                                                : 'None'}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-slate-550">
                                            cccd:
                                        </span>{' '}
                                        <span
                                            className={
                                                formik.errors.cccd
                                                    ? 'text-rose-400'
                                                    : 'text-slate-550'
                                            }
                                        >
                                            {formik.errors.cccd
                                                ? `"${formik.errors.cccd}"`
                                                : 'None'}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-slate-550">
                                            monthlyIncome:
                                        </span>{' '}
                                        <span
                                            className={
                                                formik.errors.monthlyIncome
                                                    ? 'text-rose-400'
                                                    : 'text-slate-550'
                                            }
                                        >
                                            {formik.errors.monthlyIncome
                                                ? `"${formik.errors.monthlyIncome}"`
                                                : 'None'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Validation Rules */}
                        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                                Yup Schema Constraints
                            </span>
                            <ul className="text-xs text-slate-400 space-y-2">
                                <li className="flex items-start gap-2">
                                    <i className="fa-solid fa-circle-info text-blue-450 mt-0.5"></i>
                                    <span>
                                        Họ và tên: Bắt buộc, không chứa số, tối
                                        thiểu 2 ký tự.
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <i className="fa-solid fa-circle-info text-blue-450 mt-0.5"></i>
                                    <span>
                                        CCCD: Phải chứa chính xác 12 chữ số
                                        (Regex:{' '}
                                        <code className="text-slate-300">
                                            /^\d{12}$/
                                        </code>
                                        ).
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <i className="fa-solid fa-circle-info text-blue-450 mt-0.5"></i>
                                    <span>
                                        Thu nhập: Phải là số thực, lớn hơn
                                        5.000.000đ (đầu vào chữ báo lỗi định
                                        dạng số).
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
