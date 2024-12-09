import { useReducer } from "react"
import AnecdoteForm from "./components/AnecdoteForm"
import Anecdotes from "./components/Anecdotes"
import Filter from "./components/Filter"
import Notification from "./components/Notification"

const initialState = {
  message: ''
}

const notificationReducer = (state, action) => {
  return action.payload.message
}

const App = () => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  return (
    <div>
      <h1>Anecdotes</h1>
      <Notification message={notification}/>
      <Filter/>
      <Anecdotes notificationDispatch={notificationDispatch} />
      <AnecdoteForm notificationDispatch={notificationDispatch} />
    </div>
  )
}

export default App