import ProgressBar from './ProgressBar'

type Props = {
  score: number
  total: number
  onRetry: () => void
}

export default function ResultBanner({ score, total, onRetry }: Props) {
  const percent = total > 0 ? Math.round((score / total) * 100) : 0
  const message =
    percent === 100
      ? 'Идеальный результат!'
      : percent >= 60
        ? 'Хороший результат!'
        : 'Попробуй ещё раз!'

  return (
    <div className="w-full max-w-md mx-auto animate-fade-in-up">
      <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{message}</h2>
        <p className="text-gray-500 mb-6">
          Правильных ответов: {score} из {total}
        </p>
        <ProgressBar current={score} total={total} />
        <button
          onClick={onRetry}
          className="mt-6 px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-md active:scale-95"
        >
          Пройти заново
        </button>
      </div>
    </div>
  )
}
