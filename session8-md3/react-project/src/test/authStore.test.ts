import { beforeEach, describe, expect, it } from 'vitest'
import { useAuthStore } from '../stores/authStore'

beforeEach(() => {
    useAuthStore.setState({ token: null })
})

describe('authStore', () => {
    it('state khởi tạo: token phải là null', () => {
        const { token } = useAuthStore.getState()
        expect(token).toBeNull()
    })

    it('setToken: lưu token vào store', () => {
        const fakeToken = 'eyJhbGciOiJIUzI1NiJ9.test.signature'
        useAuthStore.getState().setToken(fakeToken)

        const { token } = useAuthStore.getState()
        expect(token).toBe(fakeToken)
    })

    it('setToken: gọi nhiều lần thì token là giá trị mới nhất', () => {
        useAuthStore.getState().setToken('token-v1')
        useAuthStore.getState().setToken('token-v2')

        expect(useAuthStore.getState().token).toBe('token-v2')
    })

    it('clearToken: xóa token khỏi store (về null)', () => {
        useAuthStore.getState().setToken('some-token')
        useAuthStore.getState().clearToken()

        expect(useAuthStore.getState().token).toBeNull()
    })

    it('clearToken: gọi khi token đã null thì không lỗi', () => {
        expect(() => useAuthStore.getState().clearToken()).not.toThrow()
        expect(useAuthStore.getState().token).toBeNull()
    })

    it('setToken sau khi clearToken: lưu được token mới', () => {
        useAuthStore.getState().setToken('first-token')
        useAuthStore.getState().clearToken()
        useAuthStore.getState().setToken('new-token')

        expect(useAuthStore.getState().token).toBe('new-token')
    })
})
