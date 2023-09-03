import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

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
