import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

type Props = {
  id: string
  text: string
}

export function SortableItem({ id, text }: Props) {
  const { setNodeRef, listeners, attributes, transform, transition } = useSortable({ id })  
  const style = {
  transform: CSS.Transform.toString(transform),
  transition,
}

  return(
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="flex items-center gap-4 p-4 mb-3 bg-white border border-gray-200 rounded-xl cursor-grab active:cursor-grabbing select-none transition-all duration-200 hover:border-indigo-300 active:scale-[1.02] shadow-sm hover:shadow"
    >
      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-50 text-indigo-500 text-sm font-bold shrink-0">
        ⠿
      </span>
      <span className="text-gray-700 font-medium">{text}</span>
    </div>
  )
  
}