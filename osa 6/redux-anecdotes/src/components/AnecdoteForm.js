import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import {
  notificationDisplay,
  hideNotification
} from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    const message = `Added anecdote ${content}`
    //console.log('newAnecdote', newAnecdote)
    dispatch(createAnecdote(content))
    dispatch(notificationDisplay(message))
    setTimeout(() => {
      dispatch(hideNotification(message))
    }, 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
