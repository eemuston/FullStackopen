import Togglable from './Togglable';
import BlogForm from './BlogForm';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Blogs = ({ blogs }) => {
  const blogFormRef = useRef();
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  return (
    <BlogsView>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      <br />
      {sortedBlogs.map((blog) => (
        <div key={blog.id}>
          <BlogsDiv>
            <StyledLink to={`/blogs/${blog.id}`}>
              {blog.title} {blog.author}
            </StyledLink>
          </BlogsDiv>
        </div>
      ))}
    </BlogsView>
  );
};

const StyledLink = styled(Link)`
  color: #4ea8de;

  &:hover {
    color: white;
  }
`;
const BlogsView = styled.div`
  font-size: 1.5rem;
`;
const BlogsDiv = styled.div`
  background: #777;
  margin: 6px;
  padding: 7px;
  border-radius: 10px;
  text-align: center;
`;

export default Blogs;
