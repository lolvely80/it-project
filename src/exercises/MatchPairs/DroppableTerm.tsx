import { useDroppable } from '@dnd-kit/core'

type Props = {
  id: string
  text: string
  matchedDef?: string
}

export default function DroppableTerm({ id, text, matchedDef }: Props) {
  const { isOver, setNodeRef } = useDroppable({ id })

  return (
    <div
      ref={setNodeRef}
      className={`p-4 rounded-xl border-2 border-dashed transition-all duration-200 min-h-[80px] ${
        matchedDef
          ? 'border-emerald-400 bg-emerald-50'
          : isOver
            ? 'border-indigo-400 bg-indigo-50'
            : 'border-gray-300 bg-white'
      }`}
    >
      <div className="font-semibold text-gray-800 mb-1">{text}</div>
      {matchedDef && (
        <div className="text-sm text-emerald-600 correct-appear">
          {matchedDef}
        </div>
      )}
    </div>
  )
}
