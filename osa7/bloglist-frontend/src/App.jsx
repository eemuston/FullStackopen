import { useState, useEffect, useRef } from 'react';
import blogService from './services/blogs';
import loginService from './services/login';
import userService from './services/users'
import Notification from './components/Notification';
import Blogs from './components/Blogs';
import Blog from './components/Blog';
import Users from './components/Users'
import User from './components/User'
import { useSetNotification } from "./NotificationContext";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useUser } from './UserContext'
import {
  Routes,
  Route,
  Link,
  Navigate,
  useMatch,
  useNavigate,
  useParams
} from "react-router-dom"

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useSetNotification()
  const queryClient = useQueryClient()
  const {user, userDispatch} = useUser()
  const navigate = useNavigate()
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: 1
  })
  const resultUser = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAllUsers,
    retry: 1
  })
  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      userDispatch({ type: 'LOGIN', payload: user})
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
      userDispatch({ type: 'LOGIN', payload: user})
      setUsername('');
      setPassword('');
    } catch (exception) {
      dispatch('CUSTOM', { message: 'wrong credentials', color: 'red' });
    }
  };
  
  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (likedBlog) => {
      queryClient.invalidateQueries(['blogs'])
      dispatch('LIKE',  { message: likedBlog.title });
    }
  })

  const likeBlog = (blog) => {
    updateBlogMutation.mutate({...blog, likes: blog.likes + 1})
  }

  const deleteBlogMutation = useMutation({
    mutationFn: (blog) => blogService.erase(blog.id),
    onSuccess: (_, blog) => {
      queryClient.invalidateQueries(['blogs'])
      dispatch('CUSTOM', { message: `${blog.title} by ${blog.author} has been deleted`, color: 'green'});
    },
    onError: () =>
    {
      dispatch('CUSTOM', { message: `You are not authorized to delete this blog`, color: 'red'});
    }
  })

 const deleteBlog = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlogMutation.mutate(blog)
      navigate('/')
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
  
  if ( result.isLoading || resultUser.isLoading ) {
    return <div>loading data...</div>
  }
  if ( result.isError || resultUser.isError ) {
    return <div>SOMETHING IS BROKEN BROTHER!</div>
  }
  const blogs = result.data
  const users = resultUser.data

  const handleLogout = () => {
    console.log('clearing localstorage');
    window.localStorage.clear();
    userDispatch({ type: 'LOGOUT' })
  };

  const padding = {
    padding: 5
  }

  return (
    <div>
      <Notification />
      <h2>blogs</h2>
      <div>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>
      </div>
      {!user && loginForm()}
      {user && (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>log out</button>
          <Routes>
            <Route path="/users" element={<Users users={users}/>} />
            <Route path="/users/:id" element={<User users={users}/>} />
            <Route path="/" element={<Blogs blogs={blogs}/>} />
            <Route path="/blogs/:id" element={<Blog blogs={blogs} user={user} likeBlog={likeBlog} deleteBlog={deleteBlog}/>} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
