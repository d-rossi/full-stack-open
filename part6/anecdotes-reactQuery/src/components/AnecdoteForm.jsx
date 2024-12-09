import { useMutation, useQueryClient } from "@tanstack/react-query"
import anecdoteService from "../services/anecdotes"

const AnecdoteForm = ({ notificationDispatch }) => {
    const queryClient = useQueryClient()
    const newNoteMutation = useMutation({
        mutationFn: (anecdote) => anecdoteService.create(anecdote),
        onMutate: (anecdote) => {
            if (anecdote.length <= 5) { 
                throw new Error('Anecdote must be at least 5 characters long') 
            }
        },
        onSuccess: (anecdote) => {
            queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
            notificationDispatch({
                payload: {
                    message: `Successfully created anecdote '${anecdote.content}'`
                }
            })
            setTimeout(() => {
                notificationDispatch({ payload: { message: '' } })
            }, 5000)
        },
        onError: (error) => {
            notificationDispatch({
                payload: {
                    message: `ERROR: ${error.message}`
                }
            })
            setTimeout(() => {
                notificationDispatch({ payload: { message: '' } })
            }, 5000)
        }
    })
    const handleFormSubmit = (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        newNoteMutation.mutate(anecdote)
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