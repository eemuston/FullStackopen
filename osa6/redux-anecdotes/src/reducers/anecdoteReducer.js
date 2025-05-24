import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    vote(state, action) {
      const votedAnecdote = state.find(a => a.id === action.payload)
      console.log("we here")
      if (votedAnecdote) {
        console.log("we here too")
        votedAnecdote.votes += 1
      }
    },
    appendAnecdote(state, action){
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { createAnecdote, vote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer