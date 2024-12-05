import { useDispatch, useSelector } from "react-redux"
import { incrementVote } from "../reducers/anecdoteReducer"
import { setMessage } from "../reducers/notificationReducer"

const Anecdotes = () => {
    const anecdotes = useSelector(({anecdotes, filter}) => {
        return anecdotes.filter(anecdote => anecdote.text.includes(filter.filterString)).sort((a, b) => b.vote - a.vote)
    })
    const dispatcher = useDispatch()
    const handleVote = (anecdote) => {
        dispatcher(incrementVote(anecdote.id))
        dispatcher(setMessage(`YOU voted '${anecdote.text}'`))
        setTimeout(() => {
            dispatcher(setMessage(''))
        }, 5000)
    }
    return (
        <div>
            {anecdotes.map(anecdote => 
            <div key={anecdote.id}>
                {anecdote.text}
                <br/>
                has {anecdote.vote} <button onClick={() => handleVote(anecdote)}>Vote</button>
            </div>)}
        </div>
    )
}

export default Anecdotes