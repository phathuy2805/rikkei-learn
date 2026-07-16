import axios, { AxiosError } from 'axios'
import type { InternalAxiosRequestConfig } from 'axios'

// Create a custom axios instance targeting httpbin
// httpbin.org is ideal for testing response status codes (e.g., /status/200, /status/401)
const apiClient = axios.create({
  baseURL: 'https://httpbin.org',
  headers: {
    'Content-Type': 'application/json',
  },
})

// 1. Request Interceptor
// Automatically attach the Authorization header if the token exists in localStorage
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// 2. Response Interceptor
// Catch global error responses (especially 401 Unauthorized)
apiClient.interceptors.response.use(
  (response) => {
    // Return the response directly if successful
    return response
  },
  (error: AxiosError) => {
    if (error.response) {
      const status = error.response.status

      if (status === 401) {
        // Clear token from localStorage to log the user out
        localStorage.removeItem('auth_token')

        // Dispatch a global custom event to notify React components to update state/redirect
        window.dispatchEvent(
          new CustomEvent('auth-unauthorized', {
            detail: {
              message: 'Phiên làm việc đã hết hạn. Đang chuyển hướng về trang đăng nhập...',
              status: 401,
            },
          })
        )
      }
    }

    return Promise.reject(error)
  }
)

export default apiClient
