import { useState } from 'react'
import './App.css'

function App() {
  const [inputValue, setInputValue] = useState('')
  const [result, setResult] = useState(0)

  const increment = () => {
    setResult(result+1)
  }

  const decrement = () => {
    setResult(result-1)
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    setInputValue(value)
    if (value !== '') {
      const numValue = parseInt(value) || 0
      setResult(numValue)
    }
  }

  return (
    <div className="counter-app">
      <h1>Simple Counter Application</h1>
      
      <input
        type="number"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter a number"
        className="counter-input"
      />

      <div className="button-group">
        <button 
          className="counter-btn increment-btn" 
          onClick={increment}
        >
          Increment
        </button>
        
        <button 
          className="counter-btn decrement-btn" 
          onClick={decrement}
        >
          Decrement
        </button>
      </div>

      <div className="result-display">
        <h2>Result: {result}</h2>
      </div>
    </div>
  )
}

export default App
