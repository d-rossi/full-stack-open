import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import blogService from '../services/blog'

vi.mock('../services/blog')

describe('<Blog>', () => {
  test('render Blog', () => {
    const blogToDisplay = { title: 'testTitle', author: 'testAuthor', url: 'testUrl.com', likes: 0 }
    const loggedInUsername = 'testUsername'

    render(<Blog blogToDisplay={blogToDisplay} loggedInUsername={loggedInUsername} />)
    const titleElement = screen.getByText(blogToDisplay.title, { exact:false })
    const authorElement = screen.getByText(blogToDisplay.author, { exact:false })
    const detailsElement = screen.queryByTestId('details')
    expect(titleElement).toBeDefined()
    expect(authorElement).toBeDefined()
    expect(detailsElement).toBeNull()
  })

  test('show url and likes', async () => {
    const blogToDisplay = { title: 'testTitle', author: 'testAuthor', url: 'testUrl.com', likes: 0,  user: { name: 'testName' } }
    const loggedInUsername = 'testUsername'

    render(<Blog blogToDisplay={blogToDisplay} loggedInUsername={loggedInUsername} />)

    const button = screen.queryByTestId('detailsBtn')
    const user = userEvent.setup()
    await user.click(button)

    const urlElement = screen.getByText(blogToDisplay.url, { exact:false })
    const likesElement = screen.getByText(`Likes ${blogToDisplay.likes}`, { exact:false })

    expect(urlElement).toBeDefined()
    expect(likesElement).toBeDefined()
  })

  test('click likes button triggers blog update', async () => {
    const blogToDisplay = { title: 'testTitle', author: 'testAuthor', url: 'testUrl.com', likes: 0,  user: { name: 'testName' } }
    const loggedInUsername = 'testUsername'

    const container = render(<Blog blogToDisplay={blogToDisplay} loggedInUsername={loggedInUsername} />)

    const detailsButton = screen.queryByTestId('detailsBtn')
    const user = userEvent.setup()
    await user.click(detailsButton)

    blogService.update.mockResolvedValue({ ...blogToDisplay, likes: blogToDisplay.likes + 1 })
    const likesButton = screen.queryByTestId('likesBtn')
    await user.click(likesButton)
    await user.click(likesButton)
    expect(blogService.update).toHaveBeenCalledTimes(2)
  })
})