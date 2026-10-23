import { Link, useLocation } from 'react-router-dom'

const links = [
  { to: '/', label: 'Главная' },
  { to: '/drag-drop', label: 'Порядок' },
  { to: '/match', label: 'Пары' },
  { to: '/fill-blanks', label: 'Пропуски' },
  { to: '/quiz', label: 'Викторина' },
]

export default function Header() {
  const { pathname } = useLocation()

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-gray-200">
      <nav className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-1 overflow-x-auto">
        {links.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
              pathname === link.to
                ? 'bg-gray-800 text-white'
                : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
