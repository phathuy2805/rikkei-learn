import { useState, useRef } from 'react'
import axios from 'axios'

interface SearchItem {
  id: number
  title: string
  category: string
  description: string
  tags: string[]
}

interface LogEntry {
  time: string
  query: string
  type: 'trigger' | 'cancel' | 'success' | 'abort_success' | 'error'
  message: string
}

const MOCK_DATA: SearchItem[] = [
  { id: 1, title: 'React 19 New Features', category: 'React', description: 'Explore the new features in React 19, including Server Actions, useActionState, and document metadata support.', tags: ['React', 'Frontend'] },
  { id: 2, title: 'Getting Started with Vue 3', category: 'Vue', description: 'A comprehensive guide to building web applications using Vue 3 Composition API.', tags: ['Vue', 'Frontend'] },
  { id: 3, title: 'Understanding Angular Signals', category: 'Angular', description: 'Deep dive into Angular Signals, the new reactive primitive for change detection in Angular applications.', tags: ['Angular', 'Frontend'] },
  { id: 4, title: 'Tailwind CSS v4.0 Alpha Review', category: 'CSS', description: 'An overview of what is coming in Tailwind CSS version 4, featuring CSS-first configurations.', tags: ['CSS', 'Tailwind'] },
  { id: 5, title: 'Mastering TypeScript 5.0 Decorators', category: 'TypeScript', description: 'Learn how to use standard ECMAScript decorators in TypeScript 5.0 to write cleaner code.', tags: ['TypeScript', 'Language'] },
  { id: 6, title: 'Vite 6.0 Bundler Optimization', category: 'Vite', description: 'How Vite 6.0 optimizes dev server startup and hot module replacement times in large scale apps.', tags: ['Vite', 'Tools'] },
  { id: 7, title: 'State Management with Redux Toolkit', category: 'React', description: 'Modern Redux development using Redux Toolkit slices, thunks, and listener middleware.', tags: ['React', 'Redux'] },
  { id: 8, title: 'Asynchronous Axios Request Cancellation', category: 'Axios', description: 'Prevent race conditions and manage system resources by canceling HTTP requests with AbortController.', tags: ['Axios', 'Network'] },
]

export default function App() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchItem[]>([])
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [delay, setDelay] = useState(2) // delay in seconds
  const [mode, setMode] = useState<'cancellation' | 'race-condition'>('cancellation')
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'demo' | 'theory'>('demo')
  const [isSimulating, setIsSimulating] = useState(false)

  const abortControllerRef = useRef<AbortController | null>(null)
  const activeQueryRef = useRef<string>('')

  // Helper to add logs
  const addLog = (log: LogEntry) => {
    setLogs((prev) => [log, ...prev])
  }

  // Clear all logs
  const clearLogs = () => {
    setLogs([])
  }

  // Perform search api call
  const performSearch = async (searchTerm: string, customDelay?: number) => {
    const currentDelay = customDelay !== undefined ? customDelay : delay
    const startTime = new Date().toLocaleTimeString()
    
    // Set loading indicator
    setLoading(true)

    // 1. Handle cancellation of previous request
    if (mode === 'cancellation' && abortControllerRef.current) {
      const prevTerm = activeQueryRef.current
      abortControllerRef.current.abort()
      addLog({
        time: startTime,
        query: prevTerm,
        type: 'cancel',
        message: `Chủ động hủy request tìm kiếm trước đó cho từ khóa: "${prevTerm}"`
      })
    }

    // 2. Create new AbortController and store reference
    const controller = new AbortController()
    if (mode === 'cancellation') {
      abortControllerRef.current = controller
      activeQueryRef.current = searchTerm
    }

    addLog({
      time: startTime,
      query: searchTerm,
      type: 'trigger',
      message: `Bắt đầu API Call: Tìm "${searchTerm}" (Giả lập delay: ${currentDelay}s)`
    })

    try {
      const url = `https://httpbin.org/delay/${currentDelay}?q=${encodeURIComponent(searchTerm)}`
      
      const res = await axios.get(url, {
        signal: mode === 'cancellation' ? controller.signal : undefined
      })

      // Successfully resolved
      // Parse query back from httpbin response config URL
      const resolvedUrl = res.config.url || url
      const urlObj = new URL(resolvedUrl)
      const resolvedQuery = urlObj.searchParams.get('q') || searchTerm

      // Filter local mock data to simulate search
      const filtered = MOCK_DATA.filter((item) =>
        item.title.toLowerCase().includes(resolvedQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(resolvedQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(resolvedQuery.toLowerCase())
      )

      // Only update UI if we are either in race-condition mode (where anyone overwrites)
      // OR in cancellation mode and this controller is the most recent active request.
      if (mode === 'race-condition' || (mode === 'cancellation' && abortControllerRef.current === controller)) {
        setResults(filtered)
        setLoading(false)
      }

      addLog({
        time: new Date().toLocaleTimeString(),
        query: resolvedQuery,
        type: 'success',
        message: `Nhận phản hồi từ Server cho "${resolvedQuery}": Có ${filtered.length} kết quả.`
      })

      if (mode === 'cancellation' && abortControllerRef.current === controller) {
        abortControllerRef.current = null
      }
    } catch (err: unknown) {
      const endTime = new Date().toLocaleTimeString()
      
      if (axios.isCancel(err)) {
        // Triggered by controller.abort()
        addLog({
          time: endTime,
          query: searchTerm,
          type: 'abort_success',
          message: `✓ Đã chặn đứng thành công request tìm kiếm "${searchTerm}" ở tầng trình duyệt.`
        })
      } else {
        const error = err as Error
        addLog({
          time: endTime,
          query: searchTerm,
          type: 'error',
          message: `Lỗi API Call: ${error.message}`
        })
        setLoading(false)
      }
    }
  }

  // Trigger search on input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setQuery(val)
    
    if (val.trim() === '') {
      setResults([])
      setLoading(false)
      return
    }

    performSearch(val)
  }

  // Simulate fast typing to demonstrate race conditions or cancellation
  const simulateFastTyping = async () => {
    if (isSimulating) return
    setIsSimulating(true)
    clearLogs()
    setQuery('')
    setResults([])

    addLog({
      time: new Date().toLocaleTimeString(),
      query: '-',
      type: 'trigger',
      message: `🚀 Bắt đầu giả lập gõ siêu nhanh: Người dùng gõ "React" -> "Vue" trong 300ms.`
    })

    // Step 1: User types "React" (slow API response: 3.5 seconds delay)
    setQuery('React')
    performSearch('React', 3.5)

    // Wait 300ms to simulate typing speed
    await new Promise((resolve) => setTimeout(resolve, 300))

    // Step 2: User clears and types "Vue" (fast API response: 1 second delay)
    setQuery('Vue')
    performSearch('Vue', 1)

    setIsSimulating(false)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-12">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent font-outfit">
                Live Search Cancellation Panel
              </h1>
              <p className="text-xs text-slate-400">Bài tập 9: Tối ưu hiệu suất & Chặn đứng Race Condition bằng AbortController</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('demo')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold font-outfit transition-all ${
                activeTab === 'demo'
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/25'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              💻 Trình Giả Lập Live Search
            </button>
            <button
              onClick={() => setActiveTab('theory')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold font-outfit transition-all ${
                activeTab === 'theory'
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/25'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              📚 Lý Thuyết & Code mẫu
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 mt-8">
        {activeTab === 'demo' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Control Panel & Search Box */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              
              {/* Configuration Card */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/5 rounded-full blur-2xl pointer-events-none"></div>
                <h2 className="text-base font-bold mb-4 flex items-center gap-2 text-slate-200 font-outfit uppercase tracking-wider">
                  ⚙️ Cấu Hình Chế Độ Tìm Kiếm
                </h2>

                <div className="space-y-5">
                  {/* Select Mode */}
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-2">CHẾ ĐỘ XỬ LÝ YÊU CẦU</label>
                    <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
                      <button
                        onClick={() => { setMode('cancellation'); setQuery(''); setResults([]); }}
                        className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                          mode === 'cancellation'
                            ? 'bg-violet-600 text-white font-medium'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        🛡️ Hủy Request
                      </button>
                      <button
                        onClick={() => { setMode('race-condition'); setQuery(''); setResults([]); }}
                        className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                          mode === 'race-condition'
                            ? 'bg-amber-600 text-white font-medium'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        ⚠️ Race Condition
                      </button>
                    </div>
                  </div>

                  {/* Delay Slider */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-bold text-slate-400">ĐỘ TRỄ MẠNG GIẢ LẬP: <span className="text-violet-400 font-bold">{delay}s</span></label>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={delay}
                      onChange={(e) => setDelay(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-850 rounded-lg appearance-none cursor-pointer accent-violet-500"
                    />
                  </div>

                  {/* Quick Simulate Trigger */}
                  <div className="pt-2">
                    <button
                      disabled={isSimulating}
                      onClick={simulateFastTyping}
                      className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 disabled:opacity-50 text-white rounded-xl py-2.5 font-semibold text-xs transition-all shadow-lg shadow-violet-500/15 uppercase tracking-wider"
                    >
                      🔥 Chạy Giả Lập Gõ Siêu Nhanh (React → Vue)
                    </button>
                    <p className="text-[10px] text-slate-500 mt-1.5 leading-relaxed">
                      💡 Giả lập gõ từ khóa <span className="text-blue-400">"React"</span> (API chờ 3.5s) rồi đổi ngay sang <span className="text-teal-400">"Vue"</span> (API chờ 1s). Xem kết quả trả về bị sai lệch ở chế độ <strong>Race Condition</strong> so với tính đúng đắn khi <strong>Hủy Request</strong>.
                    </p>
                  </div>
                </div>
              </div>

              {/* Live Search Card */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                <h2 className="text-base font-bold mb-3 flex items-center gap-2 text-slate-200 font-outfit uppercase tracking-wider">
                  🔍 Hộp Tìm Kiếm Live Search
                </h2>

                <div className="relative">
                  <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-10 py-3 text-sm text-slate-100 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 transition-all font-outfit"
                    placeholder="Gõ từ khóa tìm kiếm (Ví dụ: React, Vue, TS, CSS...)"
                  />
                  <div className="absolute left-3.5 top-3.5 text-slate-500">
                    {loading ? (
                      <div className="w-4 h-4 border-2 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    )}
                  </div>
                  {query && (
                    <button
                      onClick={() => { setQuery(''); setResults([]); }}
                      className="absolute right-3.5 top-3 text-slate-500 hover:text-slate-300 text-xs font-semibold"
                    >
                      Xóa
                    </button>
                  )}
                </div>

                <div className="mt-4 flex items-center justify-between text-[11px] text-slate-500 bg-slate-950/60 p-2.5 rounded-lg border border-slate-850">
                  <span>Trạng thái: <strong className={loading ? 'text-amber-400' : 'text-emerald-400'}>{loading ? 'Đang gọi API...' : 'Sẵn sàng'}</strong></span>
                  <span>Chế độ: <strong className={mode === 'cancellation' ? 'text-violet-400 animate-pulse' : 'text-amber-500'}>{mode === 'cancellation' ? 'Có Hủy Request (🛡️)' : 'Race Condition (⚠️)'}</strong></span>
                </div>
              </div>

              {/* Logs Console */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex-1 flex flex-col min-h-[300px]">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-outfit">Console log API & Hủy bỏ (Realtime)</h2>
                  {logs.length > 0 && (
                    <button
                      onClick={clearLogs}
                      className="text-[10px] text-slate-500 hover:text-rose-400 font-semibold"
                    >
                      Clear Log
                    </button>
                  )}
                </div>

                <div className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-[11px] overflow-y-auto max-h-[350px] space-y-3">
                  {logs.length === 0 ? (
                    <div className="text-slate-650 h-full flex items-center justify-center text-center py-12">
                      Nhật ký trống. Hãy gõ ký tự vào ô tìm kiếm hoặc chạy nút giả lập để ghi nhận hành vi API.
                    </div>
                  ) : (
                    logs.map((log, idx) => (
                      <div key={idx} className="border-b border-slate-900 pb-2.5 last:border-b-0 last:pb-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className={`px-1.5 py-0.2 rounded text-[8px] font-bold ${
                            log.type === 'trigger' ? 'bg-blue-500/10 text-blue-400' :
                            log.type === 'cancel' ? 'bg-amber-500/10 text-amber-400' :
                            log.type === 'abort_success' ? 'bg-red-500/10 text-red-400' :
                            log.type === 'success' ? 'bg-emerald-500/10 text-emerald-400' :
                            'bg-rose-500/10 text-rose-400'
                          }`}>
                            {log.type.toUpperCase()}
                          </span>
                          <span className="text-slate-600 text-[9px]">{log.time}</span>
                        </div>
                        <div className="text-slate-300 text-xs pl-1.5 leading-relaxed">
                          {log.message}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>

            {/* Right Column: Search Results */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              
              {/* Live Search Results Card */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex-1 flex flex-col">
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-800">
                  <h2 className="text-base font-bold text-slate-200 font-outfit uppercase tracking-wider flex items-center gap-2">
                    📊 Kết Quả Tìm Kiếm Hiển Thị Trên UI
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-850 text-slate-400 text-xs border border-slate-800">
                    Tìm thấy: {results.length} bài viết
                  </span>
                </div>

                {/* Results Listing */}
                <div className="flex-1 space-y-4 overflow-y-auto max-h-[600px] pr-1.5">
                  {results.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center py-20">
                      <div className="w-12 h-12 rounded-full bg-slate-950 flex items-center justify-center border border-slate-800 text-slate-600 mb-3">
                        📭
                      </div>
                      <p className="text-sm font-semibold text-slate-400">Không có kết quả nào hiển thị</p>
                      <p className="text-xs text-slate-500 mt-1 max-w-sm">
                        {query ? `Không tìm thấy tài liệu phù hợp với từ khóa "${query}"` : 'Vui lòng nhập từ khóa tìm kiếm để truy xuất dữ liệu.'}
                      </p>
                    </div>
                  ) : (
                    results.map((item) => (
                      <div
                        key={item.id}
                        className="bg-slate-950 border border-slate-850 hover:border-violet-500/30 rounded-xl p-4 transition-all hover:translate-x-1"
                      >
                        <div className="flex justify-between items-start gap-2 mb-1.5">
                          <h3 className="font-bold text-slate-200 font-outfit text-sm hover:text-violet-400 transition-colors">
                            {item.title}
                          </h3>
                          <span className="text-[10px] uppercase font-bold text-violet-400 px-2 py-0.5 rounded bg-violet-500/10 border border-violet-500/20">
                            {item.category}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed mb-3">
                          {item.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {item.tags.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="text-[9px] bg-slate-900 border border-slate-800 text-slate-450 px-2 py-0.5 rounded-lg"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Explanation Card bottom */}
                <div className="mt-6 p-4 bg-slate-950/80 border border-slate-850 rounded-xl space-y-2 text-xs text-slate-400">
                  <span className="font-bold text-slate-300 block">⚠️ PHÂN TÍCH RÌNH RẬP RƠI VÀO BẪY RĂC GIAO DIỆN (RACE CONDITION):</span>
                  <p className="leading-relaxed">
                    Nếu bạn đang ở chế độ <strong>Race Condition</strong> và chạy nút giả lập gõ nhanh, request tìm kiếm cho <span className="text-blue-400">"React"</span> sẽ chạy rất chậm (3.5 giây). Trình duyệt gửi request cho <span className="text-teal-400">"Vue"</span> ngay sau đó nhưng hoàn tất chỉ sau 1 giây.
                  </p>
                  <p className="leading-relaxed">
                    Kết quả của <span className="text-teal-400">"Vue"</span> được hiển thị lên UI ở giây thứ 1.3. Nhưng ở giây thứ 3.5, request của <span className="text-blue-400">"React"</span> cũ quay về và ghi đè toàn bộ kết quả lên UI. Lúc này, ô tìm kiếm hiển thị <span className="text-teal-400">"Vue"</span> nhưng bài viết hiển thị lại là <span className="text-blue-400">"React"</span>. 
                  </p>
                  <p className="leading-relaxed">
                    Bằng cách chuyển sang chế độ <strong>Hủy Request</strong>, khi từ khóa đổi sang <span className="text-teal-400">"Vue"</span>, yêu cầu <span className="text-blue-400">"React"</span> đang bay lập tức bị **hủy bỏ**, giúp dữ liệu trên màn hình luôn đồng bộ và chính xác.
                  </p>
                </div>
              </div>

            </div>

          </div>
        ) : (
          /* Theory & Code Tab */
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div>
              <h2 className="text-lg font-bold mb-2 text-slate-200 font-outfit">
                Lý thuyết: AbortController & axios.isCancel()
              </h2>
              <p className="text-xs text-slate-400">
                Hiểu bản chất của Race Condition và cách ngăn chặn rò rỉ bộ nhớ, bảo toàn tài nguyên băng thông hệ thống.
              </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Cancellation explanation */}
              <div className="bg-slate-950 border border-slate-850 p-5 rounded-xl space-y-3 text-xs leading-relaxed text-slate-450">
                <h3 className="font-bold text-slate-200 text-sm border-b border-slate-900 pb-2 flex items-center gap-2">
                  🛡️ Cơ Chế Hoạt Động Của Hủy Request
                </h3>
                <p>
                  Khi một yêu cầu tìm kiếm được gửi đi, nó tạo ra một luồng HTTP kết nối bất đồng bộ. Nếu người dùng tiếp tục thao tác gõ phím nhanh, các yêu cầu mới sẽ liên tục chồng chéo lên nhau.
                </p>
                <p>
                  Sử dụng <strong>AbortController</strong> (một Web API mặc định có sẵn của trình duyệt):
                </p>
                <ul className="list-disc pl-4 space-y-1.5 text-slate-400">
                  <li>Tạo một instance: <code>const controller = new AbortController()</code>.</li>
                  <li>Đính kèm signal vào Axios: <code>axios.get(url, &#123; signal: controller.signal &#125;)</code>.</li>
                  <li>Khi cần hủy, gọi: <code>controller.abort()</code>. Trình duyệt lập tức ngắt kết nối HTTP đó ở tầng mạng.</li>
                </ul>
                <p>
                  Hành vi này giúp giảm thiểu đáng kể băng thông tải máy chủ (Server không tốn thời gian xử lý yêu cầu dư thừa) và giải quyết triệt để lỗi **Race Condition**.
                </p>
              </div>

              {/* isCancel explanation */}
              <div className="bg-slate-950 border border-slate-850 p-5 rounded-xl space-y-3 text-xs leading-relaxed text-slate-450">
                <h3 className="font-bold text-slate-200 text-sm border-b border-slate-900 pb-2 flex items-center gap-2">
                  ⚠️ Tránh Bẫy Rác Dữ Liệu (axios.isCancel)
                </h3>
                <p>
                  Khi một request bị hủy thông qua <code>controller.abort()</code>, Axios sẽ bắt được sự kiện ngắt kết nối và tự động ném ra một lỗi đặc biệt trong khối <code>catch</code>.
                </p>
                <p>
                  Nếu không lọc, hệ thống sẽ nhầm tưởng đây là lỗi sập mạng thông thường và ghi đè log lỗi ra console hoặc hiển thị thông báo "Yêu cầu thất bại" đến người dùng, làm ô nhiễm log ứng dụng.
                </p>
                <p>
                  <strong>Giải pháp:</strong>
                </p>
                <ul className="list-disc pl-4 space-y-1.5 text-slate-400">
                  <li>Sử dụng hàm kiểm tra <code>axios.isCancel(error)</code>.</li>
                  <li>Nếu kết quả là <code>true</code>, đây là lỗi hủy request chủ động từ phía người dùng ➔ Bỏ qua hoặc log nhẹ nhàng, không báo lỗi mạng.</li>
                  <li>Nếu là <code>false</code>, đây mới thực sự là lỗi mạng hoặc lỗi API ➔ Tiến hành xử lý lỗi.</li>
                </ul>
              </div>

            </div>

            {/* Code Block Comparison */}
            <div className="space-y-4">
              <h3 className="font-bold text-slate-200 text-sm font-outfit uppercase">So Sánh Code Triển Khai</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                
                {/* Code with cancellation */}
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-emerald-400">✅ Có hủy Request (Dự án hiện tại)</span>
                  <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl font-mono text-[10px] overflow-x-auto text-slate-355 whitespace-pre">
{`const abortControllerRef = useRef<AbortController | null>(null);

const handleSearch = async (searchTerm) => {
  // Hủy request cũ đang bay nếu có
  if (abortControllerRef.current) {
    abortControllerRef.current.abort();
  }

  // Khởi tạo controller mới
  const controller = new AbortController();
  abortControllerRef.current = controller;

  try {
    const res = await axios.get('/search?q=' + searchTerm, {
      signal: controller.signal // Truyền signal
    });
    setResults(res.data);
  } catch (err) {
    if (axios.isCancel(err)) {
      console.log('Request cũ đã hủy thành công');
    } else {
      console.error('Lỗi API thật:', err.message);
    }
  }
};`}
                  </div>
                </div>

                {/* Code without cancellation */}
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-rose-400">❌ Không hủy Request (Gây Race Condition)</span>
                  <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl font-mono text-[10px] overflow-x-auto text-slate-355 whitespace-pre">
{`// Không lưu trữ reference của request trước

const handleSearch = async (searchTerm) => {
  try {
    // Luôn gửi đi và chờ phản hồi vô điều kiện
    const res = await axios.get('/search?q=' + searchTerm);
    
    // Nếu request cũ về chậm hơn request mới,
    // dữ liệu kết quả cũ sẽ đè lên kết quả mới
    setResults(res.data);
  } catch (err) {
    console.error('Lỗi API:', err.message);
  }
};`}
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-slate-800 text-center text-xs text-slate-500 font-inter">
        Rikkei Education • Module 3 • Session 5 • Bài tập 9 (Xuất sắc) - Request Cancellation
      </footer>
    </div>
  )
}
