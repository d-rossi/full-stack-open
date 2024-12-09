import ReactDOM from 'react-dom/client'
import reducer from './reducer'
import { createStore } from 'redux'

const store = createStore(reducer)

const StatisticsLine = ({text, value}) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = () => {
  const {good, ok, bad} = store.getState()
  const total = good + ok + bad
  const computeAverage = () => total === 0 ? 0 : (1*good + 0*ok + -1*bad)/(total)
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
          <StatisticsLine text="neutral" value={ok} />
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
  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" onClick={() => store.dispatch({type: 'GOOD'})}/>
      <Button text="neutral" onClick={() => store.dispatch({type: 'OK'})}/>
      <Button text="bad" onClick={() => store.dispatch({type: 'BAD'})}/>
      <Button text="reset stats" onClick={() => store.dispatch({type: 'ZERO'})}/>
      <Statistics />
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)