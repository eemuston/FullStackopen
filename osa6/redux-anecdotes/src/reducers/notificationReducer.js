import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        newNotification(state, action){
            return action.payload
        },
        clearNotification() {
            return ''
        }
    }
})

let timeoutId

export const showNotification = (message, seconds) => {
  return dispatch => {
    dispatch(newNotification(message))

    if (timeoutId) {
        clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      dispatch(clearNotification())
      timeoutId = null
    }, seconds * 1000)
  }
}

export const { newNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer