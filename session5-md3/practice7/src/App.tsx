import { useState, useEffect } from 'react'
import apiClient, { DEFAULT_MOCK_TOKEN } from './apiClient'
import { AxiosError } from 'axios'

interface RequestLog {
  time: string
  url: string
  method: string
  headersSent: Record<string, string>
  status: number | string
  statusText: string
  response: string
  isSuccess: boolean
}

export default function App() {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('access_token'))
  const [loading, setLoading] = useState(false)
  const [currentLog, setCurrentLog] = useState<RequestLog | null>(null)
  const [infoMessage, setInfoMessage] = useState<string | null>(null)

  // Login handler
  const handleLogin = () => {
    localStorage.setItem('access_token', DEFAULT_MOCK_TOKEN)
    setToken(DEFAULT_MOCK_TOKEN)
    setInfoMessage('Đăng nhập thành công! Token đã được lưu trữ trong localStorage.')
  }

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('access_token')
    setToken(null)
    setInfoMessage('Đăng xuất thành công! Token đã được xóa khỏi localStorage.')
  }

  // Clear info message timer
  useEffect(() => {
    if (infoMessage) {
      const timer = setTimeout(() => setInfoMessage(null), 4000)
      return () => clearTimeout(timer)
    }
  }, [infoMessage])

  // Call API function
  const triggerApiCall = async (endpoint: string) => {
    setLoading(true)
    setCurrentLog(null)
    const startTime = new Date().toLocaleTimeString()

    // Determine absolute or relative URL
    // httpbin endpoints are relative to apiClient.defaults.baseURL
    const requestUrl = endpoint.startsWith('http') ? endpoint : `${apiClient.defaults.baseURL}${endpoint}`

    try {
      // Trigger request using our custom axios instance
      const res = await apiClient.get(endpoint)

      // Get configuration details to show what was sent
      const headersSent = (res.config.headers as Record<string, string>) || {}

      setCurrentLog({
        time: startTime,
        url: requestUrl,
        method: 'GET',
        headersSent: {
          ...headersSent,
          // Redact user-agent/accept to focus on authentication headers
          Host: 'httpbin.org',
          Accept: headersSent.Accept || 'application/json',
          Authorization: headersSent.Authorization || '(Not Sent)',
        },
        status: res.status,
        statusText: res.statusText || 'OK',
        response: JSON.stringify(res.data, null, 2),
        isSuccess: true,
      })
    } catch (err: unknown) {
      const axiosError = err as AxiosError
      const headersSent = (axiosError.config?.headers as Record<string, string>) || {}

      setCurrentLog({
        time: startTime,
        url: requestUrl,
        method: 'GET',
        headersSent: {
          ...headersSent,
          Host: 'httpbin.org',
          Authorization: headersSent.Authorization || '(Not Sent)',
        },
        status: axiosError.response?.status || 'Network Error',
        statusText: axiosError.response?.statusText || 'UNAUTHORIZED / ERROR',
        response: axiosError.response
          ? JSON.stringify(axiosError.response.data, null, 2)
          : 'Không thể nhận phản hồi từ máy chủ. Yêu cầu đã thất bại.',
        isSuccess: false,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-6 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/60 backdrop-blur-md p-6 rounded-2xl border border-slate-800/80">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              Request Interceptor Lab
            </div>
            <h1 className="text-3xl font-extrabold font-outfit bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Tự động hóa định danh với Axios Request Interceptor
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Can thiệp vòng đời HTTP Request để tự động đính kèm mã định danh <code>Bearer Token</code> mà không cần cấu hình thủ công ở từng API call.
            </p>
          </div>
        </div>

        {/* Feedback Alert */}
        {infoMessage && (
          <div className="p-4 bg-blue-950/40 border border-blue-500/30 rounded-xl flex items-center gap-3 text-blue-400 text-sm animate-fade-in">
            <i className="fa-solid fa-circle-info text-lg"></i>
            <span>{infoMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Controls Panel (5 columns) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Authentications Simulator Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
              <h2 className="text-base font-bold font-outfit flex items-center gap-2 border-b border-slate-800 pb-3">
                <i className="fa-solid fa-key text-yellow-500"></i>
                Simulate Authentication State
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3.5 bg-slate-950 rounded-xl border border-slate-850">
                  <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Trạng thái đăng nhập</span>
                  {token ? (
                    <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      Đã đăng nhập
                    </span>
                  ) : (
                    <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-slate-850 text-slate-400 border border-slate-800 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
                      Chưa đăng nhập
                    </span>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleLogin}
                    disabled={!!token}
                    className={`flex-1 py-2.5 px-4 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-2 border cursor-pointer ${
                      token
                        ? 'bg-slate-850 border-slate-800 text-slate-500 cursor-not-allowed'
                        : 'bg-emerald-600 border-emerald-500 hover:bg-emerald-500 text-white shadow-lg hover:shadow-emerald-500/10'
                    }`}
                  >
                    <i className="fa-solid fa-sign-in"></i> Đăng Nhập (Lưu Token)
                  </button>

                  <button
                    onClick={handleLogout}
                    disabled={!token}
                    className={`flex-1 py-2.5 px-4 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-2 border cursor-pointer ${
                      !token
                        ? 'bg-slate-850 border-slate-800 text-slate-500 cursor-not-allowed'
                        : 'bg-rose-600/15 border-rose-500/30 hover:bg-rose-600/25 text-rose-400'
                    }`}
                  >
                    <i className="fa-solid fa-sign-out"></i> Đăng Xuất (Xóa Token)
                  </button>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Access Token trong LocalStorage</span>
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-850 font-mono text-[10px] break-all leading-normal max-h-[100px] overflow-y-auto text-slate-400">
                    {token ? token : <span className="italic text-slate-600">null (Không có token)</span>}
                  </div>
                </div>
              </div>
            </div>

            {/* Test Endpoints */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h2 className="text-base font-bold font-outfit flex items-center gap-2 border-b border-slate-800 pb-3">
                <i className="fa-solid fa-network-wired text-indigo-400"></i>
                Call Test Endpoints
              </h2>

              <div className="space-y-3">
                {/* Endpoint 1 */}
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-850 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] px-2 py-0.5 rounded font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold">GET</span>
                    <span className="text-[11px] font-mono text-slate-450">/bearer</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Endpoint yêu cầu xác thực. Sẽ trả về <strong>200 OK</strong> nếu có token, hoặc <strong>401 Unauthorized</strong> nếu thiếu token.
                  </p>
                  <button
                    onClick={() => triggerApiCall('/bearer')}
                    disabled={loading}
                    className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
                  >
                    Kiểm Tra Bằng Endpoint Auth
                  </button>
                </div>

                {/* Endpoint 2 */}
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-850 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] px-2 py-0.5 rounded font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold">GET</span>
                    <span className="text-[11px] font-mono text-slate-450">/headers</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Endpoint hiển thị chi tiết các headers nhận được từ Client. Sử dụng để kiểm chứng token đã được tiêm tự động thành công.
                  </p>
                  <button
                    onClick={() => triggerApiCall('/headers')}
                    disabled={loading}
                    className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-bold transition-all cursor-pointer border border-slate-700"
                  >
                    Xem Chi Tiết HTTP Headers
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Console Log Panel (7 columns) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Live API Console Log */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <h2 className="text-base font-bold font-outfit flex items-center gap-2">
                  <i className="fa-solid fa-terminal text-slate-400"></i>
                  API Client Output & Logs
                </h2>
                <span className="text-[10px] px-2 py-0.5 bg-slate-950 border border-slate-850 rounded font-mono text-slate-500">
                  axios.interceptors
                </span>
              </div>

              {loading && (
                <div className="flex flex-col items-center justify-center py-20 space-y-3">
                  <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-xs text-slate-500 font-medium">Đang gửi yêu cầu qua Interceptor...</span>
                </div>
              )}

              {!loading && currentLog && (
                <div className="space-y-5 font-mono text-xs">
                  {/* Status Indicator */}
                  <div className={`p-4 rounded-xl border flex items-center justify-between ${
                    currentLog.isSuccess 
                      ? 'bg-emerald-950/20 border-emerald-500/20 text-emerald-400' 
                      : 'bg-rose-950/20 border-rose-500/20 text-rose-400'
                  }`}>
                    <div className="flex items-center gap-3">
                      <i className={`text-lg fa-solid ${
                        currentLog.isSuccess ? 'fa-circle-check' : 'fa-circle-exclamation animate-pulse'
                      }`}></i>
                      <div>
                        <span className="block text-[10px] uppercase font-bold text-slate-500">HTTP Response Code</span>
                        <span className="font-extrabold text-sm">{currentLog.status} {currentLog.statusText}</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-500">{currentLog.time}</span>
                  </div>

                  {/* Sent Request Metadata */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] text-slate-500 block uppercase font-bold">Request URL</span>
                        <span className="text-slate-300 break-all">{currentLog.url}</span>
                      </div>
                    </div>

                    <div className="border-t border-slate-900 pt-3">
                      <span className="text-[10px] text-slate-500 block uppercase font-bold mb-2">Request Headers (Đã can thiệp & tiêm token)</span>
                      <div className="space-y-1.5 text-[11px]">
                        {Object.entries(currentLog.headersSent).map(([key, val]) => {
                          const isAuthHeader = key.toLowerCase() === 'authorization'
                          return (
                            <div key={key} className="flex justify-between border-b border-slate-900/50 pb-1">
                              <span className={isAuthHeader ? 'text-indigo-400 font-bold' : 'text-slate-500'}>{key}:</span>
                              <span className={`break-all ${isAuthHeader ? 'text-indigo-200 font-semibold' : 'text-slate-350'}`}>
                                {val}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Server Response Body */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Server Response Body</span>
                    <pre className="bg-slate-950 p-4 rounded-xl border border-slate-855 text-[11px] max-h-[220px] overflow-y-auto text-slate-300 scrollbar-thin">
                      {currentLog.response}
                    </pre>
                  </div>
                </div>
              )}

              {!loading && !currentLog && (
                <div className="text-center py-24 bg-slate-950 border border-slate-850 rounded-2xl flex flex-col items-center justify-center text-slate-500 space-y-2">
                  <i className="fa-solid fa-code text-2xl text-slate-700"></i>
                  <p className="italic text-xs">Hãy nhấn gọi Endpoint để bắt đầu kiểm nghiệm interceptor.</p>
                </div>
              )}
            </div>

            {/* Explanation box on Interceptors */}
            <div className="p-5 bg-indigo-950/20 border border-indigo-500/20 rounded-2xl space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2 font-outfit">
                <i className="fa-solid fa-circle-nodes"></i>
                Cơ chế can thiệp an toàn (Bẫy dữ liệu)
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed font-inter">
                Tại <code>apiClient.ts</code>, Interceptor thực hiện đọc token từ <code>localStorage</code>. 
                Nếu không tìm thấy token (người dùng chưa đăng nhập), chúng tôi chỉ ghi cảnh báo <code>console.warn</code> mà không ném lỗi ra ngoài. 
                Yêu cầu vẫn được gửi đi bình thường đến máy chủ (không đính kèm token), giúp hệ thống không bị crash và để máy chủ phản hồi mã lỗi <code>401 Unauthorized</code> một cách tự nhiên.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}
