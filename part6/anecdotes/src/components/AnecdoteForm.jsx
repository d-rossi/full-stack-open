import { useDispatch } from "react-redux"
import { addAnecdote } from "../reducers/anecdoteReducer"
import { setMessage } from "../reducers/notificationReducer"
import anecdoteService from "../services/anecdotes"

const AnecdoteForm = () => {
    const dispatcher = useDispatch()
    const handleFormSubmit = (event) => {
        event.preventDefault()
        anecdoteService.create(event.target.anecdote.value).then(anecdote =>  dispatcher(addAnecdote(anecdote)))
        dispatcher(setMessage(`Successfully created anecdote '${event.target.anecdote.value}'`))
        setTimeout(() => {
            dispatcher(setMessage(''))
        }, 5000)
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