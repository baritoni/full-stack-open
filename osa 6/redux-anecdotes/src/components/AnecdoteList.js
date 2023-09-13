import { useSelector, useDispatch } from 'react-redux'
import { voteSelected } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    //console.log('state: ', state)
    return filter !== ''
      ? anecdotes.filter((anecdote) => anecdote.content.includes(filter))
      : anecdotes
  })

  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteSelected(id))
  }

  const sortByVotes = (a, b) => {
    return b.votes - a.votes
  }

  return (
    <div>
      {anecdotes.sort(sortByVotes).map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
