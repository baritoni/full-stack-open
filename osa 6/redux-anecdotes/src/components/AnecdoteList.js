import { useSelector, useDispatch } from 'react-redux'
import { updateAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    return filter !== ''
      ? anecdotes.filter((anecdote) => anecdote.content.includes(filter))
      : anecdotes
  })

  const dispatch = useDispatch()

  const vote = (anecdote) => {
    //console.log('vote', id)
    dispatch(updateAnecdote(anecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
  }
  const sortByVotes = (a, b) => {
    return b.votes - a.votes
  }

  return (
    <div>
      {anecdotes
        .slice()
        .sort(sortByVotes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  )
}

export default AnecdoteList
