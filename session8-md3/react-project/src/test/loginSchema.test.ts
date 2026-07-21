import { describe, expect, it } from 'vitest'
import { loginSchema } from '../schema/login.schema'

describe('loginSchema', () => {
    it('nên pass khi email và password hợp lệ', () => {
        const result = loginSchema.safeParse({
            email: 'admin@hrm.com',
            password: 'password123',
        })
        expect(result.success).toBe(true)
    })

    it('nên pass với rememberMe = true', () => {
        const result = loginSchema.safeParse({
            email: 'user@example.com',
            password: '123456',
            rememberMe: true,
        })
        expect(result.success).toBe(true)
    })

    it('rememberMe là optional - không truyền vẫn pass', () => {
        const result = loginSchema.safeParse({
            email: 'user@example.com',
            password: '123456',
        })
        expect(result.success).toBe(true)
    })

    // --- EMAIL VALIDATION ---
    it('nên fail khi email để trống', () => {
        const result = loginSchema.safeParse({ email: '', password: '123456' })
        expect(result.success).toBe(false)
        if (!result.success) {
            const emailErrors = result.error.flatten().fieldErrors.email
            expect(emailErrors).toContain('Email không được để trống')
        }
    })

    it('nên fail khi email không đúng định dạng', () => {
        const result = loginSchema.safeParse({
            email: 'not-an-email',
            password: '123456',
        })
        expect(result.success).toBe(false)
        if (!result.success) {
            const emailErrors = result.error.flatten().fieldErrors.email
            expect(emailErrors).toContain('Email không đúng định dạng')
        }
    })

    it('nên fail khi email thiếu domain', () => {
        const result = loginSchema.safeParse({
            email: 'user@',
            password: '123456',
        })
        expect(result.success).toBe(false)
    })

    // --- PASSWORD VALIDATION ---
    it('nên fail khi password để trống', () => {
        const result = loginSchema.safeParse({
            email: 'admin@hrm.com',
            password: '',
        })
        expect(result.success).toBe(false)
        if (!result.success) {
            const pwErrors = result.error.flatten().fieldErrors.password
            expect(pwErrors).toContain('Mật khẩu phải từ 6 ký tự trở lên')
        }
    })

    it('nên fail khi password dưới 6 ký tự', () => {
        const result = loginSchema.safeParse({
            email: 'admin@hrm.com',
            password: '12345',
        })
        expect(result.success).toBe(false)
        if (!result.success) {
            const pwErrors = result.error.flatten().fieldErrors.password
            expect(pwErrors).toContain('Mật khẩu phải từ 6 ký tự trở lên')
        }
    })

    it('nên pass khi password đúng 6 ký tự', () => {
        const result = loginSchema.safeParse({
            email: 'admin@hrm.com',
            password: '123456',
        })
        expect(result.success).toBe(true)
    })
})
