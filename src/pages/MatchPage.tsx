import MatchPairsExercise from '../exercises/MatchPairs/MatchPairsExercise'
import { matchPairs } from '../data/matchData'

export default function MatchPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col items-center py-16 px-6">
      <div className="animate-fade-in-up text-center mb-12">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">
          Соотнеси пары
        </h1>
        <p className="text-gray-500">Перетащи блок Scratch к правильной категории</p>
      </div>
      <MatchPairsExercise pairs={matchPairs} />
    </div>
  )
}
