const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  console.log('request.body: ', request.body)

  const user = request.user

  const blog = new Blog({
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  if (!blog.title || !blog.url) {
    return response.status(400).json({ error: 'url or title missing' })
  }

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
})

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const user = request.user
  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    return response.status(401).json({ error: 'Not valid user for operation' })
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes
  }

  await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(200).json(blog)
})

module.exports = blogsRouter
