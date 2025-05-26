import Togglable from "./Togglable"
import BlogForm from "./BlogForm"
import { useRef } from 'react';
import { Link } from "react-router-dom"

const Blogs = ({ blogs }) => {
    const blogFormRef = useRef()
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

    const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    };

    return (
        <div>
            <Togglable buttonLabel="create new blog" ref={blogFormRef}>
              <BlogForm />
            </Togglable>
            {sortedBlogs.map((blog) => (
                <div key={blog.id} style={blogStyle}>
                        <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
                </div>
            ))}
        </div>
    )
}

export default Blogs