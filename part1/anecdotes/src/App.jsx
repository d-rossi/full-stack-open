import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(8).fill(0))
  const [mostVotedAnecdote, setMostVotedAnecdote] = useState(anecdotes[0])

  const randomAnecdote = () => setSelected(Math.floor(Math.random() * (anecdotes.length - 1)))
  const increaseVote = () => {
    const newPoints = points.map((point, index) => index === selected ? point + 1 : point)
    setPoints(newPoints)
    determineAnecdoteMostPoints(newPoints)
  }

  const determineAnecdoteMostPoints = (points) => {
    let max = 0
    let index = 0
    for (let i = 0; i < anecdotes.length; i++) {
      if (points[i] > max) {
        max = points[i]
        index = i
      }
    }
    setMostVotedAnecdote(anecdotes[index])
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} vote(s)</p>
      <button onClick={increaseVote}>vote</button>
      <button onClick={randomAnecdote}>next anecdote</button>
      <h2>Anecdote with most votes</h2>
      <p>{mostVotedAnecdote}</p>
    </div>
  )
}

export default App