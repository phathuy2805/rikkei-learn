import { useState, useEffect } from 'react'
import axios from 'axios'
import apiClient from './apiClient'

interface RequestLog {
  time: string
  url: string
  method: string
  status: number | string
  statusText: string
  headersSent: Record<string, string>
  response: string
  isSuccess: boolean
}

interface User {
  username: string
  role: string
  email: string
}

export default function App() {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('auth_token'))
  const [usernameInput, setUsernameInput] = useState('nguyen_van_a')
  const [user, setUser] = useState<User | null>(() => {
    const savedToken = localStorage.getItem('auth_token')
    if (savedToken) {
      return {
        username: 'nguyen_van_a',
        role: 'Senior Developer',
        email: 'nguyen_van_a@rikkeiedu.com'
      }
    }
    return null
  })
  const [passwordInput, setPasswordInput] = useState('••••••••')
  const [loading, setLoading] = useState(false)
  const [logs, setLogs] = useState<RequestLog[]>([])
  const [activeTab, setActiveTab] = useState<'comparison' | 'interceptor' | 'distributed'>('comparison')
  
  // Custom alert notifications
  const [alert, setAlert] = useState<{
    type: 'success' | 'error' | 'warning' | 'info'
    message: string
    countdown?: number
  } | null>(null)

  // Listen to the global unauthorized custom event from the response interceptor
  useEffect(() => {
    const handleUnauthorized = (e: Event) => {
      const customEvent = e as CustomEvent<{ message: string; status: number }>
      const message = customEvent.detail?.message || 'Phiên đăng nhập đã hết hạn!'
      
      // Show warning alert with countdown
      let count = 3
      setAlert({
        type: 'warning',
        message: `${message} Đang tự động chuyển hướng về trang Đăng nhập trong ${count}s...`,
        countdown: count
      })

      const interval = setInterval(() => {
        count -= 1
        if (count > 0) {
          setAlert((prev) => prev ? { ...prev, message: `${message} Đang tự động chuyển hướng về trang Đăng nhập trong ${count}s...`, countdown: count } : null)
        } else {
          clearInterval(interval)
          setToken(null)
          setUser(null)
          setAlert({
            type: 'info',
            message: 'Đã quay lại màn hình đăng nhập. Vui lòng đăng nhập lại!'
          })
          // Clear alert after 3 seconds
          setTimeout(() => setAlert(null), 3000)
        }
      }, 1000)
    }

    window.addEventListener('auth-unauthorized', handleUnauthorized)
    return () => {
      window.removeEventListener('auth-unauthorized', handleUnauthorized)
    }
  }, [])

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!usernameInput.trim()) {
      setAlert({ type: 'error', message: 'Vui lòng nhập tên tài khoản!' })
      return
    }

    const mockToken = 'jwt-mock-token-header.' + btoa(JSON.stringify({ username: usernameInput })) + '.signature'
    localStorage.setItem('auth_token', mockToken)
    setToken(mockToken)
    setUser({
      username: usernameInput,
      role: 'Senior Developer',
      email: `${usernameInput}@rikkeiedu.com`
    })
    setAlert({ type: 'success', message: 'Đăng nhập thành công! Token đã được lưu trữ.' })
    setTimeout(() => setAlert(null), 3000)
  }

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('auth_token')
    setToken(null)
    setUser(null)
    setAlert({ type: 'info', message: 'Đã đăng xuất thành công!' })
    setTimeout(() => setAlert(null), 3000)
  }

  // Simulate call API using central instance
  const makeApiCall = async (statusPattern: number) => {
    setLoading(true)
    const startTime = new Date().toLocaleTimeString()
    const endpoint = `/status/${statusPattern}`
    const requestUrl = `${apiClient.defaults.baseURL}${endpoint}`

    try {
      const res = await apiClient.get(endpoint)
      
      // Safely extract request headers to avoid 'any' type
      const reqHeaders = (res.config.headers as Record<string, string>) || {}
      
      const newLog: RequestLog = {
        time: startTime,
        url: requestUrl,
        method: 'GET',
        status: res.status,
        statusText: res.statusText || 'OK',
        headersSent: {
          ...reqHeaders,
          Host: 'httpbin.org',
          Authorization: reqHeaders.Authorization || '(Không gửi kèm Token)'
        },
        response: JSON.stringify(res.data || { message: 'Yêu cầu thành công!', status: 200 }, null, 2),
        isSuccess: true
      }
      setLogs((prev) => [newLog, ...prev])
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const reqHeaders = (err.config?.headers as Record<string, string>) || {}
        const newLog: RequestLog = {
          time: startTime,
          url: requestUrl,
          method: 'GET',
          status: err.response?.status || 'Network Error',
          statusText: err.response?.statusText || 'ERROR',
          headersSent: {
            ...reqHeaders,
            Host: 'httpbin.org',
            Authorization: reqHeaders.Authorization || '(Không gửi kèm Token)'
          },
          response: err.response
            ? JSON.stringify(err.response.data || { detail: 'Unauthorized access detected' }, null, 2)
            : 'Yêu cầu không thể hoàn thành hoặc bị chặn bởi Interceptor/Network.',
          isSuccess: false
        }
        setLogs((prev) => [newLog, ...prev])
      } else {
        const error = err as Error
        const newLog: RequestLog = {
          time: startTime,
          url: requestUrl,
          method: 'GET',
          status: 'Internal Client Error',
          statusText: 'CRASH',
          headersSent: {},
          response: error.message || 'Lỗi không xác định',
          isSuccess: false
        }
        setLogs((prev) => [newLog, ...prev])
      }
    } finally {
      setLoading(false)
    }
  }

  // Clear logs
  const clearLogs = () => {
    setLogs([])
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-12">
      {/* Dynamic Alerts Banner */}
      {alert && (
        <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-lg w-full px-6 py-4 rounded-xl shadow-2xl border transition-all duration-500 animate-bounce ${
          alert.type === 'success' ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-300' :
          alert.type === 'error' ? 'bg-rose-950/90 border-rose-500/50 text-rose-300' :
          alert.type === 'warning' ? 'bg-amber-950/90 border-amber-500/50 text-amber-300' :
          'bg-blue-950/90 border-blue-500/50 text-blue-300'
        }`}>
          <div className="flex items-start gap-3">
            <span className="text-xl">
              {alert.type === 'success' && '✓'}
              {alert.type === 'error' && '✗'}
              {alert.type === 'warning' && '⚠'}
              {alert.type === 'info' && 'ℹ'}
            </span>
            <div className="flex-1">
              <p className="font-semibold text-sm">{alert.message}</p>
            </div>
            <button 
              onClick={() => setAlert(null)}
              className="text-slate-400 hover:text-slate-200 text-xs font-bold"
            >
              Đóng
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent font-outfit">
                Global Error Handling Shield
              </h1>
              <p className="text-xs text-slate-400">Bài tập 8: Trạm kiểm soát Axios Interceptors ứng phó với mã lỗi 401</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {token ? (
              <div className="flex items-center gap-3 bg-slate-800/80 px-4 py-1.5 rounded-xl border border-slate-700">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-xs text-slate-300 font-medium font-outfit">
                  Đã đăng nhập: <strong className="text-blue-400">{user?.username}</strong>
                </span>
                <button 
                  onClick={handleLogout}
                  className="ml-2 text-xs bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 px-2.5 py-1 rounded-lg transition-all"
                >
                  Đăng xuất
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 bg-slate-800/40 px-3 py-1 rounded-lg border border-slate-800 text-xs text-slate-400">
                <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                Chưa đăng nhập
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="max-w-7xl mx-auto px-6 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Auth & API Simulator */}
        <section className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Card 1: Auth Module */}
          {!token ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none"></div>
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-200">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span> Màn Hình Đăng Nhập
              </h2>
              
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">TÀI KHOẢN HỌC VIÊN</label>
                  <input
                    type="text"
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all font-outfit"
                    placeholder="Nhập tên đăng nhập..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">MẬT KHẨU</label>
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl py-2.5 font-semibold text-sm transition-all shadow-lg shadow-blue-500/15"
                >
                  Đăng Nhập Ngay
                </button>
              </form>
              <div className="mt-4 p-3 bg-blue-950/20 border border-blue-800/20 rounded-xl text-xs text-slate-400 leading-relaxed">
                💡 <span className="text-blue-400 font-medium">Bản Demo Thực Hành:</span> Bấm đăng nhập để lưu trữ <strong>auth_token</strong> vào <code>localStorage</code>. Token này sẽ được tự động đính kèm qua Interceptor.
              </div>
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none"></div>
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Thông Tin Tài Khoản
              </h2>

              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-3 mb-4 text-sm">
                <div className="flex justify-between border-b border-slate-900 pb-2">
                  <span className="text-slate-500 text-xs">Username</span>
                  <span className="font-semibold text-slate-300 font-outfit">{user?.username}</span>
                </div>
                <div className="flex justify-between border-b border-slate-900 pb-2">
                  <span className="text-slate-500 text-xs">Phân quyền</span>
                  <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-xs border border-blue-500/20">{user?.role}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 text-xs">Email học viên</span>
                  <span className="text-slate-300 font-outfit">{user?.email}</span>
                </div>
              </div>

              <div className="p-3 bg-emerald-950/20 border border-emerald-800/20 rounded-xl text-xs text-slate-400">
                🔒 <span className="text-emerald-400 font-medium">JWT Token Active:</span> Interceptor đang hoạt động. Mọi request gửi đi qua <code>apiClient</code> sẽ tự động đính kèm token trong Headers.
              </div>
            </div>
          )}

          {/* Card 2: Simulator Panel */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex-1 flex flex-col">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-200">
              <span className="w-2 h-2 rounded-full bg-indigo-500"></span> Trình Giả Lập Gọi API
            </h2>

            <p className="text-xs text-slate-400 mb-4">
              Gửi yêu cầu tới <code>https://httpbin.org/status/&#123;code&#125;</code> để kiểm tra hành vi chặn bắt lỗi của Interceptor.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                disabled={loading || !token}
                onClick={() => makeApiCall(200)}
                className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-900 text-slate-200 hover:border-emerald-500/50 disabled:opacity-50 disabled:hover:border-slate-800 transition-all group"
              >
                <span className="text-xs font-semibold text-slate-500 group-hover:text-emerald-400">GET /status/200</span>
                <span className="text-sm font-bold text-emerald-500 mt-1">200 OK</span>
              </button>

              <button
                disabled={loading || !token}
                onClick={() => makeApiCall(401)}
                className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-900 text-slate-200 hover:border-rose-500/50 disabled:opacity-50 disabled:hover:border-slate-800 transition-all group"
              >
                <span className="text-xs font-semibold text-slate-500 group-hover:text-rose-400">GET /status/401</span>
                <span className="text-sm font-bold text-rose-500 mt-1">401 Unauthorized</span>
              </button>

              <button
                disabled={loading || !token}
                onClick={() => makeApiCall(403)}
                className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-900 text-slate-200 hover:border-amber-500/50 disabled:opacity-50 disabled:hover:border-slate-800 transition-all group"
              >
                <span className="text-xs font-semibold text-slate-500 group-hover:text-amber-400">GET /status/403</span>
                <span className="text-sm font-bold text-amber-500 mt-1">403 Forbidden</span>
              </button>

              <button
                disabled={loading || !token}
                onClick={() => makeApiCall(500)}
                className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-900 text-slate-200 hover:border-red-500/50 disabled:opacity-50 disabled:hover:border-slate-800 transition-all group"
              >
                <span className="text-xs font-semibold text-slate-500 group-hover:text-red-400">GET /status/500</span>
                <span className="text-sm font-bold text-red-500 mt-1">500 Server Error</span>
              </button>
            </div>

            {!token && (
              <div className="mb-4 text-center py-2 px-3 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl text-xs">
                ⚠️ Bạn cần đăng nhập để mở khóa bảng gọi API!
              </div>
            )}

            {/* Terminal logs */}
            <div className="flex-1 flex flex-col min-h-[220px]">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-slate-400 font-outfit uppercase tracking-wider">Nhật ký mạng (Network Logs)</span>
                {logs.length > 0 && (
                  <button 
                    onClick={clearLogs}
                    className="text-[10px] text-slate-500 hover:text-rose-400 font-semibold"
                  >
                    Xóa nhật ký
                  </button>
                )}
              </div>

              <div className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-[11px] overflow-y-auto max-h-[300px] space-y-4">
                {logs.length === 0 ? (
                  <div className="text-slate-600 h-full flex items-center justify-center text-center py-8">
                    Chưa có nhật ký request nào. Hãy bấm một nút API ở trên để kích hoạt gửi request.
                  </div>
                ) : (
                  logs.map((log, idx) => (
                    <div key={idx} className="border-b border-slate-900 pb-3 last:border-b-0 last:pb-0">
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                            log.isSuccess ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                          }`}>
                            {log.method}
                          </span>
                          <span className="text-slate-300 overflow-hidden text-ellipsis max-w-[150px] whitespace-nowrap" title={log.url}>
                            {log.url.replace('https://httpbin.org', '')}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-500 text-[10px]">{log.time}</span>
                          <span className={`font-bold ${log.isSuccess ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {log.status}
                          </span>
                        </div>
                      </div>
                      
                      {/* Headers sent */}
                      <div className="mb-1 text-slate-500">
                        <span className="text-blue-500 font-semibold">Headers gửi:</span> {JSON.stringify(log.headersSent)}
                      </div>

                      {/* Response body */}
                      <div className="bg-slate-900/60 p-2 rounded border border-slate-900 overflow-x-auto max-h-[100px] text-slate-400 whitespace-pre-wrap">
                        {log.response}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Right Side: Tab Panel Comparison & Architecture */}
        <section className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Navigation Tabs */}
          <div className="bg-slate-900 p-1.5 rounded-xl border border-slate-800 flex gap-2">
            <button
              onClick={() => setActiveTab('comparison')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold font-outfit transition-all ${
                activeTab === 'comparison'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              📊 So Sánh Đa Giải Pháp
            </button>
            <button
              onClick={() => setActiveTab('interceptor')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold font-outfit transition-all ${
                activeTab === 'interceptor'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              🛡️ Mã Nguồn Interceptor
            </button>
            <button
              onClick={() => setActiveTab('distributed')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold font-outfit transition-all ${
                activeTab === 'distributed'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              🔄 Mã Nguồn Phân Tán (Catch)
            </button>
          </div>

          {/* Tab Content 1: Comparison table */}
          {activeTab === 'comparison' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <div>
                <h2 className="text-lg font-bold mb-2 text-slate-200 font-outfit">
                  So sánh: Tầng Interceptor Tập Trung vs Khối Catch Phân Tán
                </h2>
                <p className="text-xs text-slate-400">
                  Phân tích cấu trúc hệ thống quản lý lỗi và xử lý phiên làm việc hết hạn (401 Unauthorized) trong các ứng dụng thực tế.
                </p>
              </div>

              {/* Table */}
              <div className="overflow-x-auto border border-slate-800 rounded-xl">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-950 border-b border-slate-800 text-slate-300 font-bold uppercase tracking-wider">
                      <th className="p-3">Tiêu chí</th>
                      <th className="p-3 text-blue-400 border-l border-slate-800">Interceptor Tập Trung (Khuyên dùng)</th>
                      <th className="p-3 text-amber-500 border-l border-slate-800">Catch Phân Tán (Từng API call)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-400">
                    <tr className="hover:bg-slate-950/40">
                      <td className="p-3 font-semibold text-slate-200">Độ lặp mã (DRY)</td>
                      <td className="p-3 text-emerald-400 border-l border-slate-800">
                        <strong>Không lặp lại:</strong> Chỉ cài đặt đúng một lần tại file định nghĩa Axios client.
                      </td>
                      <td className="p-3 text-rose-400 border-l border-slate-800">
                        <strong>Lặp lại rất cao:</strong> Phải viết khối try-catch 401 ở hàng chục, hàng trăm hàm gọi API.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-950/40">
                      <td className="p-3 font-semibold text-slate-200">Khả năng bảo trì</td>
                      <td className="p-3 text-emerald-400 border-l border-slate-800">
                        <strong>Dễ dàng:</strong> Khi thay đổi cách xử lý (ví dụ: chuyển đổi trang đăng nhập, thêm Toast thông báo, hoặc gọi API làm mới token), chỉ cần thay đổi tại 1 nơi duy nhất.
                      </td>
                      <td className="p-3 text-rose-400 border-l border-slate-800">
                        <strong>Cực kỳ khó:</strong> Phải tìm và sửa đổi ở tất cả các vị trí gọi API trong toàn bộ dự án nếu yêu cầu logic thay đổi.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-950/40">
                      <td className="p-3 font-semibold text-slate-200">Tính đồng bộ UX</td>
                      <td className="p-3 text-emerald-400 border-l border-slate-800">
                        <strong>Tuyệt đối:</strong> Đảm bảo toàn bộ ứng dụng đều có cùng một cách hành xử khi gặp lỗi 401. Không bị sót.
                      </td>
                      <td className="p-3 text-rose-400 border-l border-slate-800">
                        <strong>Kém:</strong> Lỗi từ các dev khác nhau hoặc file viết thiếu catch dẫn đến việc có trang tự động văng ra login, có trang lại bị treo đơ không phản hồi.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-950/40">
                      <td className="p-3 font-semibold text-slate-200">Tính linh hoạt</td>
                      <td className="p-3 text-slate-300 border-l border-slate-800">
                        <strong>Tốt:</strong> Vẫn có thể tùy biến bỏ qua Interceptor cho một số API cụ thể bằng cách truyền thêm Header custom hoặc Config custom (ví dụ: <code>skipAuthCheck</code>).
                      </td>
                      <td className="p-3 text-emerald-400 border-l border-slate-800">
                        <strong>Rất cao:</strong> Dễ dàng tùy chỉnh cách xử lý lỗi khác nhau cho từng nút nhấn hoặc hành động chuyên biệt mà không bị ảnh hưởng bởi bên ngoài.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-950/40">
                      <td className="p-3 font-semibold text-slate-200">Độ phức tạp ban đầu</td>
                      <td className="p-3 text-amber-400 border-l border-slate-800">
                        Cần hiểu biết tốt về Axios Interceptor và cách lắng nghe/quản lý luồng sự kiện (Event Emitter hoặc Context).
                      </td>
                      <td className="p-3 text-emerald-400 border-l border-slate-800">
                        Đơn giản, trực quan đối với lập trình viên mới bắt đầu học lập trình bất đồng bộ.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Verdict Info */}
              <div className="p-4 bg-blue-950/30 border border-blue-800/30 rounded-xl text-xs space-y-2 leading-relaxed">
                <span className="font-bold text-blue-400 block font-outfit uppercase">🎯 KẾT LUẬN & KIẾN NGHỊ:</span>
                <p>
                  Đối với các ứng dụng doanh nghiệp thực tế, việc sử dụng <strong>Interceptor tập trung</strong> là bắt buộc. Nó giải quyết triệt để vấn đề 401 khi token hết hạn bằng cách giải phóng token và điều hướng người dùng ngay lập tức, tránh hiện tượng rò rỉ dữ liệu hoặc lỗi giao diện dây chuyền.
                </p>
                <p>
                  Cách thức này thường kết hợp với luồng <strong>Silent Refresh Token</strong> để tự động gia hạn phiên đăng nhập trong nền trước khi quyết định ngắt kết nối người dùng hoàn toàn.
                </p>
              </div>
            </div>
          )}

          {/* Tab Content 2: Source code Interceptor */}
          {activeTab === 'interceptor' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div>
                <h2 className="text-lg font-bold mb-1 text-slate-200 font-outfit">
                  Giải pháp Tập Trung (Axios Interceptors)
                </h2>
                <p className="text-xs text-slate-400">
                  Cấu hình tập trung tại file <code>apiClient.ts</code> để quản lý chung cho mọi request của ứng dụng.
                </p>
              </div>

              <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-[11px] overflow-x-auto text-slate-300 whitespace-pre">
{`// src/apiClient.ts
import axios, { AxiosError } from 'axios';

const apiClient = axios.create({
  baseURL: 'https://httpbin.org',
});

// Request Interceptor: Tự động đính kèm Authorization Header
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = \`Bearer \${token}\`;
  }
  return config;
});

// Response Interceptor: Trạm kiểm soát phản hồi toàn cục
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      // 1. Giải phóng token cũ
      localStorage.removeItem('auth_token');

      // 2. Phát tín hiệu toàn cục thông báo Token đã hết hạn
      window.dispatchEvent(new CustomEvent('auth-unauthorized'));
    }
    return Promise.reject(error);
  }
);`}
              </div>
              <div className="text-xs text-slate-400 leading-relaxed bg-slate-950/40 p-3 rounded-lg border border-slate-850">
                ✅ <strong>Ưu điểm:</strong> UI component không cần quan tâm đến lỗi 401. Khi bất cứ lệnh gọi API nào lỗi 401, Interceptor lập tức xử lý và dọn dẹp bộ nhớ trước.
              </div>
            </div>
          )}

          {/* Tab Content 3: Source code Distributed */}
          {activeTab === 'distributed' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div>
                <h2 className="text-lg font-bold mb-1 text-slate-200 font-outfit">
                  Giải pháp Phân Tán (Try-Catch cục bộ)
                </h2>
                <p className="text-xs text-slate-400 text-rose-400">
                  ⚠️ Cảnh báo: Cách tiếp cận này tạo ra rất nhiều mã lặp và cực kỳ khó bảo trì.
                </p>
              </div>

              <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-[11px] overflow-x-auto text-slate-300 whitespace-pre">
{`// Cách tiếp cận sai lầm: Xử lý 401 lặp lại ở mọi nơi gọi API

// Tại file ComponentA.tsx
async function fetchUserData() {
  try {
    const res = await axios.get('/user/profile');
  } catch (err: any) {
    if (err.response && err.response.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
  }
}

// Tại file ComponentB.tsx
async function fetchCartData() {
  try {
    const res = await axios.get('/cart');
  } catch (err: any) {
    if (err.response && err.response.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
  }
}

// Tại file ComponentC.tsx... (Lặp lại tương tự hàng chục lần)`}
              </div>
              <div className="text-xs text-slate-400 leading-relaxed bg-rose-950/20 p-3 rounded-lg border border-rose-900/30">
                ❌ <strong>Nhược điểm chí mạng:</strong> Nếu thay đổi luồng điều hướng (ví dụ: chuyển từ <code>window.location.href</code> sang dùng React Router `navigate`), bạn sẽ phải chỉnh sửa mã nguồn của hàng chục file khác nhau trong codebase.
              </div>
            </div>
          )}

        </section>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-slate-800 text-center text-xs text-slate-500 font-inter">
        Rikkei Education • Module 3 • Session 5 • Bài tập 8 (Giỏi) - Global Response Interceptor
      </footer>
    </div>
  )
}
