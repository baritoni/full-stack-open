import { createContext, useReducer } from 'react'

const AnecdoteContext = createContext()

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW':
      return action.message
    case 'HIDE':
      return ''
    case 'ERROR':
      return action.payload
    default:
      return state
  }
}

export const AnecdoteContextProvider = (props) => {
  const [notification, dispatchNotification] = useReducer(
    notificationReducer,
    ''
  )

  return (
    <AnecdoteContext.Provider value={[notification, dispatchNotification]}>
      {props.children}
    </AnecdoteContext.Provider>
  )
}

export default AnecdoteContext
