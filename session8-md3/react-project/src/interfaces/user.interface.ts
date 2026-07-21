export interface IUser {
    id: string
    fullName: string
    email: string
    password: string
    role: 'ADMIN' | 'EMPLOYEE'
}
