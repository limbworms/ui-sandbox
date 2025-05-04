import { useState } from 'react'
import Window  from './Window/Window.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Window />
    </>
  )
}

export default App
