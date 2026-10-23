import { DndContext, type DragEndEvent } from '@dnd-kit/core'
import { useState } from 'react'
import DroppableTerm from './DroppableTerm'
import DraggableDefinition from './DraggableDefinition'
import ResultBanner from '../../components/ui/ResultBanner'

type Pair = {
  id: string
  term: string
  definition: string
}

type Props = {
  pairs: Pair[]
}

export default function MatchPairsExercise({ pairs }: Props) {
  const [matched, setMatched] = useState<Record<string, string>>({})
  const [wrongId, setWrongId] = useState<string | null>(null)
  const [availableDefs, setAvailableDefs] = useState(pairs.map(p => ({ id: p.id, text: p.definition })))

  const isFinished = Object.keys(matched).length === pairs.length

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over) return

    const defId = active.id as string
    const termId = over.id as string

    const pair = pairs.find(p => p.id === defId)
    if (pair && pair.id === termId) {
      setMatched(prev => ({ ...prev, [termId]: pair.definition }))
      setAvailableDefs(prev => prev.filter(d => d.id !== defId))
      setWrongId(null)
    } else {
      setWrongId(defId)
      setTimeout(() => setWrongId(null), 500)
    }
  }

  function handleRetry() {
    setMatched({})
    setAvailableDefs(pairs.map(p => ({ id: p.id, text: p.definition })))
    setWrongId(null)
  }

  if (isFinished) {
    return (
      <ResultBanner
        score={pairs.length}
        total={pairs.length}
        onRetry={handleRetry}
      />
    )
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Категории</h3>
          {pairs.map(pair => (
            <DroppableTerm
              key={pair.id}
              id={pair.id}
              text={pair.term}
              matchedDef={matched[pair.id]}
            />
          ))}
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Блоки</h3>
          {availableDefs.map(def => (
            <DraggableDefinition
              key={def.id}
              id={def.id}
              text={def.text}
              isWrong={wrongId === def.id}
            />
          ))}
        </div>
      </div>
    </DndContext>
  )
}
