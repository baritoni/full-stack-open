import { useState } from 'react'

const Blog = ({ blog }) => {
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
          likes: {blog.likes} <button>like</button>
        </p>
      )}
      {show && blog.author}{' '}
    </div>
  )
}

export default Blog
