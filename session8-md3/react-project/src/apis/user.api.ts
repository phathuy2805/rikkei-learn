import type { IUser } from '../interfaces/user.interface'
import { axiosClient } from './axiosClient'

export const userApi = {
    getAll: (): Promise<IUser[]> => axiosClient.get('/users'),
    getByEmail: (email: string): Promise<IUser[]> =>
        axiosClient.get(`/users?email=${email}`),
    getById: (id: string): Promise<IUser> => axiosClient.get(`/users/${id}`),
}
