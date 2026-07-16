import React, { useState, useEffect, useRef } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

interface ChatMessage {
  id: string
  sender: string
  role: string
  text: string
  timestamp: string
}

export default function Classroom() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'chat' | 'materials'>('chat')
  
  // Interactive Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'Mr. John',
      role: 'Instructor',
      text: 'Welcome to the Next-Gen Virtual Classroom! Today we are discussing SPA routing security.',
      timestamp: '19:30',
    },
    {
      id: '2',
      sender: 'Emma',
      role: 'Student',
      text: 'Hi Mr. John! Is it true that we should use replace in navigate for redirects?',
      timestamp: '19:32',
    },
    {
      id: '3',
      sender: 'Mr. John',
      role: 'Instructor',
      text: 'Yes Emma! That clears the login page from the browser back-history stack so users do not get stuck.',
      timestamp: '19:33',
    },
  ])
  const [inputText, setInputText] = useState('')
  const chatEndRef = useRef<HTMLDivElement>(null)

  // Interactive Live Statuses
  const [isMuted, setIsMuted] = useState(false)
  const [isCamOff, setIsCamOff] = useState(false)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [isHandRaised, setIsHandRaised] = useState(false)
  
  // Session timer
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60)
    const secs = totalSecs % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleLogoutClick = () => {
    logout()
    // Redirect to Home page
    navigate('/', { replace: true })
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputText.trim()) return

    const now = new Date()
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: user?.username || 'Guest',
      role: user?.role || 'Student',
      text: inputText.trim(),
      timestamp: timeStr,
    }

    setMessages((prev) => [...prev, newMsg])
    setInputText('')
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Top Navbar */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 text-blue-400">
            <i className="fa-solid fa-graduation-cap text-lg"></i>
          </div>
          <div>
            <h1 className="font-extrabold text-base tracking-wide font-outfit">AetherEdu</h1>
            <p className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase">Virtual Classroom</p>
          </div>
        </div>

        {/* User profile & Action */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-3 bg-slate-950/50 py-1.5 pl-3 pr-4 rounded-full border border-slate-800/80">
            <img
              src={user?.avatarUrl}
              alt={user?.username}
              className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700"
            />
            <div className="text-left">
              <p className="text-xs font-bold">{user?.username}</p>
              <p className="text-[9px] font-semibold text-indigo-400 tracking-wide uppercase">
                {user?.role}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogoutClick}
            className="flex items-center gap-2 py-2 px-4 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 hover:border-red-500/30 rounded-xl font-bold text-xs transition-all cursor-pointer"
          >
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            Leave Room
          </button>
        </div>
      </header>

      {/* Main Workspace Area */}
      <main className="flex-1 p-6 grid lg:grid-cols-12 gap-6 items-stretch max-w-7xl mx-auto w-full">
        
        {/* Left Section: Video Feed & Whiteboard Simulation */}
        <section className="lg:col-span-8 flex flex-col gap-4">
          
          {/* Main Display screen */}
          <div className="relative aspect-video rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl flex flex-col justify-between p-6">
            
            {/* Live badges */}
            <div className="flex justify-between items-center w-full z-10">
              <span className="flex items-center gap-1.5 px-3 py-1 bg-red-500/15 text-red-400 border border-red-500/25 rounded-full text-xs font-bold tracking-wide uppercase">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                LIVE STREAM
              </span>
              <span className="text-xs font-mono bg-slate-950/70 backdrop-blur-md px-3 py-1 rounded-full text-slate-300 border border-slate-800/50">
                Duration: {formatTime(seconds)}
              </span>
            </div>

            {/* Video stream mockup */}
            <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40">
              {isCamOff ? (
                <div className="text-center space-y-3">
                  <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-600 mx-auto">
                    <i className="fa-solid fa-video-slash text-3xl"></i>
                  </div>
                  <p className="text-sm font-semibold text-slate-500">Camera Feed Paused</p>
                </div>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center select-none">
                  {/* Presentation slide content mockup */}
                  <div className="bg-slate-950/75 border border-slate-800/80 rounded-2xl max-w-md w-full p-6 shadow-xl backdrop-blur-md space-y-4">
                    <p className="text-xs text-blue-400 font-bold uppercase tracking-wider">Presenting: Topic 9</p>
                    <h3 className="text-lg font-bold font-outfit">Implementing Security Boundaries in SPA</h3>
                    <div className="text-left space-y-2 border-t border-slate-800 pt-3 text-xs text-slate-400 font-mono">
                      <p className="text-indigo-300">// App.tsx</p>
                      <p>&lt;ProtectedRoute&gt;</p>
                      <p className="pl-4">&lt;Classroom /&gt;</p>
                      <p>&lt;/ProtectedRoute&gt;</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User stream labels */}
            <div className="flex justify-between items-end w-full z-10">
              <span className="text-xs font-bold bg-slate-950/75 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800/80 text-slate-200">
                Host: Mr. John (Instructor)
              </span>
              {isHandRaised && (
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 text-amber-400 border border-amber-500/25 rounded-xl text-xs font-bold tracking-wide animate-bounce">
                  <i className="fa-solid fa-hand"></i>
                  Hand Raised
                </span>
              )}
            </div>

          </div>

          {/* Interactive Stream controls */}
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-wrap items-center justify-center sm:justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all cursor-pointer ${
                  isMuted
                    ? 'bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
                title={isMuted ? 'Unmute microphone' : 'Mute microphone'}
              >
                <i className={`fa-solid ${isMuted ? 'fa-microphone-slash' : 'fa-microphone'}`}></i>
              </button>

              <button
                onClick={() => setIsCamOff(!isCamOff)}
                className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all cursor-pointer ${
                  isCamOff
                    ? 'bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
                title={isCamOff ? 'Turn camera on' : 'Turn camera off'}
              >
                <i className={`fa-solid ${isCamOff ? 'fa-video-slash' : 'fa-video'}`}></i>
              </button>

              <button
                onClick={() => setIsScreenSharing(!isScreenSharing)}
                className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all cursor-pointer ${
                  isScreenSharing
                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
                title={isScreenSharing ? 'Stop presenting' : 'Present screen'}
              >
                <i className="fa-solid fa-desktop"></i>
              </button>
            </div>

            <button
              onClick={() => setIsHandRaised(!isHandRaised)}
              className={`py-2 px-4 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                isHandRaised
                  ? 'bg-amber-500/10 border-amber-500/20 text-amber-400 hover:bg-amber-500/20'
                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <i className="fa-solid fa-hand"></i>
              {isHandRaised ? 'Lower Hand' : 'Raise Hand'}
            </button>
          </div>

        </section>

        {/* Right Section: Tabs (Chat Room & Material Panel) */}
        <section className="lg:col-span-4 flex flex-col bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl h-[450px] lg:h-auto">
          
          {/* Tab Navigation header */}
          <div className="flex border-b border-slate-800 bg-slate-950/40 p-2">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-2 px-3 text-center text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === 'chat'
                  ? 'border border-slate-800/80 text-blue-400 bg-slate-900'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <i className="fa-solid fa-comments mr-1.5"></i>
              Interactive Chat
            </button>
            <button
              onClick={() => setActiveTab('materials')}
              className={`flex-1 py-2 px-3 text-center text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === 'materials'
                  ? 'border border-slate-800/80 text-blue-400 bg-slate-900'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <i className="fa-solid fa-book mr-1.5"></i>
              Materials
            </button>
          </div>

          {/* Active Tab Screen */}
          <div className="flex-1 flex flex-col overflow-hidden min-h-0">
            {activeTab === 'chat' ? (
              <>
                {/* Chat Feed logs */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4 min-h-0">
                  {messages.map((msg) => (
                    <div key={msg.id} className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-extrabold text-slate-300">{msg.sender}</span>
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide border ${
                            msg.role === 'Instructor'
                              ? 'bg-blue-500/10 border-blue-500/20 text-blue-400'
                              : 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400'
                          }`}
                        >
                          {msg.role}
                        </span>
                        <span className="text-[9px] text-slate-600 font-mono">{msg.timestamp}</span>
                      </div>
                      <div className="p-3 bg-slate-950 border border-slate-800/60 rounded-2xl text-xs leading-relaxed text-slate-300">
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>

                {/* Chat send input */}
                <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-800 bg-slate-950/40 flex gap-2">
                  <input
                    type="text"
                    placeholder="Type your message here..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="flex-1 px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-xs text-slate-100 font-medium transition-all"
                  />
                  <button
                    type="submit"
                    className="w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-md transition-all cursor-pointer"
                  >
                    <i className="fa-solid fa-paper-plane text-sm"></i>
                  </button>
                </form>
              </>
            ) : (
              /* Materials List Panel */
              <div className="flex-1 p-6 overflow-y-auto space-y-4">
                <h3 className="font-bold text-sm font-outfit mb-3">Topic 9 Resources</h3>

                <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-2xl flex items-center justify-between group hover:border-indigo-500/30 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
                      <i className="fa-regular fa-file-pdf text-base"></i>
                    </div>
                    <div>
                      <p className="text-xs font-semibold">Protected_Routes_Design.pdf</p>
                      <p className="text-[10px] text-slate-500">Slides • 2.4 MB</p>
                    </div>
                  </div>
                  <button className="text-slate-400 hover:text-slate-200 cursor-pointer">
                    <i className="fa-solid fa-download text-sm"></i>
                  </button>
                </div>

                <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-2xl flex items-center justify-between group hover:border-indigo-500/30 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center border border-violet-500/20">
                      <i className="fa-solid fa-code-compare text-base"></i>
                    </div>
                    <div>
                      <p className="text-xs font-semibold">Router_Context_Boilerplate.zip</p>
                      <p className="text-[10px] text-slate-500">Source • 1.1 MB</p>
                    </div>
                  </div>
                  <button className="text-slate-400 hover:text-slate-200 cursor-pointer">
                    <i className="fa-solid fa-download text-sm"></i>
                  </button>
                </div>
              </div>
            )}
          </div>

        </section>

      </main>

      {/* Footer bar */}
      <footer className="bg-slate-900 border-t border-slate-800 py-3 px-6 text-center flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>System Status: Socket Connected securely</span>
        </div>
        <div>
          Rikkei Education • Module 3 • Session 2 • Practice 9
        </div>
      </footer>

    </div>
  )
}
