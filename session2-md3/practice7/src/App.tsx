import QuizExam from './components/QuizExam'
import FlashSale from './components/FlashSale'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-6 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Banner Title */}
        <div className="text-center mb-12">
          <span className="text-blue-500 text-xs font-semibold tracking-wider uppercase bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            Custom React Hooks
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-3 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent font-outfit">
            State Abstraction Explorer
          </h1>
          <p className="text-slate-400 mt-2 max-w-lg mx-auto text-sm">
            Demonstrating custom hooks reusability. The <code>useCountdown</code> hook manages separate timers for both a Quiz Exam and a Flash Sale campaign simultaneously.
          </p>
        </div>

        {/* Components Grid */}
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Quiz Exam Widget */}
          <QuizExam />

          {/* Flash Sale Widget */}
          <FlashSale />
        </div>

        {/* Footer Credit */}
        <div className="mt-12 text-center text-xs text-slate-600">
          Rikkei Education • Module 3 • Session 2 • Practice 7
        </div>
      </div>
    </div>
  )
}