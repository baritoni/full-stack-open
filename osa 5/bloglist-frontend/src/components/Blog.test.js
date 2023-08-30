import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
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
  test.only('when like button is clicked twice, eventhandler function gets called twice', async () => {
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
