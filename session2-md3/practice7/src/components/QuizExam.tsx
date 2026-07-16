import { useState } from 'react'
import { useCountdown } from '../hooks/useCountdown'

interface Question {
  id: number
  text: string
  options: string[]
  answerIdx: number
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: 'What hook is used to subscribe to global contexts in React?',
    options: ['useState', 'useEffect', 'useContext', 'useReducer'],
    answerIdx: 2
  },
  {
    id: 2,
    text: 'Which TypeScript assertion guarantees that tuple arrays remain immutable?',
    options: ['as mutable', 'as const', 'as tuple', 'as readonly'],
    answerIdx: 1
  },
  {
    id: 3,
    text: 'What plugin is recommended for class-based dark mode in Tailwind v4?',
    options: ['@variant dark', 'tailwind.config.js', 'postcss-import', 'classMode'],
    answerIdx: 0
  }
]

export default function QuizExam() {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [score, setScore] = useState<number | null>(null)

  // Handle quiz timeout
  const handleTimeOut = () => {
    setIsSubmitted(true)
    calculateScore()
  }

  const { seconds, isActive, start, pause, reset } = useCountdown({
    initialSeconds: 45,
    onComplete: handleTimeOut
  })

  const handleSelectOption = (qId: number, oIdx: number) => {
    if (isSubmitted || !isActive) return
    setSelectedAnswers((prev) => ({ ...prev, [qId]: oIdx }))
  }

  const calculateScore = () => {
    let currentScore = 0
    QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.answerIdx) {
        currentScore++
      }
    })
    setScore(currentScore)
  }

  const handleSubmit = () => {
    pause()
    setIsSubmitted(true)
    calculateScore()
  }

  const handleResetQuiz = () => {
    reset()
    setSelectedAnswers({})
    setIsSubmitted(false)
    setScore(null)
  }

  // Format progress bar percentage
  const progressPercent = (seconds / 45) * 100

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl shadow-blue-500/5 flex flex-col h-full justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600/10 text-blue-400 border border-blue-500/20">
              <i className="fa-solid fa-file-signature text-sm"></i>
            </div>
            <h2 className="font-outfit text-xl font-bold">Quiz Exam</h2>
          </div>

          {/* Time indicator */}
          <div className="flex items-center gap-2 text-sm font-semibold">
            <span className={seconds < 10 ? 'text-rose-500 animate-pulse' : 'text-slate-350'}>
              Time Left: <span className="font-mono text-base">{seconds}s</span>
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden mb-8">
          <div
            className={`h-full transition-all duration-1000 ${
              seconds < 10 ? 'bg-rose-500' : seconds < 25 ? 'bg-amber-500' : 'bg-blue-500'
            }`}
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>

        {/* Start / Pause Prompt */}
        {!isActive && !isSubmitted && seconds > 0 && (
          <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-4 mb-6 text-center text-xs text-blue-300">
            <i className="fa-solid fa-circle-info mr-1.5"></i>
            Click <strong>Start Exam</strong> below to activate the timer and select your options.
          </div>
        )}

        {/* Question list */}
        <div className="space-y-6">
          {QUESTIONS.map((q, qIndex) => (
            <div
              key={q.id}
              className={`rounded-2xl p-5 border transition-all ${
                !isActive && !isSubmitted
                  ? 'bg-slate-950/20 border-slate-900 opacity-50'
                  : 'bg-slate-950/50 border-slate-850'
              }`}
            >
              <h3 className="font-outfit text-sm font-bold text-slate-200">
                Question {qIndex + 1}: {q.text}
              </h3>
              <div className="mt-4 space-y-2.5">
                {q.options.map((opt, oIdx) => {
                  const isSelected = selectedAnswers[q.id] === oIdx
                  const isCorrect = q.answerIdx === oIdx
                  let optionStyle = 'border-slate-800 text-slate-400 hover:border-slate-700 bg-slate-950/30'

                  if (isSubmitted) {
                    if (isSelected && isCorrect) {
                      optionStyle = 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10'
                    } else if (isSelected && !isCorrect) {
                      optionStyle = 'border-rose-500/40 text-rose-400 bg-rose-500/10'
                    } else if (isCorrect) {
                      optionStyle = 'border-emerald-500/30 text-emerald-400/80 bg-emerald-500/5'
                    } else {
                      optionStyle = 'border-slate-900 text-slate-600 bg-slate-950/10'
                    }
                  } else if (isSelected) {
                    optionStyle = 'border-blue-500/50 text-blue-400 bg-blue-500/10'
                  }

                  return (
                    <button
                      key={oIdx}
                      disabled={isSubmitted || !isActive}
                      onClick={() => handleSelectOption(q.id, oIdx)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-xs font-medium border flex items-center justify-between transition-all ${optionStyle}`}
                    >
                      <span>{opt}</span>
                      {isSelected && !isSubmitted && (
                        <span className="h-2 w-2 rounded-full bg-blue-400 shadow shadow-blue-400/50"></span>
                      )}
                      {isSubmitted && isCorrect && (
                        <i className="fa-solid fa-circle-check text-emerald-500"></i>
                      )}
                      {isSubmitted && isSelected && !isCorrect && (
                        <i className="fa-solid fa-circle-xmark text-rose-500"></i>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Control Actions */}
      <div className="mt-8 pt-6 border-t border-slate-800/65">
        {score !== null && isSubmitted && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 text-center mb-6">
            <p className="text-sm font-semibold text-emerald-400">
              Exam Completed! Your score is: {score} / {QUESTIONS.length}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              ({Math.round((score / QUESTIONS.length) * 100)}% correct answers)
            </p>
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          {!isSubmitted && (
            <>
              {isActive ? (
                <button
                  onClick={pause}
                  className="flex-1 min-w-[100px] flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-750 hover:border-slate-650 rounded-xl font-semibold text-xs transition-all"
                >
                  <i className="fa-solid fa-pause"></i> Pause
                </button>
              ) : (
                <button
                  onClick={start}
                  disabled={seconds === 0}
                  className="flex-1 min-w-[100px] flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-xs shadow-lg shadow-blue-500/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <i className="fa-solid fa-play"></i> Start Exam
                </button>
              )}

              <button
                onClick={handleSubmit}
                disabled={!isActive || Object.keys(selectedAnswers).length === 0}
                className="flex-1 min-w-[100px] flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold text-xs shadow-lg shadow-emerald-500/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <i className="fa-solid fa-paper-plane"></i> Submit
              </button>
            </>
          )}

          <button
            onClick={handleResetQuiz}
            className="flex-1 min-w-[100px] flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 rounded-xl font-semibold text-xs transition-all"
          >
            <i className="fa-solid fa-rotate-left"></i> Reset Exam
          </button>
        </div>
      </div>
    </div>
  )
}
