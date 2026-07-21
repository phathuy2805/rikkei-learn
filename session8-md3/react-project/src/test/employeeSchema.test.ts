import { describe, expect, it } from 'vitest'
import { employeeSchema } from '../schema/employee.schema'

const validEmployee = {
    fullName: 'Trần Văn An',
    email: 'an@company.com',
    phone: '0901234567',
    department: 'Kỹ thuật',
    position: 'Frontend Developer',
    status: 'ACTIVE' as const,
    startDate: '2025-01-15',
}

describe('employeeSchema', () => {
    it('nên pass với đầy đủ dữ liệu hợp lệ', () => {
        expect(employeeSchema.safeParse(validEmployee).success).toBe(true)
    })

    it('nên pass với status ON_LEAVE', () => {
        expect(
            employeeSchema.safeParse({ ...validEmployee, status: 'ON_LEAVE' })
                .success,
        ).toBe(true)
    })

    it('nên pass với status INACTIVE', () => {
        expect(
            employeeSchema.safeParse({ ...validEmployee, status: 'INACTIVE' })
                .success,
        ).toBe(true)
    })

    it('nên fail khi fullName để trống', () => {
        const result = employeeSchema.safeParse({
            ...validEmployee,
            fullName: '',
        })
        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error.flatten().fieldErrors.fullName).toContain(
                'Họ và tên không được để trống',
            )
        }
    })

    it('nên fail khi email để trống', () => {
        const result = employeeSchema.safeParse({ ...validEmployee, email: '' })
        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error.flatten().fieldErrors.email).toContain(
                'Email không được để trống',
            )
        }
    })

    it('nên fail khi email không đúng định dạng', () => {
        const result = employeeSchema.safeParse({
            ...validEmployee,
            email: 'invalid-email',
        })
        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error.flatten().fieldErrors.email).toContain(
                'Email không đúng định dạng',
            )
        }
    })

    it('nên fail khi phone để trống', () => {
        const result = employeeSchema.safeParse({ ...validEmployee, phone: '' })
        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error.flatten().fieldErrors.phone).toContain(
                'Số điện thoại không được để trống',
            )
        }
    })

    it('nên fail khi phone dưới 10 chữ số', () => {
        const result = employeeSchema.safeParse({
            ...validEmployee,
            phone: '090123456',
        })
        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error.flatten().fieldErrors.phone).toContain(
                'Số điện thoại phải từ 10 - 11 chữ số',
            )
        }
    })

    it('nên fail khi phone trên 11 chữ số', () => {
        const result = employeeSchema.safeParse({
            ...validEmployee,
            phone: '090123456789',
        })
        expect(result.success).toBe(false)
    })

    it('nên fail khi phone chứa chữ cái', () => {
        const result = employeeSchema.safeParse({
            ...validEmployee,
            phone: '090abc4567',
        })
        expect(result.success).toBe(false)
    })

    it('nên pass với phone 11 chữ số hợp lệ', () => {
        const result = employeeSchema.safeParse({
            ...validEmployee,
            phone: '09012345678',
        })
        expect(result.success).toBe(true)
    })

    it('nên fail khi department để trống', () => {
        const result = employeeSchema.safeParse({
            ...validEmployee,
            department: '',
        })
        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error.flatten().fieldErrors.department).toContain(
                'Vui lòng nhập phòng ban',
            )
        }
    })

    it('nên fail khi position để trống', () => {
        const result = employeeSchema.safeParse({
            ...validEmployee,
            position: '',
        })
        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error.flatten().fieldErrors.position).toContain(
                'Chức vụ không được để trống',
            )
        }
    })

    it('nên fail khi status không thuộc enum hợp lệ', () => {
        const result = employeeSchema.safeParse({
            ...validEmployee,
            status: 'UNKNOWN',
        })
        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error.flatten().fieldErrors.status).toContain(
                'Trạng thái không hợp lệ',
            )
        }
    })

    it('nên fail khi startDate để trống', () => {
        const result = employeeSchema.safeParse({
            ...validEmployee,
            startDate: '',
        })
        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error.flatten().fieldErrors.startDate).toContain(
                'Vui lòng chọn ngày bắt đầu làm việc',
            )
        }
    })
})
