import { CarsGrid } from './components/CarsGrid'
import './App.css'
import { useState, useEffect } from 'react'
import Login from './components/Login'

function App() {
  const [authed, setAuthed] = useState<boolean>(false)

  useEffect(() => {
    const ok = localStorage.getItem('auth') === '1'
    setAuthed(ok)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('auth')
    localStorage.removeItem('auth_user')
    setAuthed(false)
  }

  if (!authed) {
    return (
      <div className="app">
        <main>
          <Login onLoginSuccess={() => setAuthed(true)} />
        </main>
      </div>
    )
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Moja avta</h1>
        <button onClick={handleLogout} className="logout-button">
          Odjava
        </button>
      </header>
      <main>
        <CarsGrid />
      </main>
    </div>
  )
}

export default App
