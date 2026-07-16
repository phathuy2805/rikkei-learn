import { useState, useEffect } from 'react'
import axios, { AxiosError } from 'axios'

interface UserProfile {
  id: string
  fullName: string
  email: string
  phone: string
  role: string
  department: string
  address: string
  salary: string
  status: string
  avatarUrl: string
}

// System event logs
interface LogItem {
  time: string
  method: 'PUT' | 'PATCH' | 'GET'
  payload: string
  response: string
}

const API_URL = 'http://localhost:3004/users/1'

const INITIAL_USER: UserProfile = {
  id: "1",
  fullName: "Nguyễn Văn Trỗi",
  email: "troi.nguyen@company.com",
  phone: "0987654321",
  role: "Senior Developer",
  department: "Engineering",
  address: "123 Đường Láng, Hà Nội",
  salary: "35,000,000đ",
  status: "Active",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
}

export default function App() {
  // DB state fetched directly from mock server
  const [dbUser, setDbUser] = useState<Partial<UserProfile> | null>(null)
  
  // Form input states
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [role, setRole] = useState('')
  const [department, setDepartment] = useState('')
  const [address, setAddress] = useState('')
  const [salary, setSalary] = useState('')
  const [status, setStatus] = useState('Active')
  const [avatarUrl, setAvatarUrl] = useState('')

  // UI state
  const [isLoading, setIsLoading] = useState(false)
  const [currentLog, setCurrentLog] = useState<LogItem | null>(null)
  const [errorFeedback, setErrorFeedback] = useState<string | null>(null)
  const [successFeedback, setSuccessFeedback] = useState<string | null>(null)

  // Fetch the current user state in the database
  const fetchDbState = async (showLogs = false) => {
    setIsLoading(true)
    setErrorFeedback(null)
    try {
      const res = await axios.get<Partial<UserProfile>>(API_URL)
      setDbUser(res.data)
      
      // Update form values with fetched data (safeguarding missing properties)
      setFullName(res.data.fullName || '')
      setEmail(res.data.email || '')
      setPhone(res.data.phone || '')
      setRole(res.data.role || '')
      setDepartment(res.data.department || '')
      setAddress(res.data.address || '')
      setSalary(res.data.salary || '')
      setStatus(res.data.status || 'Active')
      setAvatarUrl(res.data.avatarUrl || '')

      if (showLogs) {
        setSuccessFeedback("Đã cập nhật trạng thái cơ sở dữ liệu mới nhất!")
        setCurrentLog({
          time: new Date().toLocaleTimeString(),
          method: 'GET',
          payload: 'None (URL parameter only)',
          response: JSON.stringify(res.data, null, 2)
        })
      }
    } catch (err) {
      setErrorFeedback("Không thể kết nối đến Mock Server. Hãy chạy lệnh 'npm run server' ở cổng 3004.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchDbState()
  }, [])

  // Action 1: PATCH - Partial Update (Updates ONLY modified fields)
  // Simulation: Employee A only wants to change the Phone Number.
  const handlePatchUpdate = async () => {
    if (!phone.trim()) {
      setErrorFeedback("Số điện thoại không được để trống khi chạy PATCH.")
      return
    }
    setErrorFeedback(null)
    setSuccessFeedback(null)
    setIsLoading(true)

    // Construct PATCH payload: ONLY send the changed field(s)
    const patchPayload = { phone: phone.trim() }

    try {
      const res = await axios.patch<Partial<UserProfile>>(API_URL, patchPayload)
      setCurrentLog({
        time: new Date().toLocaleTimeString(),
        method: 'PATCH',
        payload: JSON.stringify(patchPayload, null, 2),
        response: JSON.stringify(res.data, null, 2)
      })
      setSuccessFeedback("Gửi PATCH thành công! Chỉ cập nhật số điện thoại.")
      
      // Refetch current database state to prove other fields are safe
      await fetchDbState(false)
    } catch (err) {
      const axiosError = err as AxiosError
      setErrorFeedback(`Lỗi PATCH: ${axiosError.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  // Action 2: PUT - Full Replace (Sends ALL 10 fields to overwrite resource)
  // Simulation: Employee B wants to overwrite their entire profile.
  const handlePutUpdate = async () => {
    setErrorFeedback(null)
    setSuccessFeedback(null)
    setIsLoading(true)

    // Construct full PUT payload: Send all 10 properties
    const putPayload: UserProfile = {
      id: "1",
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      role: role.trim(),
      department: department.trim(),
      address: address.trim(),
      salary: salary.trim(),
      status: status,
      avatarUrl: avatarUrl.trim()
    }

    try {
      const res = await axios.put<Partial<UserProfile>>(API_URL, putPayload)
      setCurrentLog({
        time: new Date().toLocaleTimeString(),
        method: 'PUT',
        payload: JSON.stringify(putPayload, null, 2),
        response: JSON.stringify(res.data, null, 2)
      })
      setSuccessFeedback("Gửi PUT thành công! Đã ghi đè toàn bộ tài nguyên bằng 10 trường đầy đủ.")
      await fetchDbState(false)
    } catch (err) {
      const axiosError = err as AxiosError
      setErrorFeedback(`Lỗi PUT: ${axiosError.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  // Action 3: PUT TRAP - Send incomplete payload with PUT
  // Simulation: Employee A attempts to update phone number using PUT, but sends ONLY phone field.
  const handlePutTrapUpdate = async () => {
    setErrorFeedback(null)
    setSuccessFeedback(null)
    setIsLoading(true)

    // Overwrite payload with MISSING fields: only sending phone number
    const incompletePayload = {
      id: "1",
      phone: phone.trim()
    }

    try {
      const res = await axios.put<Partial<UserProfile>>(API_URL, incompletePayload)
      setCurrentLog({
        time: new Date().toLocaleTimeString(),
        method: 'PUT',
        payload: JSON.stringify(incompletePayload, null, 2),
        response: JSON.stringify(res.data, null, 2)
      })
      setErrorFeedback("[BẪY DỮ LIỆU] Bạn vừa gửi một yêu cầu PUT thiếu trường! Xem chi tiết trạng thái Database bên dưới.")
      await fetchDbState(false)
    } catch (err) {
      const axiosError = err as AxiosError
      setErrorFeedback(`Lỗi PUT Trap: ${axiosError.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  // Reset Database: Restores the mock database with the initial clean 10-field object
  const handleResetDatabase = async () => {
    setErrorFeedback(null)
    setSuccessFeedback(null)
    setIsLoading(true)
    try {
      const res = await axios.put<Partial<UserProfile>>(API_URL, INITIAL_USER)
      setCurrentLog({
        time: new Date().toLocaleTimeString(),
        method: 'PUT',
        payload: JSON.stringify(INITIAL_USER, null, 2),
        response: JSON.stringify(res.data, null, 2)
      })
      setSuccessFeedback("Đã khôi phục cơ sở dữ liệu ban đầu thành công!")
      await fetchDbState(false)
    } catch (err) {
      setErrorFeedback("Không thể khôi phục. Vui lòng kiểm tra lại server.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/60 backdrop-blur-md p-6 rounded-2xl border border-slate-800/80">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
              HTTP PUT vs HTTP PATCH Comparison Playground
            </div>
            <h1 className="text-3xl font-extrabold font-outfit bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
              PUT vs PATCH: Hành vi Ghi đè & Cập nhật một phần
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Phân tích tính chất Idempotency và cấu trúc payload khi thực hiện ghi đè toàn bộ tài nguyên (PUT) so với cập nhật một phần (PATCH) trên cơ sở dữ liệu thực tế.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleResetDatabase}
              disabled={isLoading}
              className="px-4 py-2.5 bg-indigo-650 hover:bg-indigo-600 text-white rounded-xl font-bold text-sm transition-all border border-indigo-500 cursor-pointer shadow-lg hover:shadow-indigo-500/15"
            >
              <i className="fa-solid fa-rotate-left mr-2"></i> Khôi phục dữ liệu gốc
            </button>
            <button
              onClick={() => fetchDbState(true)}
              disabled={isLoading}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-semibold text-sm transition-all border border-slate-700 cursor-pointer"
            >
              <i className="fa-solid fa-arrows-rotate mr-2"></i> Fetch DB
            </button>
          </div>
        </div>

        {/* Global Feedback Banner */}
        {successFeedback && (
          <div className="p-4 bg-emerald-950/30 border border-emerald-500/30 rounded-xl flex items-center justify-between text-emerald-400 text-sm animate-fade-in">
            <div className="flex items-center gap-3">
              <i className="fa-solid fa-circle-check text-lg"></i>
              <span>{successFeedback}</span>
            </div>
          </div>
        )}

        {errorFeedback && (
          <div className="p-4 bg-rose-950/30 border border-rose-500/30 rounded-xl flex items-center justify-between text-rose-400 text-sm animate-fade-in">
            <div className="flex items-center gap-3">
              <i className="fa-solid fa-triangle-exclamation text-lg animate-pulse"></i>
              <span>{errorFeedback}</span>
            </div>
          </div>
        )}

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form & Actions (5 columns) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Edit User Form */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
              <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
                <h2 className="text-base font-bold font-outfit flex items-center gap-2">
                  <i className="fa-solid fa-user-gear text-blue-400"></i>
                  Cấu Hình 10 Trường Hồ Sơ
                </h2>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-750">
                  ID: 1
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                {/* FullName */}
                <div className="flex flex-col gap-1.5 col-span-2">
                  <label className="text-slate-400 font-semibold uppercase tracking-wider">Họ và tên</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 hover:border-slate-750 focus:border-blue-500 focus:outline-none p-2.5 rounded-lg text-slate-200"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-400 font-semibold uppercase tracking-wider">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 hover:border-slate-750 focus:border-blue-500 focus:outline-none p-2.5 rounded-lg text-slate-200"
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-400 font-semibold uppercase tracking-wider text-amber-400">
                    Số điện thoại <span className="text-indigo-400 font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 hover:border-slate-750 focus:border-blue-500 focus:outline-none p-2.5 rounded-lg text-amber-200 font-bold font-mono"
                  />
                </div>

                {/* Role */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-400 font-semibold uppercase tracking-wider">Vai trò/Chức vụ</label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 hover:border-slate-750 focus:border-blue-500 focus:outline-none p-2.5 rounded-lg text-slate-200"
                  />
                </div>

                {/* Department */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-400 font-semibold uppercase tracking-wider">Phòng ban</label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 hover:border-slate-750 focus:border-blue-500 focus:outline-none p-2.5 rounded-lg text-slate-200"
                  />
                </div>

                {/* Address */}
                <div className="flex flex-col gap-1.5 col-span-2">
                  <label className="text-slate-400 font-semibold uppercase tracking-wider">Địa chỉ</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 hover:border-slate-750 focus:border-blue-500 focus:outline-none p-2.5 rounded-lg text-slate-200"
                  />
                </div>

                {/* Salary */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-400 font-semibold uppercase tracking-wider">Mức lương</label>
                  <input
                    type="text"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 hover:border-slate-750 focus:border-blue-500 focus:outline-none p-2.5 rounded-lg text-slate-200"
                  />
                </div>

                {/* Status */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-400 font-semibold uppercase tracking-wider">Trạng thái</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 hover:border-slate-750 focus:border-blue-500 focus:outline-none p-2.5 rounded-lg text-slate-200"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                {/* Avatar URL */}
                <div className="flex flex-col gap-1.5 col-span-2">
                  <label className="text-slate-400 font-semibold uppercase tracking-wider">Ảnh đại diện (Avatar URL)</label>
                  <input
                    type="text"
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 hover:border-slate-750 focus:border-blue-500 focus:outline-none p-2.5 rounded-lg text-slate-200 font-mono text-[10px]"
                  />
                </div>
              </div>
            </div>

            {/* HTTP Action Controller */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h2 className="text-base font-bold font-outfit flex items-center gap-2">
                <i className="fa-solid fa-gamepad text-indigo-400"></i>
                Bảng Điều Khiển Gửi Yêu Cầu HTTP
              </h2>
              
              <div className="space-y-3">
                {/* Method 1: PATCH */}
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-850 hover:border-indigo-500/30 transition-all space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs px-2 py-0.5 rounded font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">PATCH</span>
                    <span className="text-[10px] text-slate-500 font-medium">Chỉ sửa số điện thoại</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    Gửi payload tối giản chỉ chứa <code>{"{ phone }"}</code>. Các trường khác trong database được giữ nguyên hoàn chỉnh.
                  </p>
                  <button
                    onClick={handlePatchUpdate}
                    disabled={isLoading}
                    className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <i className="fa-solid fa-cloud-arrow-up"></i> Gửi PATCH (Chỉ sửa SĐT)
                  </button>
                </div>

                {/* Method 2: PUT (Correct) */}
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-850 hover:border-blue-500/30 transition-all space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs px-2 py-0.5 rounded font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">PUT (Đúng chuẩn)</span>
                    <span className="text-[10px] text-slate-500 font-medium">Ghi đè 10 trường đầy đủ</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    Gửi toàn bộ object chứa đầy đủ 10 trường thông tin lên máy chủ. Ghi đè hồ sơ nhân viên an toàn.
                  </p>
                  <button
                    onClick={handlePutUpdate}
                    disabled={isLoading}
                    className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <i className="fa-solid fa-arrows-spin"></i> Gửi PUT Toàn Bộ 10 Trường
                  </button>
                </div>

                {/* Method 3: PUT (Trap/Incomplete) */}
                <div className="p-3.5 bg-slate-950 rounded-xl border border-rose-500/20 hover:border-rose-500/40 transition-all space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs px-2 py-0.5 rounded font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">PUT (Bẫy Lỗi)</span>
                    <span className="text-[10px] text-rose-450 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping"></span>
                      MẤT DỮ LIỆU
                    </span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    Gửi lệnh <code>PUT</code> nhưng payload <strong>chỉ chứa duy nhất số điện thoại</strong>. Minh họa lỗi xóa mất 9 trường còn lại.
                  </p>
                  <button
                    onClick={handlePutTrapUpdate}
                    disabled={isLoading}
                    className="w-full py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 hover:border-rose-500/50 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <i className="fa-solid fa-triangle-exclamation"></i> Gửi PUT Thiếu Trường (Chạy Thử Nghiệm)
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Right Panel: Database Viewer & Logs (7 columns) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Live Database State Viewer */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <h2 className="text-base font-bold font-outfit flex items-center gap-2">
                  <i className="fa-solid fa-database text-amber-500"></i>
                  Trạng Thái Tài Nguyên Trong Database Thực Tế
                </h2>
                <span className="text-xs px-2 py-0.5 bg-slate-950 border border-slate-850 rounded font-mono text-slate-500">
                  GET /users/1
                </span>
              </div>

              {dbUser ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  
                  {/* Card Display */}
                  <div className="bg-slate-950 border border-slate-850 p-5 rounded-2xl relative overflow-hidden space-y-4 shadow-inner">
                    {/* Background glow decorator */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full filter blur-xl"></div>
                    
                    <div className="flex items-center gap-4">
                      {/* Avatar checks with fallback */}
                      {dbUser.avatarUrl ? (
                        <img
                          src={dbUser.avatarUrl}
                          alt="Avatar"
                          className="w-16 h-16 rounded-2xl object-cover border border-slate-700 bg-slate-900"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-2xl border border-dashed border-rose-500/40 bg-rose-500/5 flex items-center justify-center text-rose-400">
                          <i className="fa-solid fa-image-portrait text-xl"></i>
                        </div>
                      )}

                      <div className="space-y-1">
                        {dbUser.fullName ? (
                          <h3 className="font-extrabold text-base text-slate-100">{dbUser.fullName}</h3>
                        ) : (
                          <h3 className="font-bold text-sm text-rose-400 italic">fullName bị xoá (null)</h3>
                        )}
                        
                        {dbUser.role ? (
                          <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/15">
                            {dbUser.role}
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-rose-500/10 text-rose-450 border border-rose-500/15">
                            MẤT ROLE
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="border-t border-slate-900 pt-3.5 space-y-2 text-xs font-mono">
                      {/* Grid listing fields for visualization */}
                      <div className="flex justify-between">
                        <span className="text-slate-500">Phòng ban:</span>
                        {dbUser.department ? (
                          <span className="text-slate-300 font-bold">{dbUser.department}</span>
                        ) : (
                          <span className="text-rose-400 font-bold italic">Bị xóa (null)</span>
                        )}
                      </div>

                      <div className="flex justify-between">
                        <span className="text-slate-500">Mức lương:</span>
                        {dbUser.salary ? (
                          <span className="text-slate-300">{dbUser.salary}</span>
                        ) : (
                          <span className="text-rose-400 font-bold italic">Bị xóa (null)</span>
                        )}
                      </div>

                      <div className="flex justify-between">
                        <span className="text-slate-500 text-amber-400">Số Điện Thoại:</span>
                        {dbUser.phone ? (
                          <span className="text-amber-300 font-bold">{dbUser.phone}</span>
                        ) : (
                          <span className="text-rose-400 font-bold italic">Bị xóa (null)</span>
                        )}
                      </div>

                      <div className="flex justify-between">
                        <span className="text-slate-500">Email liên hệ:</span>
                        {dbUser.email ? (
                          <span className="text-slate-300">{dbUser.email}</span>
                        ) : (
                          <span className="text-rose-400 font-bold italic">Bị xóa (null)</span>
                        )}
                      </div>

                      <div className="flex justify-between">
                        <span className="text-slate-500">Địa chỉ:</span>
                        {dbUser.address ? (
                          <span className="text-slate-450 text-right max-w-[150px] truncate">{dbUser.address}</span>
                        ) : (
                          <span className="text-rose-400 font-bold italic">Bị xóa (null)</span>
                        )}
                      </div>

                      <div className="flex justify-between">
                        <span className="text-slate-500">Trạng thái:</span>
                        {dbUser.status ? (
                          <span className={`font-bold ${dbUser.status === 'Active' ? 'text-emerald-400' : 'text-slate-400'}`}>
                            {dbUser.status}
                          </span>
                        ) : (
                          <span className="text-rose-400 font-bold italic">Bị xóa (null)</span>
                        )}
                      </div>
                    </div>

                  </div>

                  {/* Missing Fields HUD Panel */}
                  <div className="space-y-3.5">
                    <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Bảng Thống Kê Ghi Nhận Lỗi</span>
                    
                    <div className="p-4 bg-slate-950 border border-slate-850 rounded-2xl text-xs space-y-3 font-inter">
                      {/* Check integrity of the database */}
                      {Object.keys(dbUser).length === 10 ? (
                        <div className="flex items-center gap-2 text-emerald-450">
                          <i className="fa-solid fa-circle-check text-base"></i>
                          <span className="font-semibold">Hồ sơ vẹn toàn (10/10 trường)</span>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-rose-450">
                            <i className="fa-solid fa-triangle-exclamation text-base animate-bounce"></i>
                            <span className="font-bold">Mất dữ liệu! Chỉ còn {Object.keys(dbUser).length}/10 trường.</span>
                          </div>
                          <p className="text-slate-450 text-[11px] leading-relaxed">
                            Cơ chế của lệnh <code>PUT</code> khi gửi thiếu trường đã xóa bỏ toàn bộ các trường không có trong payload gửi đi trên Mock Server. Nhấn nút <strong>"Khôi phục dữ liệu gốc"</strong> ở góc trên để làm sạch.
                          </p>
                        </div>
                      )}

                      <div className="border-t border-slate-900 pt-2.5 space-y-1.5 text-[11px] text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
                          <span><strong>PUT</strong>: Ghi đè toàn bộ tài nguyên (Full Replacement)</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
                          <span><strong>PATCH</strong>: Chỉ hợp nhất/sửa đổi các trường gửi đi</span>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-slate-500 italic">Chưa tải được thông tin từ database...</p>
                </div>
              )}
            </div>

            {/* API Console Log HUD */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h2 className="text-base font-bold font-outfit flex items-center gap-2">
                <i className="fa-solid fa-terminal text-slate-400"></i>
                API Console: Nhật Ký Giao Dịch Gần Nhất
              </h2>
              
              {currentLog ? (
                <div className="space-y-4 text-xs font-mono">
                  <div className="grid grid-cols-3 gap-2 bg-slate-950 p-3 rounded-lg border border-slate-850">
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase">Thời gian</span>
                      <span className="text-slate-350">{currentLog.time}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase">Phương thức</span>
                      <span className={`font-bold ${
                        currentLog.method === 'PATCH' ? 'text-indigo-400' : currentLog.method === 'PUT' ? 'text-blue-400' : 'text-amber-500'
                      }`}>
                        {currentLog.method}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase">Trạng thái</span>
                      <span className="text-emerald-450 font-bold">200 OK</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Request Payload */}
                    <div className="space-y-1.5">
                      <span className="text-slate-400 text-[11px] block uppercase font-bold tracking-wider">Request Payload (Body)</span>
                      <pre className="bg-slate-950 p-3 rounded-lg border border-slate-855 text-[10px] max-h-[140px] overflow-y-auto text-slate-300 scrollbar-thin">
                        {currentLog.payload}
                      </pre>
                    </div>

                    {/* Response Data */}
                    <div className="space-y-1.5">
                      <span className="text-slate-400 text-[11px] block uppercase font-bold tracking-wider">Server Response (data)</span>
                      <pre className="bg-slate-950 p-3 rounded-lg border border-slate-855 text-[10px] max-h-[140px] overflow-y-auto text-slate-300 scrollbar-thin">
                        {currentLog.response}
                      </pre>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 bg-slate-950 border border-slate-850 rounded-xl">
                  <p className="text-slate-500 italic text-xs">Chưa có giao dịch HTTP nào được thực hiện...</p>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}
