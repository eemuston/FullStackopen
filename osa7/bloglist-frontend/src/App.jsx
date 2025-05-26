import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';
import { useSetNotification } from "./NotificationContext";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const blogFormRef = useRef();
  const dispatch = useSetNotification()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      dispatch('CUSTOM', { message: 'wrong credentials', color: 'red' });
    }
  };

  
  const likeBlog = (id) => {
    const blog = blogs.find((b) => b.id === id);
    const likedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id };
    
    blogService.update(id, likedBlog).then((returnedBlog) => {
      setBlogs(
        blogs.map((blog) =>
          blog.id === likedBlog.id ? { ...returnedBlog, user: blog.user } : blog
      )
    );
    dispatch('LIKE',  { message: likedBlog.title });
  });
};

const deleteBlog = (blog) => {
  if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
    blogService
    .erase(blog.id)
    .then(() => {
      const filteredBlogs = blogs.filter((b) => b.id !== blog.id);
      setBlogs(filteredBlogs);
      dispatch('CUSTOM', { message: `${blog.title} by ${blog.author} has been deleted`, color: 'green'});
    })
    .catch((error) => {
      dispatch('CUSTOM', { message: `You are not authorized to delete ${blog.title}`, color: 'red'});
    });
  }
};

const loginForm = () => (
  <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          data-testid="username"
          onChange={({ target }) => setUsername(target.value)}
          />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          data-testid="password"
          onChange={({ target }) => setPassword(target.value)}
          />
      </div>
      <button type="submit">login</button>
    </form>
  );
  
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: 1
  })
  
  if ( result.isLoading ) {
    return <div>loading data...</div>
  }
  
  if ( result.isError ) {
    return <div>SOMETHING IS BROKEN BROTHER!</div>
  }
  
  const blogs = result.data

  const handleLogout = () => {
    console.log('clearing localstorage');
    window.localStorage.clear();
    setUser(null);
  };

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

  return (
    <div>
      <Notification />
      <h2>blogs</h2>
      {!user && loginForm()}
      {user && (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>log out</button>
          {
            <Togglable buttonLabel="create new blog" ref={blogFormRef}>
              <BlogForm />
            </Togglable>
          }
          {sortedBlogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              likeBlog={() => likeBlog(blog.id)}
              deleteBlog={() => deleteBlog(blog)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
