import { useState } from 'react'
import './App.css'
import { PerfectionPage } from './pages/PerfectionPage'

function App() {
  const [count, setCount] = useState(0)

  return (
      <PerfectionPage />
  )
}

export default App
