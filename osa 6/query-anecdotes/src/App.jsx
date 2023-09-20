import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateAnecdote } from './requests'
import { useContext } from 'react'
import AnecdoteContext from './AnecdoteContext'

const App = () => {
  const [notification, dispatchNotification] = useContext(AnecdoteContext)
  const queryClient = useQueryClient()
  const handleVote = (anecdote) => {
    console.log('vote')
    console.log('anecdote:', anecdote)
    updateNoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    dispatchNotification({
      type: 'SHOW',
      message: `anecdote '${anecdote.content}' voted`
    })
    setTimeout(() => {
      dispatchNotification({ type: 'HIDE' })
    }, 5000)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })
  console.log('result: ', result)
  console.log(JSON.parse(JSON.stringify(result)))

  const updateNoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  } else if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
