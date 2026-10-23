import FillBlanksExercise from '../exercises/FillBlanks/FillBlanksExercise'
import { blanks, words } from '../data/fillBlanksData'

export default function FillBlanksPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col items-center py-16 px-6">
      <div className="animate-fade-in-up text-center mb-12">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">
          Подставь правильно
        </h1>
        <p className="text-gray-500">Перетащи слово в нужный пропуск</p>
      </div>
      <FillBlanksExercise blanks={blanks} words={words} />
    </div>
  )
}
