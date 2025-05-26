import { useState } from 'react';
import blogService from '../services/blogs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSetNotification } from '../NotificationContext';
import { StyledButton } from '../App';

const BlogForm = () => {
  const queryClient = useQueryClient();
  const dispatch = useSetNotification();
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newUrl, setNewUrl] = useState('');

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs']);
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog));
      dispatch('CUSTOM', {
        message: `new blog ${newBlog.title} by ${newBlog.author} created!`,
        color: 'green',
      });
      setNewTitle('');
      setNewAuthor('');
      setNewUrl('');
    },
  });

  const addBlog = (event) => {
    event.preventDefault();
    newBlogMutation.mutate({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0,
    });
  };

  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
          <label>
            title:
            <input
              name="title"
              value={newTitle}
              onChange={(event) => setNewTitle(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            author:
            <input
              name="author"
              value={newAuthor}
              onChange={(event) => setNewAuthor(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            url:
            <input
              name="url"
              value={newUrl}
              onChange={(event) => setNewUrl(event.target.value)}
            />
          </label>
        </div>
        <StyledButton type="submit">save</StyledButton>
      </form>
    </div>
  );
};

export default BlogForm;
