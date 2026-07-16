import { useState, useEffect, useCallback } from 'react'
import axios, { AxiosError } from 'axios'

// Define the structure of a Contact
interface Contact {
  id: string
  name: string
  phone: string
}

// System log entry structure
interface LogEntry {
  timestamp: string
  type: 'info' | 'success' | 'error'
  message: string
}

const API_URL = 'http://localhost:3004/contacts'

export default function App() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  
  // UI States
  const [isLoading, setIsLoading] = useState(false)
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null)
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [errorFeedback, setErrorFeedback] = useState<string | null>(null)
  const [successFeedback, setSuccessFeedback] = useState<string | null>(null)

  // Validation States
  const [validationErrors, setValidationErrors] = useState<{ name?: string; phone?: string }>({})

  // Helper to add system logs
  const addLog = useCallback((type: 'info' | 'success' | 'error', message: string) => {
    const time = new Date().toLocaleTimeString()
    setLogs(prev => [{ timestamp: time, type, message }, ...prev])
  }, [])

  // Clear feedbacks helper
  const clearFeedbacks = useCallback(() => {
    setErrorFeedback(null)
    setSuccessFeedback(null)
  }, [])

  // GET: Fetch all contacts from Mock Server
  const fetchContacts = useCallback(async (showLog = true) => {
    setIsLoading(true)
    clearFeedbacks()
    if (showLog) addLog('info', 'Đang tải danh sách danh bạ...')
    try {
      const response = await axios.get<Contact[]>(API_URL)
      setContacts(response.data)
      setIsLoading(false)
      if (showLog) addLog('success', `Tải thành công ${response.data.length} liên hệ.`)
    } catch (err) {
      setIsLoading(false)
      const errorMsg = err instanceof Error ? err.message : 'Lỗi không xác định'
      setErrorFeedback(`Không thể kết nối tới server. Vui lòng đảm bảo json-server đang chạy ở cổng 3004.`)
      addLog('error', `Thất bại khi lấy danh sách: ${errorMsg}`)
    }
  }, [clearFeedbacks, addLog])

  // Run on component mount
  useEffect(() => {
    let active = true
    const load = async () => {
      // Yield control back to the event loop so the fetch and its immediate setState
      // calls run asynchronously, avoiding cascading renders on mount
      await Promise.resolve()
      if (active) {
        fetchContacts()
      }
    }
    load()
    return () => {
      active = false
    }
  }, [fetchContacts])

  // Input Validation
  const validateForm = (): boolean => {
    const errors: { name?: string; phone?: string } = {}
    
    if (!name.trim()) {
      errors.name = 'Tên liên hệ không được để trống.'
    } else if (name.trim().length < 2) {
      errors.name = 'Tên phải chứa ít nhất 2 ký tự.'
    }

    // Vietnamese Phone Number regex: 10 digits starting with 03, 05, 07, 08, 09
    const phoneRegex = /^(03|05|07|08|09)\d{8}$/
    if (!phone.trim()) {
      errors.phone = 'Số điện thoại không được để trống.'
    } else if (!phoneRegex.test(phone.trim())) {
      errors.phone = 'Số điện thoại không hợp lệ (Phải có 10 chữ số và bắt đầu bằng 03/05/07/08/09).'
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  // POST: Add new contact
  const handleAddContact = async (e: React.FormEvent) => {
    e.preventDefault()
    clearFeedbacks()

    if (!validateForm()) {
      addLog('error', 'Biểu mẫu chứa dữ liệu không hợp lệ. Vui lòng kiểm tra lại.')
      return
    }

    setActionLoadingId('add')
    addLog('info', `Đang thêm liên hệ mới: "${name}"...`)
    
    try {
      const response = await axios.post<Contact>(API_URL, {
        name: name.trim(),
        phone: phone.trim()
      })
      
      setContacts(prev => [...prev, response.data])
      setSuccessFeedback(`Đã thêm "${response.data.name}" vào danh bạ thành công!`)
      addLog('success', `Thêm thành công liên hệ ID ${response.data.id}: "${response.data.name}".`)
      
      // Reset inputs
      setName('')
      setPhone('')
      setValidationErrors({})
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Lỗi không xác định'
      setErrorFeedback('Lỗi khi thêm liên hệ mới vào server.')
      addLog('error', `Thất bại khi thêm liên hệ: ${errorMsg}`)
    } finally {
      setActionLoadingId(null)
    }
  }

  // DELETE: Delete contact by ID
  const handleDeleteContact = async (id: string, contactName: string) => {
    clearFeedbacks()
    setActionLoadingId(id)
    addLog('info', `Đang gửi yêu cầu xóa liên hệ "${contactName}" (ID: ${id})...`)

    try {
      await axios.delete(`${API_URL}/${id}`)
      setContacts(prev => prev.filter(c => c.id !== id))
      setSuccessFeedback(`Đã xóa liên hệ "${contactName}" thành công.`)
      addLog('success', `Xóa thành công liên hệ "${contactName}" (ID: ${id}).`)
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Lỗi không xác định'
      setErrorFeedback(`Lỗi khi xóa liên hệ "${contactName}".`)
      addLog('error', `Thất bại khi xóa liên hệ ID ${id}: ${errorMsg}`)
    } finally {
      setActionLoadingId(null)
    }
  }

  // ERROR TRAP: DELETE a non-existent ID (Catching 404 error)
  const handleTriggerErrorTrap = async () => {
    clearFeedbacks()
    const fakeId = '99999'
    setActionLoadingId('trap')
    addLog('info', `Đang thử nghiệm xóa một ID không tồn tại (ID: ${fakeId})...`)

    try {
      // Sending request that is guaranteed to fail with 404 Not Found
      await axios.delete(`${API_URL}/${fakeId}`)
      
      // If by any chance it succeeds (which it shouldn't)
      addLog('success', `Lạ lùng! Xóa thành công ID không tồn tại ${fakeId}.`)
    } catch (err) {
      // Check if it is an Axios error
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError
        const statusCode = axiosError.response?.status
        const statusText = axiosError.response?.statusText || 'Not Found'
        
        const message = `Bắt được lỗi ${statusCode} (${statusText}) từ mock server! Chi tiết: Yêu cầu DELETE tới ID không tồn tại thất bại.`
        setErrorFeedback(`[Bẫy Dữ Liệu 404] Bắt thành công lỗi ${statusCode} ${statusText} từ server!`)
        addLog('error', message)
      } else {
        const generalErrorMsg = err instanceof Error ? err.message : 'Lỗi không xác định'
        setErrorFeedback(`Đã xảy ra lỗi khác: ${generalErrorMsg}`)
        addLog('error', `Lỗi không xác định: ${generalErrorMsg}`)
      }
    } finally {
      setActionLoadingId(null)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-6 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/60 backdrop-blur-md p-6 rounded-2xl border border-slate-800/80">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              Axios & Mock Server Integration
            </div>
            <h1 className="text-3xl font-extrabold font-outfit bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Contacts Management Portal
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              Thực hiện thao tác CRUD (GET, POST, DELETE) danh bạ kết nối máy chủ Mock Server `json-server` tại cổng `3004`.
            </p>
          </div>
          
          <button
            onClick={() => fetchContacts(true)}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-medium text-sm transition-all border border-slate-700 hover:border-slate-600 disabled:opacity-55 cursor-pointer"
          >
            <i className={`fa-solid fa-arrows-rotate ${isLoading ? 'animate-spin' : ''}`}></i>
            Làm mới
          </button>
        </div>

        {/* Global Feedback Banner */}
        {successFeedback && (
          <div className="p-4 bg-emerald-950/30 border border-emerald-500/30 rounded-xl flex items-center justify-between text-emerald-400 text-sm animate-fade-in">
            <div className="flex items-center gap-3">
              <i className="fa-solid fa-circle-check text-lg"></i>
              <span>{successFeedback}</span>
            </div>
            <button onClick={clearFeedbacks} className="text-emerald-500 hover:text-emerald-350 cursor-pointer">
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        )}

        {errorFeedback && (
          <div className="p-4 bg-rose-950/30 border border-rose-500/30 rounded-xl flex items-center justify-between text-rose-400 text-sm animate-fade-in">
            <div className="flex items-center gap-3">
              <i className="fa-solid fa-triangle-exclamation text-lg animate-bounce"></i>
              <span>{errorFeedback}</span>
            </div>
            <button onClick={clearFeedbacks} className="text-rose-500 hover:text-rose-350 cursor-pointer">
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        )}

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Panel: Form & Actions (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Create Contact Form */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
              <h2 className="text-lg font-bold font-outfit flex items-center gap-2">
                <i className="fa-solid fa-user-plus text-blue-400"></i>
                Thêm Liên Hệ Mới
              </h2>
              
              <form onSubmit={handleAddContact} className="space-y-4">
                {/* Contact Name Input */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Họ và Tên</label>
                  <div className="relative">
                    <i className="fa-solid fa-user absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm"></i>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ví dụ: Nguyễn Văn A"
                      className={`w-full bg-slate-950 border focus:outline-none py-3 pl-11 pr-4 rounded-xl text-sm transition-all ${
                        validationErrors.name
                          ? 'border-rose-500/50 focus:border-rose-500'
                          : 'border-slate-850 hover:border-slate-750 focus:border-blue-500'
                      }`}
                    />
                  </div>
                  {validationErrors.name && (
                    <span className="text-xs text-rose-400 font-medium flex items-center gap-1.5 mt-1">
                      <i className="fa-solid fa-circle-exclamation text-[10px]"></i>
                      {validationErrors.name}
                    </span>
                  )}
                </div>

                {/* Contact Phone Input */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Số Điện Thoại</label>
                  <div className="relative">
                    <i className="fa-solid fa-phone absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm"></i>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Ví dụ: 0987654321"
                      className={`w-full bg-slate-950 border focus:outline-none py-3 pl-11 pr-4 rounded-xl text-sm transition-all ${
                        validationErrors.phone
                          ? 'border-rose-500/50 focus:border-rose-500'
                          : 'border-slate-850 hover:border-slate-750 focus:border-blue-500'
                      }`}
                    />
                  </div>
                  {validationErrors.phone && (
                    <span className="text-xs text-rose-400 font-medium flex items-center gap-1.5 mt-1">
                      <i className="fa-solid fa-circle-exclamation text-[10px]"></i>
                      {validationErrors.phone}
                    </span>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={actionLoadingId === 'add'}
                  className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 text-white rounded-xl text-sm font-bold shadow-lg hover:shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {actionLoadingId === 'add' ? (
                    <>
                      <i className="fa-solid fa-circle-notch animate-spin"></i>
                      Đang xử lý...
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-plus"></i>
                      Thêm Vào Danh Bạ
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Error Trap Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h2 className="text-lg font-bold font-outfit flex items-center gap-2 text-rose-400">
                <i className="fa-solid fa-bug"></i>
                Bẫy Thử Nghiệm Lỗi
              </h2>
              <p className="text-slate-400 text-xs leading-relaxed">
                Nút bên dưới sẽ gửi yêu cầu <code>DELETE</code> tới máy chủ Mock Server với một ID giả lập <strong>99999</strong> để kiểm tra xem hệ thống có bắt lỗi <code>404 Not Found</code> và ghi log đúng như yêu cầu hay không.
              </p>
              <button
                onClick={handleTriggerErrorTrap}
                disabled={actionLoadingId === 'trap'}
                className="w-full py-3 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {actionLoadingId === 'trap' ? (
                  <>
                    <i className="fa-solid fa-circle-notch animate-spin text-rose-400"></i>
                    Đang gửi yêu cầu...
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-triangle-exclamation"></i>
                    Kích Hoạt Bẫy Lỗi (DELETE ID 99999)
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Right Panel: Contacts List & Live Logs (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Contacts list */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold font-outfit flex items-center gap-2">
                  <i className="fa-solid fa-address-book text-indigo-400"></i>
                  Danh Sách Danh Bạ
                </h2>
                <span className="text-xs px-2.5 py-1 bg-slate-800 border border-slate-700 rounded-full text-slate-400 font-mono">
                  {contacts.length} liên hệ
                </span>
              </div>

              {isLoading ? (
                /* Shimmer loading list skeleton */
                <div className="space-y-3">
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="flex items-center justify-between p-4 bg-slate-950/40 border border-slate-850 rounded-xl animate-pulse">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-800 rounded-full"></div>
                        <div className="space-y-2">
                          <div className="h-4 w-32 bg-slate-800 rounded"></div>
                          <div className="h-3 w-20 bg-slate-800 rounded"></div>
                        </div>
                      </div>
                      <div className="h-8 w-16 bg-slate-800 rounded-lg"></div>
                    </div>
                  ))}
                </div>
              ) : contacts.length === 0 ? (
                /* Empty state */
                <div className="text-center py-12 bg-slate-950/40 border border-dashed border-slate-800 rounded-xl space-y-3">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-900 border border-slate-850 text-slate-500">
                    <i className="fa-solid fa-users-slash text-xl"></i>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-slate-350">Không có liên hệ nào</p>
                    <p className="text-xs text-slate-500">Thêm liên hệ mới ở bảng bên trái hoặc kiểm tra server.</p>
                  </div>
                </div>
              ) : (
                /* Contacts grid/list */
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1 scrollbar-thin">
                  {contacts.map((contact) => (
                    <div
                      key={contact.id}
                      className="flex items-center justify-between p-4 bg-slate-950/70 border border-slate-850 hover:border-slate-750 rounded-xl transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/35 flex items-center justify-center text-indigo-300 font-bold uppercase text-sm">
                          {contact.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm text-slate-200 group-hover:text-white transition-all">
                            {contact.name}
                          </h3>
                          <p className="text-xs text-slate-400 font-mono mt-0.5 flex items-center gap-1.5">
                            <i className="fa-solid fa-phone text-[10px] text-slate-500"></i>
                            {contact.phone}
                          </p>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => handleDeleteContact(contact.id, contact.name)}
                        disabled={actionLoadingId === contact.id}
                        className="px-3 py-1.5 text-xs font-semibold text-rose-450 hover:text-white bg-rose-500/10 hover:bg-rose-600 rounded-lg border border-rose-500/20 hover:border-rose-650 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-55"
                      >
                        {actionLoadingId === contact.id ? (
                          <>
                            <i className="fa-solid fa-circle-notch animate-spin"></i>
                            Đang xóa...
                          </>
                        ) : (
                          <>
                            <i className="fa-solid fa-trash text-[10px]"></i>
                            Xóa
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* HTTP Request Logs & Console */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3.5">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <h2 className="text-sm font-bold font-outfit flex items-center gap-2 text-slate-300">
                  <i className="fa-solid fa-terminal text-slate-450"></i>
                  Lịch Sử Các Yêu Cầu HTTP
                </h2>
                <button
                  onClick={() => setLogs([])}
                  className="text-xs text-slate-500 hover:text-slate-300 transition-all cursor-pointer"
                >
                  Xóa log
                </button>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-855 h-[160px] overflow-y-auto font-mono text-xs space-y-2 pr-1 scrollbar-thin">
                {logs.length === 0 ? (
                  <p className="text-slate-600 italic">Chưa có sự kiện nào được ghi nhận...</p>
                ) : (
                  logs.map((log, index) => (
                    <div key={index} className="flex gap-2.5 items-start leading-relaxed">
                      <span className="text-slate-600 shrink-0">[{log.timestamp}]</span>
                      <span
                        className={`font-semibold shrink-0 uppercase ${
                          log.type === 'success'
                            ? 'text-emerald-450'
                            : log.type === 'error'
                            ? 'text-rose-400'
                            : 'text-blue-400'
                        }`}
                      >
                        {log.type === 'success' ? '✓ SUCCESS' : log.type === 'error' ? '✗ ERROR' : 'ℹ INFO'}
                      </span>
                      <span className="text-slate-300">{log.message}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}
