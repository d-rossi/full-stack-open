import { useState } from 'react'

const StatisticsLine = ({text, value}) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  const computeAverage = () => total === 0 ? 0 : (1*good + 0*neutral + -1*bad)/(total)
  const positiveFeedback = () => total === 0 ? 0 : (good/total) * 100

  if (total === 0) {
    return <p>No feedback given</p>
  }
  return (
    <>
      <h2>statistics</h2>
      <table>
        <tbody>
          <StatisticsLine text="good" value={good} />
          <StatisticsLine text="neutral" value={neutral} />
          <StatisticsLine text="bad" value={bad} />
          <StatisticsLine text="all" value={total} />
          <StatisticsLine text="average" value={computeAverage()} />
          <StatisticsLine text="positive" value={positiveFeedback()} />
        </tbody>
      </table>
    </>
  )
}

const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodClicked = () => setGood(good + 1)
  const neutralClicked = () => setNeutral(neutral + 1)
  const badClicked = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" onClick={goodClicked}/>
      <Button text="neutral" onClick={neutralClicked}/>
      <Button text="bad" onClick={badClicked}/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App