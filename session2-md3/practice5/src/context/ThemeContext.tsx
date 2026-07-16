import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export type Theme = 'light' | 'dark'

export interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Attempt to retrieve theme from localStorage, default to 'light'
    const savedTheme = localStorage.getItem('app-theme')
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme
    }
    return 'light'
  })

  useEffect(() => {
    // Persist to localStorage
    localStorage.setItem('app-theme', theme)
    
    // Toggle class on document documentElement (html tag)
    const root = window.document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider. Please wrap your application layout inside <ThemeProvider>.')
  }
  return context
}
