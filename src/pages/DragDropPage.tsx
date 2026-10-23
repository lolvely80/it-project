import DragDropExercise from '../exercises/DragDrop/DragDropExercise'
import { dragDropItems, correctOrder } from '../data/dragDropData'



export default function DragDropPage() {
  
 return (
  <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col items-center py-16 px-6">
    <div className="animate-fade-in-up text-center mb-12">
      <h1 className="text-3xl font-bold mb-2 text-gray-800">
        Расставь по порядку
      </h1>
      <p className="text-gray-500">Расставь блоки Scratch так, чтобы кот покрутился влево-вправо 3 раза</p>
    </div>
    <DragDropExercise
      items={dragDropItems}
      correctOrder={correctOrder}
      onComplete={() => console.log('готово')}
    />
  </div>
)}