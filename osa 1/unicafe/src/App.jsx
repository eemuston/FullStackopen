import { useState } from 'react'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Statistics = ({ good, neutral, bad, total}) => {
  const average = (good - bad) / total
  const positive = (good / total) * 100
    return(
      <div>
      <h1>statistics</h1>
      {total === 0 ? (
        <p>No feeback given</p>
      ) : (
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={total} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive} />
        </tbody>
      </table>
      )}
    </div>
  )
}

const StatisticLine = ({text, value}) => {
  if (text === "positive")
    return(
      <tr>
        <td>{text} {value} %</td>
      </tr> 
    )
  return(
    <tr>
      <td>{text} {value}</td>
    </tr>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const handleGood = () => {
    const updatedGood = good + 1
    const updatedTotal = total + 1
    setGood(updatedGood)
    setTotal(updatedTotal)
  }

  const handleNeutral = () => {
    const updatedNeutral = neutral + 1
    const updatedTotal = total + 1
    setNeutral(updatedNeutral)
    setTotal(updatedTotal)
  }

  const handleBad = () => {
    const updatedBad = bad + 1
    const updatedTotal = total + 1
    setBad(updatedBad)
    setTotal(updatedTotal)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGood} text="good" />
      <Button onClick={handleNeutral} text="neutral" />
      <Button onClick={handleBad} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} total={total}/>
    </div>
  )
}

export default App