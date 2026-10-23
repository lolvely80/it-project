import { useDraggable } from '@dnd-kit/core'
import { motion } from 'framer-motion'

type Props = {
  id: string
  text: string
  isWrong: boolean
}

export default function DraggableDefinition({ id, text, isWrong }: Props) {
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
      animate={isWrong ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
      transition={{ duration: 0.4 }}
      className="p-4 bg-white border border-gray-200 rounded-xl cursor-grab active:cursor-grabbing select-none transition-colors duration-200 hover:border-blue-400 shadow-sm hover:shadow"
    >
      <span className="text-gray-700 text-sm">{text}</span>
    </motion.div>
  )
}
