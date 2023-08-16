import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './styles/app.css'
import Error from './components/Error'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('testataan1')
  const [newAuthor, setNewAuthor] = useState('testaaja1')
  const [newUrl, setNewUrl] = useState('testiblog1.fi')
  const [username, setUsername] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      console.log(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
    //console.log('typing on title: ', newTitle)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
    //console.log('typing on author: ', newAuthor)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
    //console.log('typing on author: ', newUrl)
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog))
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
      setNotificationMessage(
        `a new blog ${blogObject.title} by ${blogObject.author} added`
      )
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    })
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Error errorMessage={errorMessage} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }
  return (
    <div>
      <div>
        <h2>blogs</h2>
        <Notification notificationMessage={notificationMessage} />
        <p className="logged">
          {user.name} logged in <button onClick={logout}>logout</button>
        </p>
        <div>
          <h2>create new</h2>
          <form onSubmit={addBlog}>
            <div>
              title:
              <input value={newTitle} onChange={handleTitleChange}></input>
            </div>
            <div>
              author:
              <input value={newAuthor} onChange={handleAuthorChange}></input>
            </div>
            <div>
              ulr:<input value={newUrl} onChange={handleUrlChange}></input>
            </div>
            <button type="submit">create</button>
          </form>
        </div>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  )
}
export default App
