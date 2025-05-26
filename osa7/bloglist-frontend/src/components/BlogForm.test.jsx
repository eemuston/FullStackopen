import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';

test('<BlogForm /> calls the event handler with correct inputs when a new blog is created.', async () => {
  const user = userEvent.setup();
  const createBlog = vi.fn();

  render(<BlogForm createBlog={createBlog} />);

  const title = screen.getByLabelText('title:');
  const author = screen.getByLabelText('author:');
  const url = screen.getByLabelText('url:');
  const sendButton = screen.getByText('save');

  await user.type(title, 'Crazy Blog Title');
  await user.type(author, 'Crazy Blog Author');
  await user.type(url, 'www.crazyblog.com');
  await user.click(sendButton);

  console.log(createBlog.mock.calls);
  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe('Crazy Blog Title');
  expect(createBlog.mock.calls[0][0].author).toBe('Crazy Blog Author');
  expect(createBlog.mock.calls[0][0].url).toBe('www.crazyblog.com');
});
