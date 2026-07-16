import { ThemeProvider } from './context/ThemeContext'
import Header from './components/Header'
import MainContent from './components/MainContent'
import Footer from './components/Footer'

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col transition-colors duration-300 bg-white dark:bg-slate-950">
        <Header />
        <MainContent />
        <Footer />
      </div>
    </ThemeProvider>
  )
}