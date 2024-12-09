import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes"

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        incrementVote(state, action) {
            state.find(anecdote => anecdote.id === action.payload).votes++
        },
        addAnecdote(state, action) {
            state.push(action.payload)
        },
        setAnecdotes(state, action) {
            return action.payload
        }
    }
})

export const initializeAnecdotes = () => {
    return async (dispatch) => {
        const anecdotes = await anecdoteService.getAll()
        dispatch(setAnecdotes(anecdotes))
    }
}

export const createAnecdote = (anecdote) => {
    return async (dispatch) => {
        const createdAnecdote = await anecdoteService.create(anecdote)
        dispatch(addAnecdote(createdAnecdote))
    }
}

export const updateAnecdote = (anecdote) => {
    return async dispatch => {
       const updatedAnecdote = await anecdoteService.update(anecdote)
       dispatch(incrementVote(updatedAnecdote.id))
    }
}

export default anecdoteSlice.reducer
export const { incrementVote, addAnecdote, setAnecdotes } = anecdoteSlice.actions