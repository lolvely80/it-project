const API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string
const STREAM_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:streamGenerateContent?alt=sse&key=${API_KEY}`

const SYSTEM_PROMPT = 'Помощник по Scratch. Отвечай 1-2 предложения, русский, без markdown.'

export type Message = {
  role: 'user' | 'model'
  text: string
}

export async function streamMessage(
  history: Message[],
  userMessage: string,
  onChunk: (text: string) => void,
): Promise<void> {
  const recent = history.slice(-4)

  const contents = [
    { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
    { role: 'model', parts: [{ text: 'Ок' }] },
    ...recent.map(m => ({ role: m.role, parts: [{ text: m.text }] })),
    { role: 'user', parts: [{ text: userMessage }] },
  ]

  const res = await fetch(STREAM_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents,
      generationConfig: { maxOutputTokens: 80, temperature: 0.3 },
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Gemini: ${res.status} ${err}`)
  }

  const reader = res.body!.getReader()
  const decoder = new TextDecoder()
  let buf = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    buf += decoder.decode(value, { stream: true })
    const lines = buf.split('\n')
    buf = lines.pop() ?? ''
    for (const line of lines) {
      if (!line.startsWith('data: ')) continue
      const j = line.slice(6).trim()
      if (!j || j === '[DONE]') continue
      try {
        const t = JSON.parse(j).candidates?.[0]?.content?.parts?.[0]?.text
        if (t) onChunk(t)
      } catch {}
    }
  }
}
