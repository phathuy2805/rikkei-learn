/* eslint-disable react-refresh/only-export-components */
import {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from 'react'

interface User {
    username: string
    role: string
    avatarUrl: string
}

interface AuthContextType {
    user: User | null
    isAuthenticated: boolean
    isLoading: boolean
    login: (username: string) => Promise<boolean>
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(() => {
        try {
            const storedUser = sessionStorage.getItem('classroom_auth_user')
            return storedUser ? JSON.parse(storedUser) : null
        } catch {
            return null
        }
    })
    const [isLoading, setIsLoading] = useState(false)

    const login = async (username: string): Promise<boolean> => {
        setIsLoading(true)
        // Simulate networking delay for visual loading effects
        await new Promise((resolve) => setTimeout(resolve, 800))
        const userData: User = {
            username,
            role: username.toLowerCase() === 'admin' ? 'Instructor' : 'Student',
            avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${username}`,
        }
        setUser(userData)
        sessionStorage.setItem('classroom_auth_user', JSON.stringify(userData))
        setIsLoading(false)
        return true
    }

    const logout = () => {
        setUser(null)
        sessionStorage.removeItem('classroom_auth_user')
    }

    return (
        <AuthContext.Provider
            value={{ user, isAuthenticated: !!user, isLoading, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
