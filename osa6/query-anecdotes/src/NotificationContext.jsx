import { createContext, useReducer, useContext } from 'react'

const NotificationReducer = (state, action) => {
    switch (action.type){
        case "VOTE":
            return `Anecdote: "${action.payload}" voted!`
        case "NEW_ANECDOTE":
            return `Anecdote: "${action.payload}" created!`
        case "ERROR":
            return `Anecdote: "${action.payload}" is too short!`
        case "CLEAR":
            return ''
        default:
            return ''
    }
}

export const useNotificationValue = () => {
  const notificationandDispatch = useContext(NotificationContext)
  return notificationandDispatch[0]
}

export const useSetNotification = () => {
  const notificationandDispatch = useContext(NotificationContext)
  return notificationandDispatch[1]
}

const NotificationContext = createContext()

let timeoutId

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(NotificationReducer, '')
  
  const setNotification = (type, message) => {
    notificationDispatch({ type, payload: message })

    if (timeoutId) {
        clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
        notificationDispatch({ type: 'CLEAR' })
        timeoutId = null
  }, 5000)
}

  return (
    <NotificationContext.Provider value={[notification, setNotification]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext