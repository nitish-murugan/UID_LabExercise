import { useState } from 'react'
import './App.css'

function App() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState(null)
  const [operation, setOperation] = useState(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  const inputNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(String(num))
      setWaitingForOperand(false)
    } else {
      setDisplay(display === '0' ? String(num) : display + num)
    }
  }

  const inputOperator = (nextOperator) => {
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForOperand(true)
    setOperation(nextOperator)
  }

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue
      case '-':
        return firstValue - secondValue
      case '*':
        return firstValue * secondValue
      case '/':
        return firstValue / secondValue
      case '=':
        return secondValue
      default:
        return secondValue
    }
  }

  const performCalculation = () => {
    const inputValue = parseFloat(display)

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation)
      setDisplay(String(newValue))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForOperand(true)
    }
  }

  const clearAll = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  const clearEntry = () => {
    setDisplay('0')
  }

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.')
      setWaitingForOperand(false)
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.')
    }
  }

  const toggleSign = () => {
    if (display !== '0') {
      setDisplay(display.charAt(0) === '-' ? display.slice(1) : '-' + display)
    }
  }

  return (
    <div className="calculator">
      <div className="calculator-display">
        <div className="display-value">{display}</div>
      </div>
      <div className="calculator-keypad">
        <div className="input-keys">
          <div className="function-keys">
            <button className="key-clear" onClick={clearAll}>AC</button>
            <button className="key-clear" onClick={clearEntry}>CE</button>
            <button className="key-sign" onClick={toggleSign}>±</button>
          </div>
          <div className="digit-keys">
            <button className="key-0" onClick={() => inputNumber(0)}>0</button>
            <button className="key-decimal" onClick={inputDecimal}>●</button>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
              <button key={num} className={`key-${num}`} onClick={() => inputNumber(num)}>
                {num}
              </button>
            ))}
          </div>
        </div>
        <div className="operator-keys">
          <button className="key-divide" onClick={() => inputOperator('/')}>÷</button>
          <button className="key-multiply" onClick={() => inputOperator('*')}>×</button>
          <button className="key-subtract" onClick={() => inputOperator('-')}>−</button>
          <button className="key-add" onClick={() => inputOperator('+')}>+</button>
          <button className="key-equals" onClick={performCalculation}>=</button>
        </div>
      </div>
    </div>
  )
}

export default App
