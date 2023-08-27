import { useState } from 'react'

const Blog = ({ blog, handleLikes }) => {
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

  const addLike = (blog) => {
    const updateBlog = { ...blog }
    console.log('blogToUpdate: ', updateBlog)
    console.log('blog: ', blog)
    handleLikes(updateBlog)
    console.log('button clicked')
    console.log(like)
    setLike(like + 1)
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
        <p>
          likes: {like} <button onClick={addLike}>like</button>
        </p>
      )}
      {show && blog.author}{' '}
    </div>
  )
}

export default Blog
