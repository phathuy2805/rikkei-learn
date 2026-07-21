import axios from 'axios'

export const axiosClient = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
})

axiosClient.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error),
)
