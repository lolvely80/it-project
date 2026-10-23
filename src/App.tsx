import { Route, Routes, BrowserRouter } from "react-router-dom"
import Header from "./components/Header"
import AiChat from "./components/AiChat"
import HomePage from "./pages/HomePage"
import MatchPage from "./pages/MatchPage"
import DragDropPage from "./pages/DragDropPage"
import FillBlanksPage from "./pages/FillBlanksPage"
import QuizPage from "./pages/QuizPage"

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/drag-drop" element={<DragDropPage />} />
        <Route path="/match" element={<MatchPage />} />
        <Route path="/fill-blanks" element={<FillBlanksPage />} />
        <Route path="/quiz" element={<QuizPage />} />
      </Routes>
      <AiChat />
    </BrowserRouter>
  )
}

export default App
