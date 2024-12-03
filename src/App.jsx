import { useState } from 'react'
import './App.css'
import FormInput from './components/FormInput'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <FormInput/>
    </>
  )
}

export default App