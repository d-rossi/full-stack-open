import { createSlice } from "@reduxjs/toolkit";

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

export default anecdoteSlice.reducer
export const { incrementVote, addAnecdote, setAnecdotes } = anecdoteSlice.actions