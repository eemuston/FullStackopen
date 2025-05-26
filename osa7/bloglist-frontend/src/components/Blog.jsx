import { useParams } from "react-router-dom"

const Blog = ({ blogs, user, likeBlog, deleteBlog }) => {
  const { id } = useParams()
  const blog = blogs.find((b) => b.id === id)
  return (
    <div>
      <h1>"{blog.title}" by {blog.author}</h1>
      <a href={blog.url}>{blog.url}</a>
      <div>
            {blog.likes} <button onClick={() => likeBlog(blog)}>like</button>
      </div>
      <div> added by {blog.user.name}</div>
      {user.id === blog.user.id && (
            <button onClick={() => deleteBlog(blog)}>delete</button>
      )}

    </div>
  );
};

export default Blog;
