import type { IEmployee } from '../interfaces/employee.interface'
import { axiosClient } from './axiosClient'

export const employeeApi = {
    getAll: (): Promise<IEmployee[]> => axiosClient.get('/employees'),
    getById: (id: string): Promise<IEmployee> =>
        axiosClient.get(`/employees/${id}`),
    create: (data: Omit<IEmployee, 'id'>): Promise<IEmployee> =>
        axiosClient.post('/employees', data),
    update: (id: string, data: Partial<IEmployee>): Promise<IEmployee> =>
        axiosClient.put(`/employees/${id}`, data),
    remove: (id: string): Promise<void> =>
        axiosClient.delete(`/employees/${id}`),
}
