import { createSlice } from "@reduxjs/toolkit";

const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

const initialState = anecdotes.map((anecdote, index) => ({ id: index+1, text: anecdote, vote: 0 }))

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState,
    reducers: {
        incrementVote(state, action) {
            state.find(anecdote => anecdote.id === action.payload).vote++
        },
        addAnecdote(state, action) {
            state.push({id: state.length+1, text: action.payload, vote: 0})
        }
    }
})

export default anecdoteSlice.reducer
export const { incrementVote, addAnecdote } = anecdoteSlice.actions