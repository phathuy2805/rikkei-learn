import { useState, useEffect } from 'react'
import * as api from './apiClient'
import type { ApiError, RawParams } from './apiClient'

interface LogEntry {
  id: number
  time: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  url: string
  params?: string
  body?: string
  status: 'pending' | 'success' | 'error' | 'cancelled'
  statusCode?: number | string
  message: string
  responsePreview?: string
  durationMs?: number
}

const SCENARIOS: {
  id: string
  label: string
  badge: string
  badgeColor: string
  description: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  url: string
  params?: RawParams
  body?: Record<string, unknown>
  tag: 'get' | 'post' | 'put' | 'delete' | 'params' | 'error'
}[] = [
  {
    id: 'get-success',
    label: 'GET – Thành công (200)',
    badge: '200 OK',
    badgeColor: 'emerald',
    description: 'Gọi GET /get kèm params hợp lệ. Response Interceptor tự động unwrap response.data, UI nhận trực tiếp object sạch.',
    method: 'GET',
    url: '/get',
    params: { q: 'resilient', page: 1, filter: 'active' },
    tag: 'get',
  },
  {
    id: 'get-dirty-params',
    label: 'GET – Params bẩn (undefined/null/"")',
    badge: 'SANITISED',
    badgeColor: 'violet',
    description: 'Truyền vào params chứa các giá trị undefined, null, và chuỗi rỗng. Module tự động dọn rác trước khi gửi đi — httpbin sẽ chỉ nhận những key hợp lệ.',
    method: 'GET',
    url: '/get',
    params: { q: 'react', page: undefined, limit: null, sort: '', active: true },
    tag: 'params',
  },
  {
    id: 'post-success',
    label: 'POST – Tạo dữ liệu mới',
    badge: 'POST',
    badgeColor: 'blue',
    description: 'Gọi POST /post kèm JSON body. Module tự động gắn Content-Type và Bearer Token vào headers.',
    method: 'POST',
    url: '/post',
    body: { title: 'Resilient API Client', author: 'Tech Lead', version: '1.0.0' },
    tag: 'post',
  },
  {
    id: 'put-success',
    label: 'PUT – Cập nhật tài nguyên',
    badge: 'PUT',
    badgeColor: 'amber',
    description: 'Gọi PUT /put để cập nhật đối tượng. Module chuẩn hoá toàn bộ — UI chỉ cần truyền URL và body.',
    method: 'PUT',
    url: '/put',
    body: { id: 42, status: 'published', updatedAt: new Date().toISOString() },
    tag: 'put',
  },
  {
    id: 'delete-success',
    label: 'DELETE – Xoá tài nguyên',
    badge: 'DELETE',
    badgeColor: 'rose',
    description: 'Gọi hàm remove() — được đặt tên tránh xung đột với từ khoá JS "delete". Module xử lý internals, UI chỉ chờ kết quả.',
    method: 'DELETE',
    url: '/delete',
    tag: 'delete',
  },
  {
    id: 'error-401',
    label: 'Response Interceptor – Bắt lỗi 401',
    badge: '401',
    badgeColor: 'orange',
    description: 'Gọi /status/401 để kích hoạt nhánh 401. Interceptor: xoá token khỏi localStorage và bắn custom event "api:unauthorized". UI đang lắng nghe event này.',
    method: 'GET',
    url: '/status/401',
    tag: 'error',
  },
  {
    id: 'error-500',
    label: 'Response Interceptor – Bắt lỗi 500',
    badge: '500',
    badgeColor: 'red',
    description: 'Gọi /status/500 để kích hoạt nhánh 500. Interceptor bắn custom event "api:server-error". Module trả về ApiError chuẩn hoá, không để lỗi thô lọt ra UI.',
    method: 'GET',
    url: '/status/500',
    tag: 'error',
  },
]

const BADGE_COLORS: Record<string, string> = {
  emerald: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  violet:  'bg-violet-500/15  text-violet-400  border-violet-500/30',
  blue:    'bg-blue-500/15    text-blue-400    border-blue-500/30',
  amber:   'bg-amber-500/15   text-amber-400   border-amber-500/30',
  rose:    'bg-rose-500/15    text-rose-400    border-rose-500/30',
  orange:  'bg-orange-500/15  text-orange-400  border-orange-500/30',
  red:     'bg-red-500/15     text-red-400     border-red-500/30',
}

const METHOD_COLORS: Record<string, string> = {
  GET:    'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  POST:   'text-blue-400   bg-blue-500/10    border-blue-500/20',
  PUT:    'text-amber-400  bg-amber-500/10   border-amber-500/20',
  DELETE: 'text-rose-400   bg-rose-500/10    border-rose-500/20',
}

export default function App() {
  const [token, setToken]         = useState<string | null>(() => localStorage.getItem('auth_token'))
  const [logs, setLogs]           = useState<LogEntry[]>([])
  const [loading, setLoading]     = useState<string | null>(null)
  const [toast, setToast]         = useState<{ type: 'warn' | 'error' | 'success'; msg: string } | null>(null)
  const [activeTab, setActiveTab] = useState<'playground' | 'architecture'>('playground')
  const [selectedLog, setSelectedLog] = useState<LogEntry | null>(null)
  const logId = useState(0)

  useEffect(() => {
    const onUnauthorized = () => {
      setToken(null)
      showToast('warn', '🔐 401 Bắt được từ Interceptor: Token đã bị xoá. Đang chuyển về màn hình Đăng nhập...')
    }
    const onServerError = () => {
      showToast('error', '🔥 500 Bắt được từ Interceptor: Lỗi máy chủ nghiêm trọng — đã ghi nhận để báo cáo.')
    }
    window.addEventListener('api:unauthorized', onUnauthorized)
    window.addEventListener('api:server-error',  onServerError)
    return () => {
      window.removeEventListener('api:unauthorized', onUnauthorized)
      window.removeEventListener('api:server-error',  onServerError)
    }
  }, [])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 5000)
    return () => clearTimeout(t)
  }, [toast])

  function showToast(type: 'warn' | 'error' | 'success', msg: string) {
    setToast({ type, msg })
  }

  function handleLogin() {
    const mockToken = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiVGVjaExlYWQiLCJyb2xlIjoiYWRtaW4ifQ.MOCK_SIGNATURE'
    localStorage.setItem('auth_token', mockToken)
    setToken(mockToken)
    showToast('success', '✅ Đăng nhập thành công — Token đã được lưu vào localStorage.')
  }

  function handleLogout() {
    localStorage.removeItem('auth_token')
    setToken(null)
    showToast('warn', 'Đã đăng xuất — Authorization header sẽ không còn được gắn vào request.')
  }

  async function runScenario(scenarioId: string) {
    const scenario = SCENARIOS.find((s) => s.id === scenarioId)
    if (!scenario || loading) return

    setLoading(scenarioId)
    const t0 = performance.now()
    const time = new Date().toLocaleTimeString()
    const nextId = ++logId[0]

    const pending: LogEntry = {
      id: nextId,
      time,
      method: scenario.method,
      url: `https://httpbin.org${scenario.url}`,
      params: scenario.params ? JSON.stringify(scenario.params, null, 2) : undefined,
      body: scenario.body ? JSON.stringify(scenario.body, null, 2) : undefined,
      status: 'pending',
      message: 'Đang gửi yêu cầu...',
    }
    setLogs((prev) => [pending, ...prev])

    try {
      let data: unknown
      if (scenario.method === 'GET') {
        data = await api.get(scenario.url, scenario.params as RawParams)
      } else if (scenario.method === 'POST') {
        data = await api.post(scenario.url, scenario.body)
      } else if (scenario.method === 'PUT') {
        data = await api.put(scenario.url, scenario.body)
      } else {
        data = await api.remove(scenario.url)
      }

      const duration = Math.round(performance.now() - t0)
      const completed: LogEntry = {
        ...pending,
        status: 'success',
        statusCode: 200,
        message: 'Thành công — response.data đã được unwrap bởi Interceptor.',
        responsePreview: JSON.stringify(data, null, 2).slice(0, 800),
        durationMs: duration,
      }
      setLogs((prev) => prev.map((l) => (l.id === nextId ? completed : l)))
      setSelectedLog(completed)
    } catch (err: unknown) {
      const duration = Math.round(performance.now() - t0)
      const apiErr = err as ApiError
      const failed: LogEntry = {
        ...pending,
        status: 'error',
        statusCode: apiErr.status ?? 'ERR',
        message: apiErr.message ?? 'Lỗi không xác định',
        durationMs: duration,
      }
      setLogs((prev) => prev.map((l) => (l.id === nextId ? failed : l)))
      setSelectedLog(failed)
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-16">
      {toast && (
        <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-xl w-full mx-4 px-5 py-3.5 rounded-xl shadow-2xl border backdrop-blur-md text-sm font-medium transition-all ${
          toast.type === 'success' ? 'bg-emerald-950/90 border-emerald-500/40 text-emerald-200' :
          toast.type === 'warn'    ? 'bg-amber-950/90  border-amber-500/40  text-amber-200'   :
                                     'bg-rose-950/90   border-rose-500/40   text-rose-200'
        }`}>
          <div className="flex items-start gap-3">
            <span className="text-base leading-none mt-0.5">
              {toast.type === 'success' ? '✓' : toast.type === 'warn' ? '⚠' : '✗'}
            </span>
            <p className="flex-1 leading-relaxed">{toast.msg}</p>
            <button onClick={() => setToast(null)} className="text-xs opacity-60 hover:opacity-100">✕</button>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-900/70 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between gap-6 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/>
              </svg>
            </div>
            <div>
              <h1 className="text-base font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-outfit">
                Resilient API Client — Mini Module
              </h1>
              <p className="text-[11px] text-slate-400">Bài 10 · Tổng hợp kiến trúc module mạng Production-Ready</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-1 flex gap-1">
              {(['playground', 'architecture'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1 rounded text-[11px] font-semibold transition-all font-outfit ${
                    activeTab === tab ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tab === 'playground' ? '🧪 Playground' : '🏗️ Kiến trúc'}
                </button>
              ))}
            </div>

            {token ? (
              <div className="flex items-center gap-2.5 bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"/>
                <span className="text-xs text-slate-300">Token Active</span>
                <button onClick={handleLogout} className="text-[11px] bg-rose-500/15 text-rose-400 hover:bg-rose-500/25 px-2 py-0.5 rounded-lg border border-rose-500/20 transition-all">
                  Đăng xuất
                </button>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-lg shadow-cyan-500/20"
              >
                🔑 Đăng nhập (cấp Token)
              </button>
            )}
          </div>
        </div>
      </header>

      {activeTab === 'playground' && (
        <main className="max-w-7xl mx-auto px-6 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <section className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider font-outfit">📋 Kịch bản thử nghiệm</h2>
              {!token && (
                <span className="text-[10px] text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-lg">
                  ⚠ Đăng nhập để gắn Token vào request
                </span>
              )}
            </div>

            {SCENARIOS.map((scenario) => (
              <div
                key={scenario.id}
                className={`bg-slate-900 border rounded-xl p-4 transition-all hover:border-cyan-500/30 cursor-pointer ${
                  loading === scenario.id ? 'border-cyan-500/50 shadow-lg shadow-cyan-500/10' : 'border-slate-800'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${METHOD_COLORS[scenario.method]}`}>
                      {scenario.method}
                    </span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${BADGE_COLORS[scenario.badgeColor]}`}>
                      {scenario.badge}
                    </span>
                    <span className="font-semibold text-xs text-slate-200">{scenario.label}</span>
                  </div>

                  <button
                    disabled={!!loading}
                    onClick={() => runScenario(scenario.id)}
                    className="shrink-0 flex items-center gap-1.5 text-[11px] bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-white px-3 py-1 rounded-lg font-semibold transition-all"
                  >
                    {loading === scenario.id ? (
                      <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"/>
                    ) : '▶'}
                    {loading === scenario.id ? 'Đang gọi...' : 'Chạy'}
                  </button>
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed">{scenario.description}</p>

                {scenario.params && (
                  <div className="mt-2.5 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 font-mono text-[10px] text-slate-400">
                    <span className="text-slate-500">params: </span>
                    {JSON.stringify(scenario.params)}
                  </div>
                )}
                {scenario.body && (
                  <div className="mt-2.5 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 font-mono text-[10px] text-slate-400">
                    <span className="text-slate-500">body: </span>
                    {JSON.stringify(scenario.body as Record<string, unknown>)}
                  </div>
                )}
              </div>
            ))}
          </section>

          <section className="lg:col-span-7 flex flex-col gap-6">
            {selectedLog && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-outfit">📬 Chi tiết Response</h3>
                  <div className="flex items-center gap-2">
                    {selectedLog.durationMs !== undefined && (
                      <span className="text-[10px] text-slate-500 bg-slate-950 border border-slate-800 px-2 py-0.5 rounded-lg">
                        ⏱ {selectedLog.durationMs}ms
                      </span>
                    )}
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                      selectedLog.status === 'success'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                    }`}>
                      {selectedLog.statusCode ?? '—'}
                    </span>
                  </div>
                </div>

                <p className={`text-xs mb-3 ${selectedLog.status === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {selectedLog.message}
                </p>

                {selectedLog.params && (
                  <div className="mb-3">
                    <p className="text-[10px] text-slate-500 mb-1 font-semibold uppercase">Params (trước khi sanitise)</p>
                    <pre className="bg-slate-950 border border-slate-800 rounded-lg p-3 font-mono text-[10px] text-amber-300 overflow-x-auto">
                      {selectedLog.params}
                    </pre>
                  </div>
                )}

                {selectedLog.responsePreview && (
                  <div>
                    <p className="text-[10px] text-slate-500 mb-1 font-semibold uppercase">Response data (unwrapped)</p>
                    <pre className="bg-slate-950 border border-slate-800 rounded-lg p-3 font-mono text-[10px] text-cyan-300 overflow-x-auto max-h-64">
                      {selectedLog.responsePreview}
                    </pre>
                  </div>
                )}
              </div>
            )}

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex-1">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-outfit">🖥 Network Console</h3>
                {logs.length > 0 && (
                  <button onClick={() => { setLogs([]); setSelectedLog(null) }} className="text-[10px] text-slate-500 hover:text-rose-400 font-semibold">
                    Xoá log
                  </button>
                )}
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden max-h-[500px] overflow-y-auto">
                {logs.length === 0 ? (
                  <div className="flex items-center justify-center py-16 text-slate-600 text-xs">
                    Chưa có request. Chọn một kịch bản và bấm <strong className="mx-1 text-cyan-500">▶ Chạy</strong> để bắt đầu.
                  </div>
                ) : (
                  <table className="w-full text-[11px]">
                    <thead>
                      <tr className="border-b border-slate-800 text-[10px] text-slate-500 uppercase">
                        <th className="text-left px-3 py-2 font-semibold">Method</th>
                        <th className="text-left px-3 py-2 font-semibold">URL</th>
                        <th className="text-left px-3 py-2 font-semibold">Status</th>
                        <th className="text-left px-3 py-2 font-semibold">ms</th>
                        <th className="px-3 py-2"/>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-900">
                      {logs.map((log) => (
                        <tr
                          key={log.id}
                          onClick={() => setSelectedLog(log)}
                          className="hover:bg-slate-900/60 cursor-pointer transition-colors"
                        >
                          <td className="px-3 py-2.5">
                            <span className={`font-bold text-[10px] px-1.5 py-0.5 rounded border ${METHOD_COLORS[log.method]}`}>
                              {log.method}
                            </span>
                          </td>
                          <td className="px-3 py-2.5 text-slate-300 font-mono max-w-[180px] truncate">
                            {log.url.replace('https://httpbin.org', '')}
                          </td>
                          <td className="px-3 py-2.5">
                            {log.status === 'pending' ? (
                              <span className="w-3 h-3 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin inline-block"/>
                            ) : (
                              <span className={`font-bold ${log.status === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {log.statusCode ?? 'ERR'}
                              </span>
                            )}
                          </td>
                          <td className="px-3 py-2.5 text-slate-500">
                            {log.durationMs !== undefined ? `${log.durationMs}` : '—'}
                          </td>
                          <td className="px-3 py-2.5 text-slate-600 text-[9px]">{log.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </section>
        </main>
      )}

      {activeTab === 'architecture' && (
        <main className="max-w-5xl mx-auto px-6 mt-8 space-y-8">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h2 className="text-base font-bold text-slate-200 font-outfit mb-5">📐 Luồng xử lý Request — Response</h2>
            <div className="flex flex-col items-center gap-0 text-[11px] font-mono">
              {[
                { label: 'UI code: api.get("/posts", { q: "react", page: undefined })', color: 'border-blue-500/40 bg-blue-950/20 text-blue-300' },
                { label: '↓ sanitiseParams() → strip undefined / null / ""', color: 'border-violet-500/40 bg-violet-950/20 text-violet-300' },
                { label: 'Axios Instance  (baseURL, timeout: 5000ms)', color: 'border-cyan-500/40 bg-cyan-950/20 text-cyan-300' },
                { label: '↓ Request Interceptor → inject Authorization: Bearer <token>', color: 'border-cyan-500/40 bg-cyan-950/20 text-cyan-300' },
                { label: '🌐 HTTP Request → server', color: 'border-slate-600 bg-slate-800 text-slate-300' },
                { label: '↓ Response Interceptor (success) → return response.data only', color: 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300' },
                { label: '↓ Response Interceptor (401) → clear token + fire api:unauthorized', color: 'border-amber-500/40 bg-amber-950/20 text-amber-300' },
                { label: '↓ Response Interceptor (500) → fire api:server-error + normalise error', color: 'border-rose-500/40 bg-rose-950/20 text-rose-300' },
                { label: 'UI code receives: plain data object  OR  ApiError { status, message }', color: 'border-blue-500/40 bg-blue-950/20 text-blue-300' },
              ].map((step, i) => (
                <div key={i} className={`w-full max-w-2xl px-4 py-2.5 border rounded-xl text-center leading-relaxed ${step.color} my-1`}>
                  {step.label}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
              <h3 className="text-xs font-bold text-violet-400 uppercase tracking-wider">🧹 sanitiseParams()</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Tiền xử lý tham số truy vấn — loại bỏ mọi giá trị <code>undefined</code>, <code>null</code>, và <code>""</code> trước khi Axios encode chúng vào query string.
              </p>
              <pre className="bg-slate-950 border border-slate-800 rounded-lg p-3 font-mono text-[10px] text-violet-300 overflow-x-auto">
{`// Input (từ dev khác gọi vào)
{ q: 'react', page: undefined,
  limit: null, sort: '' }

// Output (sau khi sanitise)
{ q: 'react' }

// Query string gửi đi
GET /posts?q=react   ✅`}
              </pre>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
              <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">📦 Response.data Unwrapping</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Response Interceptor tự động trả về <code>response.data</code>, che đi toàn bộ Axios metadata (<code>status</code>, <code>headers</code>, <code>config</code>...) khỏi tầng UI.
              </p>
              <pre className="bg-slate-950 border border-slate-800 rounded-lg p-3 font-mono text-[10px] text-cyan-300 overflow-x-auto">
{`// Không có Module (raw Axios)
const res = await axios.get('/posts')
const data = res.data  // ❌ phải unwrap thủ công

// Có Module (clean helper)
const data = await api.get('/posts')
// data là object trực tiếp  ✅`}
              </pre>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
              <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">🔧 CRUD Helpers</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Bốn hàm chuẩn hóa cho mọi thao tác HTTP. UI không bao giờ import axios trực tiếp.
              </p>
              <pre className="bg-slate-950 border border-slate-800 rounded-lg p-3 font-mono text-[10px] text-emerald-300 overflow-x-auto">
{`import * as api from './apiClient'

await api.get('/posts', { q: 'react' })
await api.post('/posts', { title: '...' })
await api.put('/posts/1', { status: 'done' })
await api.remove('/posts/1')`}
              </pre>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
              <h3 className="text-xs font-bold text-rose-400 uppercase tracking-wider">🛡 ApiError Chuẩn hóa</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Mọi lỗi được chuyển đổi sang <code>ApiError</code> nhất quán — UI không bao giờ phải parse cấu trúc AxiosError phức tạp.
              </p>
              <pre className="bg-slate-950 border border-slate-800 rounded-lg p-3 font-mono text-[10px] text-rose-300 overflow-x-auto">
{`interface ApiError {
  status: number | 'NETWORK_ERROR' | 'TIMEOUT'
  message: string   // Tiếng Việt, sẵn sàng show UI
  isApiError: true
}

try {
  await api.get('/protected')
} catch (err) {
  const e = err as ApiError
  alert(e.message)  // ✅ Hiển thị trực tiếp
}`}
              </pre>
            </div>
          </div>
        </main>
      )}

      <footer className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-slate-800 text-center text-[11px] text-slate-600">
        Rikkei Education · Module 3 · Session 5 · Bài tập 10 (Xuất sắc) — Resilient API Client
      </footer>
    </div>
  )
}
