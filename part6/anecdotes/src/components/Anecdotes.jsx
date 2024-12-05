import { useDispatch, useSelector } from "react-redux"
import { initializeAnecdotes, updateAnecdote } from "../reducers/anecdoteReducer"
import { showNotification } from "../reducers/notificationReducer"
import { useEffect } from "react"

const Anecdotes = () => {
    const anecdotes = useSelector(({anecdotes, filter}) => {
        return anecdotes.filter(anecdote => anecdote.content.includes(filter.filterString)).sort((a, b) => b.votes - a.votes)
    })
    const dispatcher = useDispatch()

    const handleVote = (anecdote) => {
        dispatcher(updateAnecdote(anecdote))
        dispatcher(showNotification(`YOU voted '${anecdote.content}'`, 5))
    }

    useEffect(() => {
        dispatcher(initializeAnecdotes())
    }, [])
    
    return (
        <div>
            {anecdotes.map(anecdote => 
            <div key={anecdote.id}>
                {anecdote.content}
                <br/>
                has {anecdote.votes} <button onClick={() => handleVote(anecdote)}>Vote</button>
            </div>)}
        </div>
    )
}

export default Anecdotes