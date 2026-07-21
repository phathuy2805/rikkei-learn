import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import ProtectedRoute from '../routes/ProtectedRoute'
import { useAuthStore } from '../stores/authStore'

vi.mock('../stores/authStore')

const mockUseAuthStore = vi.mocked(useAuthStore)

const ProtectedPage = () => <div>Protected Content</div>
const LoginPage = () => <div>Login Page</div>

function renderProtectedRoute(initialPath: string = '/') {
    return render(
        <MemoryRouter initialEntries={[initialPath]}>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<ProtectedPage />} />
                </Route>
            </Routes>
        </MemoryRouter>,
    )
}

describe('ProtectedRoute', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('khi CHƯA có token → redirect về /login', () => {
        mockUseAuthStore.mockImplementation((selector: any) =>
            selector({ token: null, setToken: vi.fn(), clearToken: vi.fn() }),
        )

        renderProtectedRoute('/')

        expect(screen.getByText('Login Page')).toBeInTheDocument()
        expect(screen.queryByText('Protected Content')).not.toBeInTheDocument()
    })

    it('khi ĐÃ có token → render nội dung protected', () => {
        mockUseAuthStore.mockImplementation((selector: any) =>
            selector({
                token: 'valid.jwt.token',
                setToken: vi.fn(),
                clearToken: vi.fn(),
            }),
        )

        renderProtectedRoute('/')

        expect(screen.getByText('Protected Content')).toBeInTheDocument()
        expect(screen.queryByText('Login Page')).not.toBeInTheDocument()
    })
})
