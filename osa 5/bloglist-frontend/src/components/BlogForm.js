import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('testataan1')
  const [newAuthor, setNewAuthor] = useState('testaaja1')
  const [newUrl, setNewUrl] = useState('testiblog1.fi')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }
  return (
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
          url:<input value={newUrl} onChange={handleUrlChange}></input>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
