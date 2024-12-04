import AnecdoteForm from "./components/AnecdoteForm"
import Anecdotes from "./components/Anecdotes"
import Filter from "./components/Filter"

const App = () => {
  return (
    <div>
      <h1>Anecdotes</h1>
      <Filter/>
      <Anecdotes/>
      <AnecdoteForm/>
    </div>
  )
}

export default App