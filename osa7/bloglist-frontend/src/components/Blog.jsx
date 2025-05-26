import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import commentService from '../services/comments';
import { useSetNotification } from '../NotificationContext';
import { StyledButton } from '../App';
import styled from 'styled-components';

const Blog = ({ blogs, user, likeBlog, deleteBlog }) => {
  const dispatch = useSetNotification();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === id);
  const result = useQuery({
    queryKey: ['comments', blog.id],
    queryFn: () => commentService.getAllComments(blog.id),
    retry: 1,
  });

  const newCommentMutation = useMutation({
    mutationFn: ({ id, comment }) => commentService.createComment(id, comment),
    onSuccess: (newComment, variables) => {
      const blogId = variables.id;
      const comments = queryClient.getQueryData(['comments', blogId]);
      queryClient.setQueryData(
        ['comments', blogId],
        comments.concat(newComment)
      );
      dispatch('CUSTOM', {
        message: `Comment "${newComment.comment}" added!`,
        color: 'green',
      });
    },
  });

  const onCreate = async (event) => {
    event.preventDefault();
    const comment = event.target.comment.value;
    event.target.comment.value = '';
    newCommentMutation.mutate({ id: blog.id, comment: { comment } });
  };

  if (result.isLoading || !blog) {
    return <div>loading data...</div>;
  }
  if (result.isError) {
    return <div>SOMETHING IS BROKEN BROTHER!</div>;
  }
  const comments = result.data;
  console.log(blog.url);
  const formatUrl = (url) => {
    return url.startsWith('http') ? url : `https://${url}`;
  };
  return (
    <BlogView>
      <h2>
        {blog.title} by {blog.author}
      </h2>
      <Styleda
        href={`${formatUrl(blog.url)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {blog.url}
      </Styleda>
      <FormRow>
        <div>Likes:</div> {blog.likes}{' '}
        <StyledButton onClick={() => likeBlog(blog)}>like</StyledButton>
      </FormRow>
      <div> added by {blog.user.name}</div>
      {user.id === blog.user.id && (
        <StyledButton onClick={() => deleteBlog(blog)}>delete</StyledButton>
      )}
      <div>
        <h3>create new comment</h3>
        <form onSubmit={onCreate}>
          <FormRow>
            <StyledInput name="comment" />
            <StyledButton type="submit">create</StyledButton>
          </FormRow>
        </form>
      </div>
      <br />
      <div>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.comment}</li>
        ))}
      </div>
    </BlogView>
  );
};

const FormRow = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const StyledInput = styled.input`
  padding: 1px 10px;
  font-size: 1rem;
`;

const BlogView = styled.div`
  font-size: 1.5rem;
`;
const Styleda = styled.a`
  color: #4ea8de;

  &:hover {
    color: white;
  }
`;

export default Blog;
