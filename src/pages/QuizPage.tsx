import QuizExercise from '../exercises/Quiz/QuizExercise'
import { quizQuestions } from '../data/quizData'

export default function QuizPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col items-center py-16 px-6">
      <div className="animate-fade-in-up text-center mb-12">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">
          Викторина
        </h1>
        <p className="text-gray-500">Проверь свои знания о Scratch</p>
      </div>
      <QuizExercise questions={quizQuestions} />
    </div>
  )
}
