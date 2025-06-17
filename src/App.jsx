import React from 'react'
import './index.css'
import { useState, useEffect } from 'react'


const App = () => {
  const [rates, setRates] = useState({});
  const [fromRate, setFromRate] = useState('USD');
  const [toRate, setToRate] = useState('EUR');
  const [amount, setAmount] = useState(1);
  const [converted, setConverted] = useState(0);

  useEffect(() => {
    fetch ('https://api.exchangerate-api.com/v4/latest/USD')
    .then((res) => res.json())
    .then((data) => setRates(data.rates))
  }, [])

  useEffect(() => {
    const divide = rates[toRate] / rates[fromRate]
    setConverted((amount*divide).toFixed(2))
  }, [amount, fromRate, toRate, rates])

  
  return (
    <>
      <div className="container">
      <h2>Currency Converter</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <select value={fromRate} onChange={(e) => setFromRate(e.target.value)}>
          {Object.keys(rates).map(rate => (
            <option value={rate} key={rate}>{rate}</option>
          ))}
      </select>
      <span> ➜ </span>
      <select value={toRate} onChange={(e) => setToRate(e.target.value)}>
          {Object.keys(rates).map(rate => (
            <option value={rate} key={rate}>{rate}</option>
          ))}
      </select>
      <h3>
        {amount} {fromRate} = {converted} {toRate}
      </h3>
    </div>
    </>
  )
}

export default App