import { useState } from 'react'
import { motion } from 'framer-motion'
import ConfettiExplosion from 'react-confetti-explosion'
import ResultBanner from '../../components/ui/ResultBanner'

type Question = {
  id: string
  question: string
  options: string[]
  correctIndex: number
}

type Props = {
  questions: Question[]
}

export default function QuizExercise({ questions }: Props) {
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [finished, setFinished] = useState(false)

  const q = questions[current]

  function handleSelect(index: number) {
    if (selected !== null) return
    setSelected(index)

    const isCorrect = index === q.correctIndex
    if (isCorrect) {
      setScore(s => s + 1)
      setShowConfetti(true)
    }

    setTimeout(() => {
      setSelected(null)
      setShowConfetti(false)
      if (current + 1 < questions.length) {
        setCurrent(c => c + 1)
      } else {
        setFinished(true)
      }
    }, 1200)
  }

  function handleRetry() {
    setCurrent(0)
    setScore(0)
    setSelected(null)
    setShowConfetti(false)
    setFinished(false)
  }

  if (finished) {
    return <ResultBanner score={score} total={questions.length} onRetry={handleRetry} />
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="mb-6 flex items-center justify-between text-sm text-gray-500">
        <span>Вопрос {current + 1} из {questions.length}</span>
        <span>Правильных: {score}</span>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-6">
        <h2 className="text-lg font-semibold text-gray-800 leading-relaxed">
          {q.question}
        </h2>
      </div>

      <div className="space-y-3 relative">
        {showConfetti && (
          <div className="absolute top-0 left-1/2 z-10">
            <ConfettiExplosion particleCount={60} duration={2000} force={0.4} width={300} />
          </div>
        )}
        {q.options.map((option, i) => {
          let classes = 'w-full text-left p-4 rounded-xl border transition-all duration-200 font-medium text-sm '
          if (selected === null) {
            classes += 'bg-white border-gray-200 text-gray-700 hover:border-gray-400 hover:shadow-sm cursor-pointer'
          } else if (i === q.correctIndex) {
            classes += 'bg-emerald-50 border-emerald-400 text-emerald-700'
          } else if (i === selected) {
            classes += 'bg-red-50 border-red-300 text-red-600'
          } else {
            classes += 'bg-white border-gray-200 text-gray-400'
          }

          return (
            <motion.button
              key={i}
              onClick={() => handleSelect(i)}
              animate={selected === i && i !== q.correctIndex ? { x: [0, -6, 6, -6, 6, 0] } : {}}
              transition={{ duration: 0.4 }}
              className={classes}
              disabled={selected !== null}
            >
              {option}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
