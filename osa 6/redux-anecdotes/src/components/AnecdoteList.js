import { useSelector, useDispatch } from 'react-redux'
import { voteSelected } from '../reducers/anecdoteReducer'
import {
  notificationDisplay,
  hideNotification
} from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    return filter !== ''
      ? anecdotes.filter((anecdote) => anecdote.content.includes(filter))
      : anecdotes
  })

  const dispatch = useDispatch()

  const vote = (id, content) => {
    console.log('vote', id)
    dispatch(voteSelected(id))

    const message = `You voted ${content}`
    dispatch(notificationDisplay(message))

    setTimeout(() => {
      dispatch(hideNotification(message))
    }, 5000)
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
              <button onClick={() => vote(anecdote.id, anecdote.content)}>
                vote
              </button>
            </div>
          </div>
        ))}
    </div>
  )
}

export default AnecdoteList
