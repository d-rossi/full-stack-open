import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import anecdoteService from "../services/anecdotes"

const Anecdotes = ({ notificationDispatch }) => {
    const queryClient = useQueryClient()
    const query = useQuery({
        queryKey: ['anecdotes'],
        queryFn: () => anecdoteService.getAll(),
        retry: false
    })
    const updateNoteMutation = useMutation({
        mutationFn: anecdoteService.update,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    })
    
    if ( query.isLoading ) {    return <div>loading data...</div>  }
    if ( query.isError ) { return <div>Failed to load data!</div> }

    const handleVote = (anecdote) => {
        updateNoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
        notificationDispatch({payload: { message: "VOTED!" }})
        setTimeout(() => {
            notificationDispatch({ payload: { message: '' } })
        }, 5000)
    }

    const anecdotes = query.data
    return (
        <div>
            {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote => 
            <div key={anecdote.id}>
                {anecdote.content}
                <br/>
                has {anecdote.votes} <button onClick={() => handleVote(anecdote)}>Vote</button>
            </div>)}
        </div>
    )
}

export default Anecdotes