import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

describe('testing render of blog object', () => {
  const blog = {
    title: 'Testing react',
    author: 'Ada Lovelace',
    url: 'http://www.react-testing.com',
    likes: 0,
    user: { username: 'testuser', name: 'tester' }
  }

  test('renders title by default', () => {
    render(<Blog blog={blog} />)

    const element = screen.getByText('Testing react')
    expect(element).toBeDefined()
  })

  test('does not render url by default', () => {
    render(<Blog blog={blog} />)

    const element = screen.queryByText(
      'http://www.react-testing-library-blog.com'
    )
    expect(element).toBeNull()
  })

  test('does not render likes by default', () => {
    render(<Blog blog={blog} />)

    const element = screen.queryByText(0)
    expect(element).toBeNull()
  })

  test('renders url, likes and user when view button is clicked', async () => {
    const { container } = render(<Blog blog={blog} user={''} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')

    await user.click(button)

    const urlElement = screen.getByText('http://www.react-testing.com')
    expect(urlElement).toBeDefined()

    const likesElement = screen.getByText('likes: 0')
    expect(likesElement).toBeDefined()

    const div = container.querySelector('.showUser')
    expect(div).toHaveTextContent('tester')
  })
  test('when like button is clicked twice, eventhandler function gets called twice', async () => {
    const mockHandler = jest.fn()

    render(<Blog blog={blog} user={'tonluo'} handleLikes={mockHandler} />)

    const user = userEvent.setup()

    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.dblClick(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
describe('testing blogform component', () => {
  test.only('callback function gets called with right properties when blog is added', async () => {
    const user = userEvent.setup()
    const createBlog = jest.fn()

    render(<BlogForm createBlog={createBlog} />)

    const inputs = screen.getAllByRole('textbox')

    const sendButton = screen.getByText('create')

    await user.type(inputs[0], 'Testing React...')
    await user.type(inputs[1], 'Ada Lovelace')
    await user.type(inputs[2], 'http://www.react-testing.com')
    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe(
      'Testing React...',
      'Ada LoveLace',
      'http://www.react-testing.com'
    )
  })
})
