import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { compareSync } from 'bcryptjs'
import { ArrowRight, Building2, Eye, EyeOff, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import { userApi } from '../../apis/user.api'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { loginSchema, type LoginFormValues } from '../../schema/login.schema'
import { useAuthStore } from '../../stores/authStore'
import { createFakeJwt } from '../../utils/jwt.util'

export default function LoginPage() {
    const navigate = useNavigate()
    const setToken = useAuthStore((state) => state.setToken)
    const [showPassword, setShowPassword] = useState(false)

    const savedEmail = localStorage.getItem('remembered_email') || ''

    //form
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: savedEmail,
            rememberMe: Boolean(savedEmail),
        },
    })

    const onSubmit = async (values: LoginFormValues) => {
        try {
            const users = await userApi.getByEmail(values.email)
            const user = users[0]

            if (!user) {
                toast.error('Email hoặc mật khẩu không chính xác!')
                return
            }

            const isPasswordValid = compareSync(values.password, user.password)
            if (!isPasswordValid) {
                toast.error('Email hoặc mật khẩu không chính xác!')
                return
            }

            if (values.rememberMe) {
                localStorage.setItem('remembered_email', values.email)
            } else {
                localStorage.removeItem('remembered_email')
            }

            const token = await createFakeJwt({ userId: user.id })
            toast.success(`Đăng nhập thành công! Chào mừng ${user.fullName}`)
            setToken(token)
            navigate('/employees')
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.code === 'ERR_NETWORK' || !error.response) {
                    toast.error(
                        'Không thể kết nối Server! Vui lòng kiểm tra mạng.',
                    )
                    return
                }
            }
            toast.error('Có lỗi xảy ra khi kết nối server, vui lòng thử lại!')
        }
    }

    return (
        <div className="min-h-screen w-full flex flex-col md:flex-row bg-background">
            <div className="hidden md:flex flex-1 flex-col justify-between bg-primary p-10 text-primary-foreground relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-primary to-primary/80 z-0" />
                <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute right-10 top-10 w-64 h-64 bg-black/10 rounded-full blur-3xl" />

                <div className="relative z-10 flex items-center gap-2">
                    <div className="bg-white/20 p-2 rounded-lg">
                        <Building2 className="w-8 h-8 text-white" />
                    </div>
                    <span className="text-2xl font-bold tracking-tight">
                        HRM System
                    </span>
                </div>

                <div className="relative z-10 max-w-md">
                    <h1 className="text-4xl font-bold mb-6 leading-tight">
                        Quản lý nhân sự hiệu quả và chuyên nghiệp
                    </h1>
                    <p className="text-primary-foreground/80 text-lg">
                        Hệ thống cung cấp giải pháp toàn diện giúp doanh nghiệp
                        tối ưu hóa quy trình quản lý nhân viên, phòng ban và
                        đánh giá hiệu suất.
                    </p>
                </div>

                <div className="relative z-10 text-sm text-primary-foreground/60">
                    &copy; {new Date().getFullYear()} HRM System. All rights
                    reserved.
                </div>
            </div>

            <div className="flex-1 flex items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground">
                            Đăng nhập
                        </h2>
                        <p className="text-muted-foreground mt-2">
                            Chào mừng bạn quay lại. Vui lòng đăng nhập để tiếp
                            tục.
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    {...register('email')}
                                    className={
                                        errors.email
                                            ? 'border-destructive focus-visible:ring-destructive'
                                            : ''
                                    }
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-500 font-medium">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">Mật khẩu</Label>
                                </div>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        placeholder="••••••••"
                                        {...register('password')}
                                        className={
                                            errors.password
                                                ? 'pr-10 border-destructive focus-visible:ring-destructive'
                                                : 'pr-10'
                                        }
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                                        tabIndex={-1}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-4 h-4" />
                                        ) : (
                                            <Eye className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-sm text-red-500 font-medium">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center justify-between pt-1">
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="rememberMe"
                                        {...register('rememberMe')}
                                        className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                                    />
                                    <Label
                                        htmlFor="rememberMe"
                                        className="text-sm font-medium text-slate-300 cursor-pointer select-none"
                                    >
                                        Ghi nhớ đăng nhập
                                    </Label>
                                </div>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            size="lg"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Đang đăng nhập...
                                </>
                            ) : (
                                <>
                                    Đăng nhập
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </>
                            )}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}
