import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CourseList from './components/CourseList'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<CourseList />} />
      </Routes>
    </BrowserRouter>
  )
}