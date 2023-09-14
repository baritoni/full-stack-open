import Filter from './components/Filter.js'
import AnecdoteForm from './components/AnecdoteForm.js'
import AnecdoteList from './components/AnecdoteList.js'
import Notification from './components/Notification.js'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  )
}

export default App
