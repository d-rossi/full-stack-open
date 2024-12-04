import { useDispatch, useSelector } from "react-redux"
import { updateVoteAction } from "../reducers/anecdoteReducer"

const Anecdotes = () => {
    const anecdotes = useSelector(state => state.sort((a, b) => b.vote - a.vote))
    const dispatcher = useDispatch()
    return (
        <div>
            {anecdotes.map(anecdote => 
            <div key={anecdote.id}>
                {anecdote.text}
                <br/>
                has {anecdote.vote} <button onClick={() => dispatcher(updateVoteAction(anecdote.id))}>Vote</button>
            </div>)}
        </div>
    )
}

export default Anecdotes