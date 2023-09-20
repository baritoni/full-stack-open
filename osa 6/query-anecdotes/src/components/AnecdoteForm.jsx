import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useContext } from 'react'
import AnecdoteContext from '../AnecdoteContext'

const AnecdoteForm = () => {
  const [notification, dispatchNotification] = useContext(AnecdoteContext)
  const queryClient = useQueryClient()
  const newNoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    if (content.length > 4) {
      newNoteMutation.mutate({ content, votes: 0 })
      dispatchNotification({
        type: 'SHOW',
        message: `you added ${content}`
      })
      setTimeout(() => {
        dispatchNotification({ type: 'HIDE' })
      }, 5000)
    } else {
      dispatchNotification({
        type: 'ERROR',
        payload: 'too short anecdote, must have length 5 or more'
      })
      setTimeout(() => {
        dispatchNotification({ type: 'HIDE' })
      }, 5000)
      return null
    }
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
