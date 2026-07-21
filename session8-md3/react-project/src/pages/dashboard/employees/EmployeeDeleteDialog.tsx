import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AlertTriangle, Loader2, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { employeeApi } from '../../../apis/employee.api'
import { Button } from '../../../components/ui/button'
import { Modal } from '../../../components/ui/modal'
import type { IEmployee } from '../../../interfaces/employee.interface'

interface EmployeeDeleteDialogProps {
    open: boolean
    onClose: () => void
    employee: IEmployee | null
}

export default function EmployeeDeleteDialog({
    open,
    onClose,
    employee,
}: EmployeeDeleteDialogProps) {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: (id: string) => employeeApi.remove(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employees'] })
            toast.success('Đã xóa nhân viên thành công!')
            onClose()
        },
        onError: () => {
            toast.error('Có lỗi xảy ra khi xóa nhân viên, vui lòng thử lại!')
        },
    })

    if (!employee) return null

    const handleDelete = () => {
        mutation.mutate(employee.id)
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            title=""
            className="max-w-md border-slate-800 bg-slate-900/95 backdrop-blur-xl shadow-2xl"
        >
            <div className="flex flex-col items-center text-center pt-2 pb-2">
                <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500 mb-4 shadow-inner">
                    <AlertTriangle className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-bold text-slate-100 tracking-tight">
                    Xác nhận xóa nhân viên
                </h3>

                <p className="text-sm text-slate-400 mt-2 leading-relaxed px-2">
                    Bạn có chắc chắn muốn xóa nhân viên{' '}
                    <span className="font-semibold text-slate-200">
                        "{employee.fullName}"
                    </span>
                    ? Hành động này sẽ xóa dữ liệu khỏi hệ thống và không thể
                    hoàn tác.
                </p>

                <div className="flex items-center justify-end gap-3 w-full pt-6 mt-6 border-t border-slate-800/80">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                        disabled={mutation.isPending}
                        className="flex-1 rounded-lg border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-slate-100 transition-colors"
                    >
                        Hủy
                    </Button>
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={mutation.isPending}
                        className="flex-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-medium shadow-md shadow-rose-500/20 transition-all flex items-center justify-center gap-2"
                    >
                        {mutation.isPending ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin text-white" />
                                <span>Đang xóa...</span>
                            </>
                        ) : (
                            <>
                                <Trash2 className="w-4 h-4" />
                                <span>Xóa nhân viên</span>
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </Modal>
    )
}
