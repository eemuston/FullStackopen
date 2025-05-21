import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container, blog
  const mockHandler = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    blog = {
      title: 'How to throw a disc?',
      author: 'Paul McBeth',
      url: 'www.foundationdiscgolf.com',
      likes: 2,
      user: {
        username: 'eemuston',
        name: 'Superuser',
        id: '681502ac9dac89920b5e4811'
      }
    }


    container = render(
      <Blog key={blog.id} blog={blog} user={blog.user} likeBlog={mockHandler}></Blog>
    ).container
  })

  test('only title and author are visible before clicking the view button', () => {
    screen.getByText('How to throw a disc? Paul McBeth')

    const url = screen.queryByText('www.foundationdiscgolf.com')
    const likes = screen.queryByText('2')
    expect(url).not.toBeInTheDocument()
    expect(likes).not.toBeInTheDocument()
  })

  test('url and likes are visible after clicking the button', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    expect(screen.getByText('www.foundationdiscgolf.com')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  test('the like button event handler gets called when the button is clicked', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)


    console.log(mockHandler.mock.calls)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})