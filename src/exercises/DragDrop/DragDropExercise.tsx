import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext,  verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useState } from 'react';
import { type DragEndEvent } from '@dnd-kit/core'
import {SortableItem} from './SortableItem'

type Props = {
  items: { id: string; text: string }[]
  correctOrder: string[]
  onComplete?: () => void
}



export default function DragDropExercise({ items, correctOrder, onComplete }: Props) {
  const sensor  = useSensors(useSensor(PointerSensor))
  const [currentItems, setCurrentItems] = useState(items)
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null)

  function handleEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over) return null
    if (active.id !== over.id){
     
      setCurrentItems(prev =>{
        const oldIndex = prev.findIndex(i => i.id === active.id)
        const newIndex = prev.findIndex(i => i.id === over.id)
        return arrayMove(prev,oldIndex, newIndex)
      })}}

  function checkAnswer( ){
    const currentOrder = currentItems.map(i => i.id)
    const isCorrect = currentOrder.every((id, index) => id == correctOrder[index])
    setResult(isCorrect ? 'correct' : 'wrong')
    if(isCorrect) onComplete?.()
    }
  
  
  return(
    <div className="w-full max-w-xl mx-auto">
      <DndContext sensors={sensor} collisionDetection={closestCenter} onDragEnd={handleEnd}>
        <SortableContext items={currentItems.map(i => i.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-0">
            {currentItems.map((item, index) => (
              <div key={item.id} className="flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 text-sm font-mono shrink-0">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <SortableItem id={item.id} text={item.text} />
                </div>
              </div>
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <div className="mt-8 flex flex-col items-center gap-4">
        <button
          onClick={checkAnswer}
          className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-md active:scale-95"
        >
          Проверить порядок
        </button>

        {result === 'correct' && (
          <div className="px-6 py-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 font-semibold animate-fade-in-up">
            Правильно! Отличная работа!
          </div>
        )}
        {result === 'wrong' && (
          <div className="px-6 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 font-semibold animate-fade-in-up">
            Неверно — попробуй ещё раз
          </div>
        )}
      </div>
    </div>
  )}