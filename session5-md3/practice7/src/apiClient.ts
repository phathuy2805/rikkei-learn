import axios from 'axios'

// A default token constant to initialize with
export const DEFAULT_MOCK_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwibmFtZSI6Ik5ndXnhu4VuIFbEg24gVHLhu5FpIiwicm9sZSI6IlNlbmlvciBEZXZlbG9wZXIiLCJpYXQiOjE3MjEwNzYwMDB9.INTERCEPTOR_DEMO_TOKEN'

// Create a dedicated axios instance
const apiClient = axios.create({
  // We can use httpbin for testing request headers & authorization behaviors dynamically
  baseURL: 'https://httpbin.org',
  headers: {
    'Content-Type': 'application/json',
  },
})

// ─────────────────────────────────────────────────────────────────────────────
// REQUEST INTERCEPTOR
// Intercepts every outgoing request BEFORE it is sent to the server.
// Responsibility: Auto-inject Authorization Bearer token if present.
// ─────────────────────────────────────────────────────────────────────────────
apiClient.interceptors.request.use(
  (config) => {
    // Read the token dynamically from localStorage (simulating authentication state check)
    const token = localStorage.getItem('access_token')

    if (token) {
      // Token found -> inject with Bearer prefix
      config.headers.Authorization = `Bearer ${token}`
    } else {
      // Token not found -> skip adding the header gracefully.
      // This will NOT crash the app, allowing the server to handle authorization failure (e.g. return 401)
      console.warn('[Request Interceptor] Access Token not found. Authorization header omitted.')
    }

    return config
  },
  (error) => {
    // Reject request configuration errors gracefully
    return Promise.reject(error)
  }
)

export default apiClient
