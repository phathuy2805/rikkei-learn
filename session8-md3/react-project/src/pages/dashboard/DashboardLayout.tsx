import { useQuery } from '@tanstack/react-query'
import { Building2, LogOut, Menu, Users, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router'
import { toast } from 'sonner'
import { userApi } from '../../apis/user.api'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import { useAuthStore } from '../../stores/authStore'
import { parseFakeJwt } from '../../utils/jwt.util'

export default function DashboardLayout() {
    const navigate = useNavigate()
    const { token, clearToken } = useAuthStore()

    const [userId, setUserId] = useState<string | null>(null)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        if (token) {
            parseFakeJwt<{ userId: string }>(token)
                .then((payload) => setUserId(payload.userId))
                .catch(() => {
                    clearToken()
                    navigate('/login')
                })
        }
    }, [token, clearToken, navigate])

    const { data: user } = useQuery({
        queryKey: ['me', userId],
        queryFn: () => userApi.getById(userId!),
        enabled: !!userId,
    })

    const handleLogout = () => {
        clearToken()
        toast.success('Đã đăng xuất thành công!')
        navigate('/login')
    }

    const navItems = [
        {
            title: 'Nhân viên',
            path: '/employees',
            icon: Users,
        },
    ]

    return (
        <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
            <header className="sticky top-0 z-30 h-16 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between px-4 sm:px-6 backdrop-blur-md">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-indigo-400 font-bold text-lg">
                        <Building2 className="w-6 h-6" />
                        <span className="font-semibold text-slate-100">
                            HRM System
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {user?.fullName && (
                        <span className="text-sm font-medium hidden sm:block text-slate-200">
                            {user.fullName}
                        </span>
                    )}
                    {user?.role && (
                        <Badge
                            variant={
                                user.role === 'ADMIN' ? 'default' : 'secondary'
                            }
                        >
                            {user.role === 'ADMIN' ? 'Admin' : 'Nhân viên'}
                        </Badge>
                    )}

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleLogout}
                        className="text-slate-400 hover:text-rose-400 hover:bg-rose-500/10"
                    >
                        <LogOut className="w-4 h-4 sm:mr-2" />
                        <span className="hidden sm:inline-block">
                            Đăng xuất
                        </span>
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="sm:hidden"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? (
                            <X className="w-5 h-5" />
                        ) : (
                            <Menu className="w-5 h-5" />
                        )}
                    </Button>
                </div>
            </header>

            {isMobileMenuOpen && (
                <div className="sm:hidden bg-slate-900 border-b border-slate-800 p-4 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:bg-slate-800"
                        >
                            <item.icon className="w-5 h-5 text-indigo-400" />
                            {item.title}
                        </Link>
                    ))}
                </div>
            )}

            <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-950">
                <Outlet />
            </main>
        </div>
    )
}
