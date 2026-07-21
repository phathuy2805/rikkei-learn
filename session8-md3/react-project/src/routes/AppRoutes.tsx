import { Navigate, Route, Routes } from 'react-router'
import LoginPage from '../pages/auth/LoginPage'
import DashboardLayout from '../pages/dashboard/DashboardLayout'
import EmployeesPage from '../pages/dashboard/employees/EmployeesPage'
import ProtectedRoute from './ProtectedRoute'

export default function AppRoutes() {
    return (
        <Routes>
            {/* Public route */}
            <Route path="/login" element={<LoginPage />} />
            {/* Protected route */}
            <Route element={<ProtectedRoute />}>
                <Route path="/" element={<DashboardLayout />}>
                    <Route
                        index
                        element={<Navigate to="/employees" replace />}
                    />
                    <Route path="employees" element={<EmployeesPage />} />
                </Route>
            </Route>
        </Routes>
    )
}
