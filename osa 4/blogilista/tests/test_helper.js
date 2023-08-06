const Blog = require('../models/blog')

const initialBlogs = [
  { title: 'testi', author: 'testaaja', url: 'blogstesting.com', likes: 5 },
  { title: 'jargon', author: 'bloggaaja', url: 'fancyblog.com', likes: 69 },
  {
    title: 'koodausblogi',
    author: 'koodaaja24',
    url: 'coding24/7.com',
    likes: 7
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb
}
