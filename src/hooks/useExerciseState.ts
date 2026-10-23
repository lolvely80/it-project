import { useState, useCallback } from 'react'

type ExerciseState = {
  score: number
  total: number
  isFinished: boolean
  addCorrect: () => void
  finish: () => void
  reset: () => void
}

export default function useExerciseState(total: number): ExerciseState {
  const [score, setScore] = useState(0)
  const [isFinished, setIsFinished] = useState(false)

  const addCorrect = useCallback(() => {
    setScore(prev => prev + 1)
  }, [])

  const finish = useCallback(() => {
    setIsFinished(true)
  }, [])

  const reset = useCallback(() => {
    setScore(0)
    setIsFinished(false)
  }, [])

  return { score, total, isFinished, addCorrect, finish, reset }
}
