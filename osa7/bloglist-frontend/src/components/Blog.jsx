import { useParams } from "react-router-dom"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import commentService from "../services/comments";
import { useSetNotification } from "../NotificationContext";

const Blog = ({ blogs, user, likeBlog, deleteBlog }) => {
  const dispatch = useSetNotification()
  const queryClient = useQueryClient()
  const { id } = useParams()
  const blog = blogs.find((b) => b.id === id)
  const result = useQuery({
      queryKey: ['comments', blog.id],
      queryFn: () => commentService.getAllComments(blog.id),
      retry: 1
    })

   const newCommentMutation = useMutation({
    mutationFn: ({id, comment}) => commentService.createComment(id, comment),
    onSuccess: (newComment, variables) => {
      const blogId = variables.id
      const comments = queryClient.getQueryData(['comments', blogId])
      queryClient.setQueryData(['comments', blogId], comments.concat(newComment))
      dispatch('CUSTOM', { message: `Comment "${newComment.comment}" added!`, color: 'green' })
    },
  })

  const onCreate = async (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    event.target.comment.value = ''
    newCommentMutation.mutate({ id: blog.id , comment: { comment }})
  }
  
  if ( result.isLoading || !blog ) {
    return <div>loading data...</div>
  }
  if ( result.isError ) {
    return <div>SOMETHING IS BROKEN BROTHER!</div>
  }
  const comments = result.data
  return (
    <div>
      <h1>{blog.title} by {blog.author}</h1>
      <a href={blog.url}>{blog.url}</a>
      <div>
            {blog.likes} <button onClick={() => likeBlog(blog)}>like</button>
      </div>
      <div> added by {blog.user.name}</div>
      {user.id === blog.user.id && (
            <button onClick={() => deleteBlog(blog)}>delete</button>
      )}
      <div>
        <h3>create new comment</h3>
          <form onSubmit={onCreate}>
            <input name='comment'  />
            <button type="submit">create</button>
          </form>
      </div>
      <div>
        {comments.map((comment) => (
                <li key={comment.id}>{comment.comment}</li>
        ))}
      </div>
    </div>
  );
};

export default Blog;
