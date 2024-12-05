import { useDispatch, useSelector } from "react-redux"
import { incrementVote, setAnecdotes } from "../reducers/anecdoteReducer"
import { setMessage } from "../reducers/notificationReducer"
import { useEffect } from "react"
import anecdoteService from '../services/anecdotes'

const Anecdotes = () => {
    const anecdotes = useSelector(({anecdotes, filter}) => {
        return anecdotes.filter(anecdote => anecdote.content.includes(filter.filterString)).sort((a, b) => b.votes - a.votes)
    })
    const dispatcher = useDispatch()

    const handleVote = (anecdote) => {
        anecdoteService.update({...anecdote, votes: anecdote.votes+1}).then(anecdote => dispatcher(incrementVote(anecdote.id)))
        dispatcher(setMessage(`YOU voted '${anecdote.content}'`))
        setTimeout(() => {
            dispatcher(setMessage(''))
        }, 5000)
    }

    useEffect(() => {
        anecdoteService.getAll().then(anecdotes => dispatcher(setAnecdotes(anecdotes)))
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