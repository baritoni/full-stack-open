const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('return right amount of blogs', async () => {
  const response = await api.get('/api/blogs')
  const blogsAtEnd = await helper.blogsInDb()
  expect(response.body.length).toBe(blogsAtEnd.length)
})

test('returned blogs are JSON', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('returned blogs has field "id"', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'testing',
    author: 'tester',
    url: 'jippii.fi',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
})

test('likes with empty string is null', async () => {
  const newBlog = {
    title: 'newBlog',
    author: 'mySelf',
    url: 'justtesting.com'
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  const lastObject = blogsAtEnd.pop()

  expect(lastObject.likes).toBe(0)
})

test('title and url are required', async () => {
  const newBlog = {
    author: 'mySelf',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test
afterAll(async () => {
  await mongoose.connection.close()
})
