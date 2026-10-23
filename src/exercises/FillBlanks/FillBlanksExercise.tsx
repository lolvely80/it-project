import { DndContext, type DragEndEvent } from '@dnd-kit/core'
import { useDraggable, useDroppable } from '@dnd-kit/core'
import { useState } from 'react'
import { motion } from 'framer-motion'
import ResultBanner from '../../components/ui/ResultBanner'

type BlankData = {
  id: string
  sentence: string
  blankId: string
  correctWord: string
}

type Props = {
  blanks: BlankData[]
  words: { id: string; text: string }[]
}

function DraggableWord({ id, text, isWrong }: { id: string; text: string; isWrong: boolean }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id })

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      animate={isWrong ? { x: [0, -8, 8, -8, 8, 0] } : { x: 0 }}
      transition={{ duration: 0.4 }}
      className="px-4 py-2 bg-white border border-gray-200 rounded-lg cursor-grab active:cursor-grabbing select-none text-sm text-gray-700 font-medium hover:border-emerald-400 shadow-sm hover:shadow transition-colors"
    >
      {text}
    </motion.div>
  )
}

function BlankSlot({ id, filledWord }: { id: string; filledWord?: string }) {
  const { isOver, setNodeRef } = useDroppable({ id })

  return (
    <span
      ref={setNodeRef}
      className={`inline-flex items-center justify-center min-w-[120px] px-3 py-1 mx-1 rounded-lg border-2 border-dashed transition-all duration-200 ${
        filledWord
          ? 'border-emerald-400 bg-emerald-50 text-emerald-700 font-semibold'
          : isOver
            ? 'border-indigo-400 bg-indigo-50'
            : 'border-gray-300 bg-gray-50'
      }`}
    >
      {filledWord || '______'}
    </span>
  )
}

export default function FillBlanksExercise({ blanks, words }: Props) {
  const [filled, setFilled] = useState<Record<string, string>>({})
  const [availableWords, setAvailableWords] = useState(words)
  const [wrongId, setWrongId] = useState<string | null>(null)

  const correctCount = Object.keys(filled).length
  const isFinished = correctCount === blanks.length

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over) return

    const wordId = active.id as string
    const blankId = over.id as string

    const word = availableWords.find(w => w.id === wordId)
    const blank = blanks.find(b => b.blankId === blankId)

    if (!word || !blank) return

    if (word.text === blank.correctWord) {
      setFilled(prev => ({ ...prev, [blankId]: word.text }))
      setAvailableWords(prev => prev.filter(w => w.id !== wordId))
      setWrongId(null)
    } else {
      setWrongId(wordId)
      setTimeout(() => setWrongId(null), 500)
    }
  }

  function handleRetry() {
    setFilled({})
    setAvailableWords(words)
    setWrongId(null)
  }

  if (isFinished) {
    return (
      <ResultBanner
        score={blanks.length}
        total={blanks.length}
        onRetry={handleRetry}
      />
    )
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="w-full max-w-2xl mx-auto">
        <div className="space-y-6 mb-10">
          {blanks.map(blank => (
            <div
              key={blank.id}
              className="p-5 bg-white border border-gray-200 rounded-xl text-gray-700 text-lg leading-relaxed shadow-sm"
            >
              {blank.sentence.split('_____').map((part, i, arr) => (
                <span key={i}>
                  {part}
                  {i < arr.length - 1 && (
                    <BlankSlot id={blank.blankId} filledWord={filled[blank.blankId]} />
                  )}
                </span>
              ))}
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Доступные слова
          </h3>
          <div className="flex flex-wrap gap-3">
            {availableWords.map(word => (
              <DraggableWord
                key={word.id}
                id={word.id}
                text={word.text}
                isWrong={wrongId === word.id}
              />
            ))}
          </div>
        </div>
      </div>
    </DndContext>
  )
}
