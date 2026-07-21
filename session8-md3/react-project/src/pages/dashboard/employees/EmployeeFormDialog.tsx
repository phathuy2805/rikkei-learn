import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
    AlertCircle,
    Briefcase,
    Building2,
    Calendar,
    ChevronDown,
    Loader2,
    Mail,
    Phone,
    User,
    UserCheck,
    UserPlus,
} from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { employeeApi } from '../../../apis/employee.api'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import { Modal } from '../../../components/ui/modal'
import type { IEmployee } from '../../../interfaces/employee.interface'
import type { EmployeeFormValues } from '../../../schema/employee.schema'
import { employeeSchema } from '../../../schema/employee.schema'

interface EmployeeFormDialogProps {
    open: boolean
    onClose: () => void
    employee?: IEmployee | null
    onSuccess?: (savedEmployee: IEmployee) => void
}

export default function EmployeeFormDialog({
    open,
    onClose,
    employee,
    onSuccess,
}: EmployeeFormDialogProps) {
    const queryClient = useQueryClient()
    const isEdit = Boolean(employee)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<EmployeeFormValues>({
        resolver: zodResolver(employeeSchema),
        defaultValues: {
            fullName: '',
            email: '',
            phone: '',
            department: '',
            position: '',
            status: 'ACTIVE',
            startDate: new Date().toISOString().split('T')[0],
        },
    })

    useEffect(() => {
        if (employee) {
            reset({
                fullName: employee.fullName,
                email: employee.email,
                phone: employee.phone,
                department: employee.department,
                position: employee.position,
                status: employee.status,
                startDate: employee.startDate,
            })
        } else {
            reset({
                fullName: '',
                email: '',
                phone: '',
                department: '',
                position: '',
                status: 'ACTIVE',
                startDate: new Date().toISOString().split('T')[0],
            })
        }
    }, [employee, reset, open])

    const mutation = useMutation({
        mutationFn: (values: EmployeeFormValues) => {
            if (isEdit && employee) {
                return employeeApi.update(employee.id, values)
            }
            return employeeApi.create(values as Omit<IEmployee, 'id'>)
        },
        onSuccess: (savedEmployee: IEmployee) => {
            queryClient.invalidateQueries({ queryKey: ['employees'] })
            toast.success(
                isEdit
                    ? 'Cập nhật nhân viên thành công!'
                    : 'Thêm mới nhân viên thành công!',
            )
            onClose()
            if (onSuccess) {
                onSuccess(savedEmployee)
            }
        },
        onError: () => {
            toast.error('Có lỗi xảy ra, vui lòng thử lại!')
        },
    })

    const onSubmit = (values: EmployeeFormValues) => {
        mutation.mutate(values)
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            title=""
            className="max-w-xl border-slate-800 bg-slate-900/95 backdrop-blur-xl shadow-2xl"
        >
            <div className="-mx-6 -mt-6 mb-6 px-6 py-5 bg-linear-to-r from-slate-900 via-slate-800/80 to-slate-900 border-b border-slate-800/80 flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shadow-inner">
                    {isEdit ? (
                        <UserCheck className="w-5 h-5 text-indigo-400" />
                    ) : (
                        <UserPlus className="w-5 h-5 text-indigo-400" />
                    )}
                </div>
                <div>
                    <h2 className="text-lg font-bold text-slate-100 tracking-tight">
                        {isEdit ? 'Chỉnh sửa nhân viên' : 'Thêm mới nhân viên'}
                    </h2>
                    <p className="text-xs text-slate-400">
                        {isEdit
                            ? 'Cập nhật thông tin chi tiết của nhân viên trong hệ thống'
                            : 'Điền đầy đủ thông tin để tạo hồ sơ nhân viên mới'}
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Thông tin cá nhân */}
                <div className="space-y-4">
                    <div className="text-xs font-semibold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                        Thông tin cá nhân
                    </div>

                    {/* Họ và tên */}
                    <div className="space-y-1.5">
                        <Label
                            htmlFor="fullName"
                            className="text-slate-300 font-medium text-xs"
                        >
                            Họ và tên <span className="text-rose-500">*</span>
                        </Label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                            <Input
                                id="fullName"
                                placeholder="Ví dụ: Nguyễn Văn A"
                                className="pl-9 bg-slate-950/60 border-slate-800 focus:ring-indigo-500/20 text-slate-100 transition-all rounded-lg"
                                {...register('fullName')}
                            />
                        </div>
                        {errors.fullName && (
                            <p className="text-xs text-rose-400 font-medium flex items-center gap-1 pt-0.5">
                                <AlertCircle className="w-3.5 h-3.5" />
                                {errors.fullName.message}
                            </p>
                        )}
                    </div>

                    {/* Email & Số điện thoại */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label
                                htmlFor="email"
                                className="text-slate-300 font-medium text-xs"
                            >
                                Email <span className="text-rose-500">*</span>
                            </Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="an@company.com"
                                    className="pl-9 bg-slate-950/60 border-slate-800 focus:ring-indigo-500/20 text-slate-100 transition-all rounded-lg"
                                    {...register('email')}
                                />
                            </div>
                            {errors.email && (
                                <p className="text-xs text-rose-400 font-medium flex items-center gap-1 pt-0.5">
                                    <AlertCircle className="w-3.5 h-3.5" />
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-1.5">
                            <Label
                                htmlFor="phone"
                                className="text-slate-300 font-medium text-xs"
                            >
                                Số điện thoại{' '}
                                <span className="text-rose-500">*</span>
                            </Label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                <Input
                                    id="phone"
                                    placeholder="0901234567"
                                    className="pl-9 bg-slate-950/60 border-slate-800 focus:ring-indigo-500/20 text-slate-100 transition-all rounded-lg"
                                    {...register('phone')}
                                />
                            </div>
                            {errors.phone && (
                                <p className="text-xs text-rose-400 font-medium flex items-center gap-1 pt-0.5">
                                    <AlertCircle className="w-3.5 h-3.5" />
                                    {errors.phone.message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Thông tin công việc */}
                <div className="space-y-4 pt-2">
                    <div className="text-xs font-semibold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                        Thông tin công việc
                    </div>

                    {/* Phòng ban & Chức vụ */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label
                                htmlFor="department"
                                className="text-slate-300 font-medium text-xs"
                            >
                                Phòng ban{' '}
                                <span className="text-rose-500">*</span>
                            </Label>
                            <div className="relative">
                                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                <Input
                                    id="department"
                                    placeholder="Kỹ thuật"
                                    className="pl-9 bg-slate-950/60 border-slate-800 focus:ring-indigo-500/20 text-slate-100 transition-all rounded-lg"
                                    {...register('department')}
                                />
                            </div>
                            {errors.department && (
                                <p className="text-xs text-rose-400 font-medium flex items-center gap-1 pt-0.5">
                                    <AlertCircle className="w-3.5 h-3.5" />
                                    {errors.department.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-1.5">
                            <Label
                                htmlFor="position"
                                className="text-slate-300 font-medium text-xs"
                            >
                                Chức vụ <span className="text-rose-500">*</span>
                            </Label>
                            <div className="relative">
                                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                <Input
                                    id="position"
                                    placeholder="Frontend Developer"
                                    className="pl-9 bg-slate-950/60 border-slate-800 focus:ring-indigo-500/20 text-slate-100 transition-all rounded-lg"
                                    {...register('position')}
                                />
                            </div>
                            {errors.position && (
                                <p className="text-xs text-rose-400 font-medium flex items-center gap-1 pt-0.5">
                                    <AlertCircle className="w-3.5 h-3.5" />
                                    {errors.position.message}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Trạng thái & Ngày bắt đầu */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label
                                htmlFor="status"
                                className="text-slate-300 font-medium text-xs"
                            >
                                Trạng thái{' '}
                                <span className="text-rose-500">*</span>
                            </Label>
                            <div className="relative">
                                <select
                                    id="status"
                                    {...register('status')}
                                    className="flex h-9 w-full appearance-none rounded-lg border border-slate-800 bg-slate-950/60 px-3 pr-8 text-sm text-slate-100 shadow-sm transition-all focus:outline-none focus:ring-1 focus:ring-indigo-500/20"
                                >
                                    <option
                                        value="ACTIVE"
                                        className="bg-slate-900 text-slate-100"
                                    >
                                        Đang làm việc
                                    </option>
                                    <option
                                        value="ON_LEAVE"
                                        className="bg-slate-900 text-slate-100"
                                    >
                                        Nghỉ phép
                                    </option>
                                    <option
                                        value="INACTIVE"
                                        className="bg-slate-900 text-slate-100"
                                    >
                                        Đã nghỉ việc
                                    </option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                            </div>
                            {errors.status && (
                                <p className="text-xs text-rose-400 font-medium flex items-center gap-1 pt-0.5">
                                    <AlertCircle className="w-3.5 h-3.5" />
                                    {errors.status.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-1.5">
                            <Label
                                htmlFor="startDate"
                                className="text-slate-300 font-medium text-xs"
                            >
                                Ngày bắt đầu{' '}
                                <span className="text-rose-500">*</span>
                            </Label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                <Input
                                    id="startDate"
                                    type="date"
                                    className="pl-9 bg-slate-950/60 border-slate-800 focus:ring-indigo-500/20 text-slate-100 transition-all rounded-lg scheme-dark"
                                    {...register('startDate')}
                                />
                            </div>
                            {errors.startDate && (
                                <p className="text-xs text-rose-400 font-medium flex items-center gap-1 pt-0.5">
                                    <AlertCircle className="w-3.5 h-3.5" />
                                    {errors.startDate.message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer Action Buttons */}
                <div className="flex items-center justify-end gap-3 pt-5 border-t border-slate-800/80">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                        className="rounded-lg border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-slate-100 transition-colors"
                    >
                        Hủy
                    </Button>
                    <Button
                        type="submit"
                        disabled={isSubmitting || mutation.isPending}
                        className="rounded-lg bg-linear-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-medium shadow-md shadow-indigo-500/20 transition-all flex items-center gap-2"
                    >
                        {mutation.isPending ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin text-white" />
                                <span>Đang lưu...</span>
                            </>
                        ) : isEdit ? (
                            'Cập nhật'
                        ) : (
                            'Thêm mới'
                        )}
                    </Button>
                </div>
            </form>
        </Modal>
    )
}
