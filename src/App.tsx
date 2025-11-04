import { CarsGrid } from './components/CarsGrid'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Moja avta</h1>
      </header>
      <main>
        <CarsGrid />
      </main>
    </div>
  )
}

export default App
