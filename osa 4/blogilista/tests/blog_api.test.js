const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('return right amount of blogs', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(1)
})

test('returned blogs are JSON', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

afterAll(async () => {
  await mongoose.connection.close()
})
