import axios from 'axios'
import type { AxiosError, InternalAxiosRequestConfig } from 'axios'

export interface ApiError {
  status: number | 'NETWORK_ERROR' | 'TIMEOUT'
  message: string
  isApiError: true
}

export type RawParams = Record<string, unknown>

type CleanParams = Record<string, string | number | boolean>

const TOKEN_KEY = 'auth_token'
const TIMEOUT_MS = 5_000
const BASE_URL = 'https://httpbin.org'

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT_MS,
  headers: { 'Content-Type': 'application/json' },
})

export function sanitiseParams(raw?: RawParams): CleanParams | undefined {
  if (!raw) return undefined

  const cleaned: CleanParams = {}
  for (const [key, value] of Object.entries(raw)) {
    if (value !== undefined && value !== null && value !== '') {
      cleaned[key] = value as string | number | boolean
    }
  }
  return Object.keys(cleaned).length > 0 ? cleaned : undefined
}

function buildApiError(err: AxiosError): ApiError {
  if (err.code === 'ECONNABORTED') {
    return { status: 'TIMEOUT', message: 'Yêu cầu đã hết thời gian chờ (timeout 5s).', isApiError: true }
  }
  if (!err.response) {
    return { status: 'NETWORK_ERROR', message: 'Không thể kết nối đến máy chủ. Kiểm tra kết nối mạng.', isApiError: true }
  }
  const status = err.response.status
  const messages: Record<number, string> = {
    400: 'Yêu cầu không hợp lệ (400 Bad Request).',
    401: 'Phiên đăng nhập đã hết hạn hoặc chưa xác thực (401 Unauthorized).',
    403: 'Bạn không có quyền truy cập tài nguyên này (403 Forbidden).',
    404: 'Không tìm thấy tài nguyên được yêu cầu (404 Not Found).',
    422: 'Dữ liệu gửi lên không hợp lệ (422 Unprocessable Entity).',
    500: 'Lỗi hệ thống phía máy chủ. Vui lòng thử lại sau (500 Internal Server Error).',
    502: 'Cổng không hợp lệ từ máy chủ trung gian (502 Bad Gateway).',
    503: 'Dịch vụ tạm thời không khả dụng (503 Service Unavailable).',
  }
  return {
    status,
    message: messages[status] ?? `Lỗi không xác định (HTTP ${status}).`,
    isApiError: true,
  }
}

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (err: AxiosError) => Promise.reject(err)
)

instance.interceptors.response.use(
  (response) => {
    return response.data
  },
  (err: AxiosError) => {
    const apiError = buildApiError(err)
    const status = err.response?.status

    if (status === 401) {
      localStorage.removeItem(TOKEN_KEY)
      window.dispatchEvent(
        new CustomEvent('api:unauthorized', {
          detail: { message: apiError.message, timestamp: Date.now() },
        })
      )
    }

    if (status === 500) {
      window.dispatchEvent(
        new CustomEvent('api:server-error', {
          detail: { message: apiError.message, timestamp: Date.now() },
        })
      )
    }

    return Promise.reject(apiError)
  }
)

export async function get<T = unknown>(url: string, params?: RawParams): Promise<T> {
  const clean = sanitiseParams(params)
  return instance.get<T, T>(url, { params: clean })
}

export async function post<T = unknown>(url: string, data?: unknown): Promise<T> {
  return instance.post<T, T>(url, data)
}

export async function put<T = unknown>(url: string, data?: unknown): Promise<T> {
  return instance.put<T, T>(url, data)
}

export async function remove<T = unknown>(url: string): Promise<T> {
  return instance.delete<T, T>(url)
}

export { instance as axiosInstance }
