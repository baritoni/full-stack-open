import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const createAnecdote = (newAnecdote) => {
  console.log('newAnecdote: ', newAnecdote)
  if (newAnecdote.content.length > 4) {
    axios.post(baseUrl, newAnecdote).then((res) => res.data)
  } else {
    return null
  }
}
