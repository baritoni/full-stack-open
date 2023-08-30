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
    likes: 0
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
    render(<Blog blog={blog} username={'tonluo'} />)

    const user = userEvent.setup()
    const button = screen.getByText('View')

    await user.click(button)

    const urlElement = screen.getByText('http://www.react-testing.com')
    expect(urlElement).toBeDefined()

    const likesElement = screen.getByText('likes: 0')
    expect(likesElement).toBeDefined()
  })
})
