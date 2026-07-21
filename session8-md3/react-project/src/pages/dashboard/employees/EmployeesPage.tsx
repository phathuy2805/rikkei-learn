import { useQuery } from '@tanstack/react-query'
import {
    Building,
    ChevronLeft,
    ChevronRight,
    Pencil,
    Plus,
    Search,
    Trash2,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { employeeApi } from '../../../apis/employee.api'
import { Badge } from '../../../components/ui/badge'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Skeleton } from '../../../components/ui/skeleton'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../../../components/ui/table'
import type { IEmployee } from '../../../interfaces/employee.interface'
import {
    getStatusBadgeProps,
    removeVietnameseTones,
} from '../../../utils/helper.utils'
import EmployeeDeleteDialog from './EmployeeDeleteDialog'
import EmployeeFormDialog from './EmployeeFormDialog'

export default function EmployeesPage() {
    const {
        data: employees = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['employees'],
        queryFn: employeeApi.getAll,
    })

    const [searchTerm, setSearchTerm] = useState('')
    const [activeTab, setActiveTab] = useState('ALL')
    const [currentPage, setCurrentPage] = useState(1)
    const [highlightedId, setHighlightedId] = useState<string | null>(null)

    const [isFormOpen, setIsFormOpen] = useState(false)
    const [selectedEmployee, setSelectedEmployee] = useState<IEmployee | null>(
        null,
    )
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [employeeToDelete, setEmployeeToDelete] = useState<IEmployee | null>(
        null,
    )
    const itemsPerPage = 5

    const tabs = [
        { id: 'ALL', label: 'Tất cả nhân viên', count: employees.length },
        {
            id: 'ACTIVE',
            label: 'Đang làm việc',
            count: employees.filter((e) => e.status === 'ACTIVE').length,
        },
        {
            id: 'ON_LEAVE',
            label: 'Nghỉ phép',
            count: employees.filter((e) => e.status === 'ON_LEAVE').length,
        },
        {
            id: 'INACTIVE',
            label: 'Đã nghỉ việc',
            count: employees.filter((e) => e.status === 'INACTIVE').length,
        },
    ]

    const filteredEmployees = employees.filter((emp) => {
        if (activeTab !== 'ALL' && emp.status !== activeTab) {
            return false
        }
        if (!searchTerm.trim()) return true
        const normalizedFullName = removeVietnameseTones(emp.fullName)
        const normalizedSearchTerm = removeVietnameseTones(searchTerm)
        return normalizedFullName.includes(normalizedSearchTerm)
    })

    const totalItems = filteredEmployees?.length || 0
    const totalPages = Math.ceil(totalItems / itemsPerPage) || 1
    const paginatedEmployees = filteredEmployees?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
    )

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages)
        }
    }, [currentPage, totalPages])

    useEffect(() => {
        if (!highlightedId || !employees.length) return

        const index = filteredEmployees.findIndex(
            (emp) => emp.id === highlightedId,
        )
        if (index !== -1) {
            const targetPage = Math.floor(index / itemsPerPage) + 1
            setCurrentPage(targetPage)

            setTimeout(() => {
                const rowElement = document.getElementById(
                    `employee-row-${highlightedId}`,
                )
                if (rowElement) {
                    rowElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                    })
                }
            }, 150)
        }

        const timer = setTimeout(() => {
            setHighlightedId(null)
        }, 3000)

        return () => clearTimeout(timer)
    }, [highlightedId, employees, filteredEmployees, itemsPerPage])

    const handleFormSuccess = (savedEmployee: IEmployee) => {
        if (activeTab !== 'ALL' && savedEmployee.status !== activeTab) {
            setActiveTab('ALL')
        }
        if (searchTerm.trim()) {
            const normalizedFullName = removeVietnameseTones(
                savedEmployee.fullName,
            )
            const normalizedSearchTerm = removeVietnameseTones(searchTerm)
            if (!normalizedFullName.includes(normalizedSearchTerm)) {
                setSearchTerm('')
            }
        }
        setHighlightedId(savedEmployee.id)
    }

    const handleAdd = () => {
        setSelectedEmployee(null)
        setIsFormOpen(true)
    }
    const handleEdit = (emp: IEmployee) => {
        setSelectedEmployee(emp)
        setIsFormOpen(true)
    }
    const handleDelete = (emp: IEmployee) => {
        setEmployeeToDelete(emp)
        setIsDeleteOpen(true)
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-100">
                        Quản lý Nhân viên
                    </h2>
                    <p className="text-slate-400 mt-1 text-sm">
                        Danh sách nhân sự và thông tin liên hệ của công ty.
                    </p>
                </div>
                <Button
                    onClick={handleAdd}
                    className="w-full sm:w-auto shadow-sm"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Thêm nhân viên
                </Button>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-sm overflow-hidden">
                <div className="border-b border-slate-800 flex items-center gap-1 sm:gap-2 px-4 pt-3 overflow-x-auto bg-slate-900/60">
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab.id
                        return (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() => {
                                    setActiveTab(tab.id)
                                    setCurrentPage(1)
                                }}
                                className={`flex items-center gap-2 px-3.5 py-2.5 text-sm font-medium border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                                    isActive
                                        ? 'text-indigo-400 border-indigo-500 bg-indigo-500/10 rounded-t-lg font-semibold'
                                        : 'text-slate-400 border-transparent hover:text-slate-200 hover:border-slate-700'
                                }`}
                            >
                                <span>{tab.label}</span>
                                <span
                                    className={`text-xs px-2 py-0.5 rounded-full font-semibold transition-colors ${
                                        isActive
                                            ? 'bg-indigo-500/20 text-indigo-300'
                                            : 'bg-slate-800 text-slate-400'
                                    }`}
                                >
                                    {tab.count}
                                </span>
                            </button>
                        )
                    })}
                </div>

                <div className="p-4 border-b border-slate-800 flex items-center gap-2">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                        <Input
                            placeholder="Tìm kiếm theo tên nhân viên (có dấu hoặc không dấu)..."
                            className="pl-9 bg-slate-950 border-slate-800 placeholder:text-slate-500"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value)
                                setCurrentPage(1)
                            }}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nhân viên</TableHead>
                                <TableHead>Phòng ban</TableHead>
                                <TableHead>Chức vụ</TableHead>
                                <TableHead>Trạng thái</TableHead>
                                <TableHead className="text-right">
                                    Thao tác
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                Array.from({ length: itemsPerPage }).map(
                                    (_, i) => (
                                        <TableRow key={`skeleton-${i}`}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Skeleton className="h-10 w-10 rounded-full" />
                                                    <div className="space-y-2">
                                                        <Skeleton className="h-4 w-[150px]" />
                                                        <Skeleton className="h-3 w-[100px]" />
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Skeleton className="h-4 w-[100px]" />
                                            </TableCell>
                                            <TableCell>
                                                <Skeleton className="h-4 w-[120px]" />
                                            </TableCell>
                                            <TableCell>
                                                <Skeleton className="h-5 w-[80px] rounded-full" />
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Skeleton className="h-8 w-8 rounded-md" />
                                                    <Skeleton className="h-8 w-8 rounded-md" />
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ),
                                )
                            ) : isError ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
                                        className="h-32 text-center text-rose-400"
                                    >
                                        Đã xảy ra lỗi khi tải danh sách nhân
                                        viên.
                                    </TableCell>
                                </TableRow>
                            ) : paginatedEmployees?.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
                                        className="h-64 text-center"
                                    >
                                        <div className="flex flex-col items-center justify-center text-slate-400">
                                            <Building className="w-12 h-12 mb-4 text-slate-600" />
                                            <p className="text-lg font-medium text-slate-200">
                                                Không tìm thấy nhân viên nào
                                            </p>
                                            <p className="text-sm">
                                                Hãy thử thay đổi từ khóa tìm
                                                kiếm hoặc thêm mới.
                                            </p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                paginatedEmployees?.map((employee) => {
                                    const statusProps = getStatusBadgeProps(
                                        employee.status,
                                    )
                                    const isHighlighted =
                                        employee.id === highlightedId
                                    return (
                                        <TableRow
                                            key={employee.id}
                                            id={`employee-row-${employee.id}`}
                                            className={`transition-all duration-700 ${
                                                isHighlighted
                                                    ? 'bg-indigo-500/20 ring-1 ring-indigo-500/60 shadow-lg shadow-indigo-500/10 font-medium'
                                                    : ''
                                            }`}
                                        >
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-semibold border border-indigo-500/20">
                                                        {employee.fullName
                                                            .charAt(0)
                                                            .toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-slate-100">
                                                            {employee.fullName}
                                                        </p>
                                                        <p className="text-xs text-slate-400">
                                                            {employee.email}
                                                        </p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-slate-300 font-medium">
                                                {employee.department}
                                            </TableCell>
                                            <TableCell className="text-slate-400">
                                                {employee.position}
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        statusProps.variant
                                                    }
                                                    className={
                                                        statusProps.className
                                                    }
                                                >
                                                    {statusProps.label}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() =>
                                                            handleEdit(employee)
                                                        }
                                                        className="h-8 w-8 text-slate-400 hover:text-indigo-400"
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                        <span className="sr-only">
                                                            Sửa
                                                        </span>
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() =>
                                                            handleDelete(
                                                                employee,
                                                            )
                                                        }
                                                        className="h-8 w-8 text-slate-400 hover:text-rose-400"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                        <span className="sr-only">
                                                            Xóa
                                                        </span>
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            )}
                        </TableBody>
                    </Table>
                </div>

                <div className="px-4 py-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-400">
                    <div>
                        Hiển thị{' '}
                        <span className="font-medium text-slate-200">
                            {totalItems === 0
                                ? 0
                                : (currentPage - 1) * itemsPerPage + 1}
                        </span>{' '}
                        -{' '}
                        <span className="font-medium text-slate-200">
                            {Math.min(currentPage * itemsPerPage, totalItems)}
                        </span>{' '}
                        trong tổng số{' '}
                        <span className="font-medium text-slate-200">
                            {totalItems}
                        </span>{' '}
                        nhân viên
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                                setCurrentPage((prev) => Math.max(prev - 1, 1))
                            }
                            disabled={currentPage === 1}
                            className="h-8 border-slate-800 text-slate-300 hover:bg-slate-800 disabled:opacity-40"
                        >
                            <ChevronLeft className="h-4 w-4 mr-1" /> Trước
                        </Button>

                        <div className="flex items-center gap-1 px-2 text-xs font-medium text-slate-300">
                            Trang {currentPage} / {totalPages}
                        </div>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                                setCurrentPage((prev) =>
                                    Math.min(prev + 1, totalPages),
                                )
                            }
                            disabled={
                                currentPage === totalPages || totalPages === 0
                            }
                            className="h-8 border-slate-800 text-slate-300 hover:bg-slate-800 disabled:opacity-40"
                        >
                            Sau <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                    </div>
                </div>
            </div>
            <EmployeeFormDialog
                open={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                employee={selectedEmployee}
                onSuccess={handleFormSuccess}
            />
            <EmployeeDeleteDialog
                open={isDeleteOpen}
                onClose={() => {
                    setIsDeleteOpen(false)
                    setEmployeeToDelete(null)
                }}
                employee={employeeToDelete}
            />
        </div>
    )
}
