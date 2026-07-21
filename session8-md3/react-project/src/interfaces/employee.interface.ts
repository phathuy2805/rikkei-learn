export type EmployeeStatus = 'ACTIVE' | 'INACTIVE' | 'ON_LEAVE'

export interface IEmployee {
    id: string
    fullName: string
    email: string
    phone: string
    position: string
    department: string
    status: EmployeeStatus
    startDate: string
}
