import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

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
          <input
            value={newTitle}
            id="title"
            onChange={handleTitleChange}
            placeholder="write title here"
          ></input>
        </div>
        <div>
          author:
          <input
            value={newAuthor}
            id="author"
            onChange={handleAuthorChange}
          ></input>
        </div>
        <div>
          url:<input value={newUrl} id="url" onChange={handleUrlChange}></input>
        </div>
        <button id="createButton" type="submit">
          create
        </button>
      </form>
    </div>
  )
}

export default BlogForm
