/**
 * ─────────────────────────────────────────────────────────────────────────────
 * Resilient API Client Module
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * A production-ready, self-contained network communication module that
 * encapsulates all HTTP logic so that UI developers only import clean helpers.
 *
 * Architecture:
 *  - Axios instance with 5000 ms timeout
 *  - Request Interceptor  → auto-inject Bearer token from localStorage
 *  - Response Interceptor → unwrap response.data / handle 401 & 500 globally
 *  - Params sanitiser     → strip undefined/null values before every GET request
 *  - Typed CRUD exports   → get / post / put / remove
 * ─────────────────────────────────────────────────────────────────────────────
 */

import axios from 'axios'
import type { AxiosError, InternalAxiosRequestConfig } from 'axios'

// ─── Types ────────────────────────────────────────────────────────────────────

/** Union of API errors surfaced to UI consumers */
export interface ApiError {
  status: number | 'NETWORK_ERROR' | 'TIMEOUT'
  message: string
  isApiError: true
}

/** Raw query-params before sanitisation */
export type RawParams = Record<string, unknown>

/** Cleaned params safe to send over the wire */
type CleanParams = Record<string, string | number | boolean>

// ─── Constants ────────────────────────────────────────────────────────────────

const TOKEN_KEY = 'auth_token'
const TIMEOUT_MS = 5_000
const BASE_URL = 'https://httpbin.org'

// ─── Axios Instance ───────────────────────────────────────────────────────────

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT_MS,
  headers: { 'Content-Type': 'application/json' },
})

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * sanitiseParams
 * Strips params where the value is undefined, null, or an empty string.
 * Prevents garbage keys from polluting the query string.
 *
 * @example
 * sanitiseParams({ q: 'react', page: undefined, limit: 10 })
 * // → { q: 'react', limit: 10 }
 */
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

/**
 * buildApiError
 * Normalises any thrown error into a consistent ApiError shape
 * so UI code never has to parse raw AxiosError internals.
 */
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

// ─── Request Interceptor ──────────────────────────────────────────────────────
// Auto-inject Authorization header from localStorage before every request.

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

// ─── Response Interceptor ─────────────────────────────────────────────────────
// Success path → unwrap response.data (hides Axios metadata from UI code).
// Failure path → normalise error, handle 401 / 500 globally, then re-throw.

instance.interceptors.response.use(
  (response) => {
    // Return only the data payload — UI code receives plain objects, not AxiosResponse.
    return response.data
  },
  (err: AxiosError) => {
    const apiError = buildApiError(err)
    const status = err.response?.status

    // ── Global 401 handler ───────────────────────────────────────────────────
    // Clear stale token and notify the app to redirect to Login.
    if (status === 401) {
      localStorage.removeItem(TOKEN_KEY)
      window.dispatchEvent(
        new CustomEvent('api:unauthorized', {
          detail: { message: apiError.message, timestamp: Date.now() },
        })
      )
    }

    // ── Global 500 handler ───────────────────────────────────────────────────
    // Dispatch a global event so a top-level Toast / Snackbar can react.
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

// ─── Public CRUD Helpers ──────────────────────────────────────────────────────
// These are the only functions UI developers ever need to import.

/**
 * GET request with automatic param sanitisation.
 * Strips undefined / null / empty-string values from `params` before sending.
 */
export async function get<T = unknown>(url: string, params?: RawParams): Promise<T> {
  const clean = sanitiseParams(params)
  // The response interceptor already unwraps response.data,
  // so `instance.get()` returns T directly here.
  return instance.get<T, T>(url, { params: clean })
}

/**
 * POST request — sends `data` as a JSON body.
 */
export async function post<T = unknown>(url: string, data?: unknown): Promise<T> {
  return instance.post<T, T>(url, data)
}

/**
 * PUT request — full resource replacement.
 */
export async function put<T = unknown>(url: string, data?: unknown): Promise<T> {
  return instance.put<T, T>(url, data)
}

/**
 * DELETE request — named `remove` to avoid conflict with the JS reserved word.
 */
export async function remove<T = unknown>(url: string): Promise<T> {
  return instance.delete<T, T>(url)
}

// ─── Named re-export of the raw instance (for advanced use-cases only) ────────
export { instance as axiosInstance }
