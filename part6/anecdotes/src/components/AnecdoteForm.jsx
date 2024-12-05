import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { showNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
    const dispatcher = useDispatch()
    const handleFormSubmit = (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        dispatcher(createAnecdote(anecdote))
        dispatcher(showNotification(`Successfully created anecdote '${anecdote}'`, 5))
        event.target.anecdote.value = ''
    }

    return (
        <div>
            <h2>Add a New Anecdote</h2>
            <form onSubmit={handleFormSubmit}>
                Anecdote: <input name='anecdote'/>
                <button type="submit">Add</button>
            </form>
        </div>
    )
}

export default AnecdoteForm