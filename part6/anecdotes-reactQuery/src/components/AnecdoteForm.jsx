import { useMutation, useQueryClient } from "@tanstack/react-query"
import anecdoteService from "../services/anecdotes"

const AnecdoteForm = () => {
    const queryClient = useQueryClient()
    const newNoteMutation = useMutation({
        mutationFn: (anecdote) => anecdoteService.create(anecdote),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
        }
    })
    const handleFormSubmit = (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        newNoteMutation.mutate(anecdote)
        // dispatcher(showNotification(`Successfully created anecdote '${anecdote}'`, 5))
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