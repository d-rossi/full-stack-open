import { useDispatch } from "react-redux"
import { addAnecdoteAction } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {
    const dispatcher = useDispatch()
    const handleFormSubmit = (event) => {
        event.preventDefault()
        dispatcher(addAnecdoteAction(event.target.anecdote.value))
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