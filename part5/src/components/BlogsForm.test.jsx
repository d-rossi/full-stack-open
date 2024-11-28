import { render, screen } from '@testing-library/react'
import BlogsForm from './BlogsForm'
import userEvent from '@testing-library/user-event'
import blogService from '../services/blog'

vi.mock('../services/blog')

describe('<BlogsForm>', () => {
  test('renders', () => {
    render(<BlogsForm />)
  })

  test('create new blog', async () => {
    const user = userEvent.setup()
    const updateBlogs = vi.fn()
    render(<BlogsForm updateBlogs={updateBlogs}/>)
    const titleInput = screen.getByTestId('titleInput')
    const authorInput = screen.getByTestId('authorInput')
    const urlInput = screen.getByTestId('urlInput')
    await user.type(titleInput, 'testTitle')
    await user.type(authorInput, 'testAuthor')
    await user.type(urlInput, 'testUrl')
    blogService.create.mockResolvedValue({ })
    const createBtn = screen.getByTestId('createBtn')
    await user.click(createBtn)
    expect(blogService.create).toHaveBeenCalledWith({ title: 'testTitle', author: 'testAuthor', url: 'testUrl' })
    expect(updateBlogs.mock.calls).toHaveLength(1)
  })
})