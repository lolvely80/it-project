import { Link } from 'react-router-dom'

const exercises = [
  {
    path: '/drag-drop',
    title: 'Расставь по порядку',
    description: 'Перетащи элементы в правильной последовательности',
    color: 'text-violet-600',
    border: 'hover:border-violet-300',
  },
  {
    path: '/match',
    title: 'Соотнеси пары',
    description: 'Соедини категории Scratch с их блоками',
    color: 'text-blue-600',
    border: 'hover:border-blue-300',
  },
  {
    path: '/fill-blanks',
    title: 'Подставь правильно',
    description: 'Вставь пропущенные слова в предложения',
    color: 'text-emerald-600',
    border: 'hover:border-emerald-300',
  },
  {
    path: '/quiz',
    title: 'Викторина',
    description: 'Проверь свои знания — выбери правильный ответ',
    color: 'text-amber-600',
    border: 'hover:border-amber-300',
  },
]

export default function HomePage() {
  return (
    <section className="min-h-screen px-6 py-12 flex flex-col items-center">
      <div className="animate-fade-in-up w-full max-w-3xl mb-10">
        <div className="rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 aspect-video flex items-center justify-center">
          {/* Подставь путь к видео в атрибут src */}
          <video
            className="w-full h-full object-cover"
            controls
            src=""
            poster=""
          />
        </div>
      </div>

      <div className="animate-fade-in-up text-center max-w-2xl mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-3 text-gray-800">
          PC Lab
        </h1>
        <p className="text-base text-gray-500">
          Интерактивные упражнения по информатике. Выбери задание и начни!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-3xl">
        {exercises.map((ex, i) => (
          <Link
            key={ex.path}
            to={ex.path}
            className={`animate-fade-in-up stagger-${i + 1}`}
          >
            <div className={`group rounded-2xl p-6 bg-white border border-gray-200 ${ex.border} shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 h-full`}>
              <h2 className={`text-lg font-semibold mb-1.5 ${ex.color}`}>
                {ex.title}
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                {ex.description}
              </p>
              <div className={`mt-4 inline-flex items-center gap-1 text-sm font-medium ${ex.color}`}>
                Начать
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
