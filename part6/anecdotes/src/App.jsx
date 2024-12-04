import AnecdoteForm from "./components/AnecdoteForm"
import Anecdotes from "./components/Anecdotes"

const App = () => {
  return (
    <div>
      <h1>Anecdotes</h1>
      <Anecdotes/>
      <AnecdoteForm/>
    </div>
  )
}

export default App