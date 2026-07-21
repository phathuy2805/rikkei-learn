import { z } from 'zod'

export const employeeSchema = z.object({
    fullName: z.string().min(1, 'Họ và tên không được để trống'),
    email: z
        .string()
        .min(1, 'Email không được để trống')
        .email('Email không đúng định dạng'),
    phone: z
        .string()
        .min(1, 'Số điện thoại không được để trống')
        .regex(/^[0-9]{10,11}$/, 'Số điện thoại phải từ 10 - 11 chữ số'),
    department: z.string().min(1, 'Vui lòng nhập phòng ban'),
    position: z.string().min(1, 'Chức vụ không được để trống'),
    status: z.enum(['ACTIVE', 'INACTIVE', 'ON_LEAVE'], {
        errorMap: () => ({ message: 'Trạng thái không hợp lệ' }),
    }),
    startDate: z.string().min(1, 'Vui lòng chọn ngày bắt đầu làm việc'),
})

export type EmployeeFormValues = z.infer<typeof employeeSchema>
