const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

/*
const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('bearer ')) {
    return authorization.replace('bearer ', '')
  }
  return null
}
*/

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  /*const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }*/
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
  //const decodedToken = jwt.verify(request.token, process.env.SECRET)
  const user = request.user
  console.log('user: ', user)
  const blog = await Blog.findById(request.params.id)
  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    response.status(404).json({ error: 'Not valid user for delete operation' })
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
