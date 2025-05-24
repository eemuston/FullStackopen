import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'
import { showNotification } from './notificationReducer'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const index = state.findIndex(a => a.id === action.payload.id)
      if (index !== -1) {
        state[index] = action.payload
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

export const { voteAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
    dispatch(showNotification(`You created anecdote: "${newAnecdote.content}"!`, 5))
  }
}

export const vote = id => {
  return async (dispatch, getState) => {
    const state = getState()
    const anecdote = state.anecdotes.find(a => a.id === id)
    if (!anecdote) return
    const votedAnecdote = {...anecdote, votes: anecdote.votes + 1}
    const updatedAnecdote = await anecdoteService.update(votedAnecdote)
    dispatch(voteAnecdote(updatedAnecdote))
    dispatch(showNotification(`You voted "${updatedAnecdote.content}"!`, 5))
  }
}

export default anecdoteSlice.reducer