import { useState, useRef, useEffect } from 'react'
import { streamMessage, type Message } from '../services/gemini'

export default function AiChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  async function handleSend() {
    const text = input.trim()
    if (!text || loading) return

    setInput('')
    const userMsg: Message = { role: 'user', text }
    const history = [...messages]
    setMessages(prev => [...prev, userMsg, { role: 'model', text: '' }])
    setLoading(true)

    try {
      await streamMessage(history, text, (chunk) => {
        setMessages(prev => {
          const updated = [...prev]
          const last = updated[updated.length - 1]
          updated[updated.length - 1] = { ...last, text: last.text + chunk }
          return updated
        })
      })
    } catch (err) {
      const errorText = err instanceof Error ? err.message : 'Неизвестная ошибка'
      console.error('Gemini error:', errorText)
      setMessages(prev => {
        const updated = [...prev]
        updated[updated.length - 1] = { role: 'model', text: `Ошибка: ${errorText}` }
        return updated
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gray-800 text-white shadow-lg hover:shadow-xl hover:bg-gray-700 transition-all duration-200 flex items-center justify-center text-2xl"
        title="ИИ-помощник"
      >
        {open ? '✕' : '?'}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 h-[480px] bg-white border border-gray-200 rounded-2xl shadow-xl flex flex-col overflow-hidden animate-fade-in-up">
          <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 rounded-t-2xl">
            <h3 className="font-semibold text-gray-800 text-sm">Помощник по Scratch</h3>
            <p className="text-xs text-gray-400">Спроси что угодно о блоках Scratch</p>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.length === 0 && (
              <div className="text-center text-gray-400 text-sm mt-16">
                <p className="mb-2 text-lg">Привет!</p>
                <p>Задай вопрос о Scratch,</p>
                <p>и я помогу разобраться.</p>
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-gray-800 text-white rounded-br-sm'
                      : 'bg-gray-100 text-gray-700 rounded-bl-sm'
                  }`}
                >
                  {msg.text || (loading && i === messages.length - 1 ? 'Думаю...' : '')}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <div className="px-3 py-3 border-t border-gray-100">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Напиши вопрос..."
                className="flex-1 px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-gray-400 transition-colors bg-gray-50"
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="px-4 py-2 rounded-xl bg-gray-800 text-white text-sm font-medium hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
