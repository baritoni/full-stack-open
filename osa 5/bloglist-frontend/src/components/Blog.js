import { useState } from 'react'

const Blog = ({ blog, handleLikes, deleteBlog, user }) => {
  console.log('blogusername: ', blog.user.username)
  console.log('username: ', user.username)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    fontWeight: 'normal',
    fontSize: 18
  }

  const [show, toggleShow] = useState(false)
  const [like, setLike] = useState(blog.likes)

  const addLike = () => {
    const updateBlog = { ...blog }
    //console.log('blogToUpdate: ', updateBlog)
    //console.log('blog: ', blog)
    handleLikes(updateBlog)
    //console.log('button clicked')
    //console.log(like)
    setLike(like + 1)
  }

  const removeSelected = () => {
    const remove = { ...blog }
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteBlog(remove)
    }
  }

  if (user.username === blog.user.username) {
    return (
      <div style={blogStyle}>
        <div>
          <p>
            {blog.title}
            <button onClick={() => toggleShow(!show)}>
              {show ? 'Hide' : 'View'}
            </button>
          </p>
        </div>
        {show && blog.url}
        {show && (
          <div>
            <p>
              likes: {like} <button onClick={addLike}>like</button>
            </p>
            {blog.author}
            <p>
              <button onClick={removeSelected}>remove </button>
            </p>
          </div>
        )}
      </div>
    )
  }
  return (
    <div style={blogStyle}>
      <div>
        <p>
          {blog.title}
          <button onClick={() => toggleShow(!show)}>
            {show ? 'Hide' : 'View'}
          </button>
        </p>
      </div>
      {show && blog.url}
      {show && (
        <div>
          <p>
            likes: {like} <button onClick={addLike}>like</button>
          </p>
          {blog.author}
        </div>
      )}
    </div>
  )
}

export default Blog
