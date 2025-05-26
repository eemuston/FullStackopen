import { useState, useEffect, useRef } from 'react';
import blogService from './services/blogs';
import loginService from './services/login';
import userService from './services/users';
import Notification from './components/Notification';
import Blogs from './components/Blogs';
import Blog from './components/Blog';
import Users from './components/Users';
import User from './components/User';
import { useSetNotification } from './NotificationContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useUser } from './UserContext';
import styled from 'styled-components';
import {
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
  useParams,
} from 'react-router-dom';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useSetNotification();
  const queryClient = useQueryClient();
  const { user, userDispatch } = useUser();
  const navigate = useNavigate();
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: 1,
  });
  const resultUser = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAllUsers,
    retry: 1,
  });

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      userDispatch({ type: 'LOGIN', payload: user });
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
      userDispatch({ type: 'LOGIN', payload: user });
      setUsername('');
      setPassword('');
    } catch (exception) {
      dispatch('CUSTOM', { message: 'wrong credentials', color: 'red' });
    }
  };

  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (likedBlog) => {
      queryClient.invalidateQueries(['blogs']);
      dispatch('LIKE', { message: likedBlog.title });
    },
  });

  const likeBlog = (blog) => {
    updateBlogMutation.mutate({ ...blog, likes: blog.likes + 1 });
  };

  const deleteBlogMutation = useMutation({
    mutationFn: (blog) => blogService.erase(blog.id),
    onSuccess: (_, blog) => {
      queryClient.invalidateQueries(['blogs']);
      dispatch('CUSTOM', {
        message: `${blog.title} by ${blog.author} has been deleted`,
        color: 'green',
      });
    },
    onError: () => {
      dispatch('CUSTOM', {
        message: `You are not authorized to delete this blog`,
        color: 'red',
      });
    },
  });

  const deleteBlog = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlogMutation.mutate(blog);
      navigate('/');
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username:
        <input
          type="text"
          value={username}
          name="Username"
          data-testid="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password:
        <input
          type="password"
          value={password}
          name="Password"
          data-testid="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <StyledButton type="submit">login</StyledButton>
    </form>
  );

  if (result.isLoading || resultUser.isLoading) {
    return <div>loading data...</div>;
  }
  if (result.isError || resultUser.isError) {
    return <div>SOMETHING IS BROKEN BROTHER!</div>;
  }
  const blogs = result.data;
  const users = resultUser.data;

  const handleLogout = () => {
    console.log('clearing localstorage');
    window.localStorage.clear();
    userDispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  return (
    <div>
      {!user && loginForm()}
      {user && (
        <div>
          <NavBar>
            <StyledLink to="/">blogs</StyledLink>
            <StyledLink to="/users">users</StyledLink>
            <span>{user.name} logged in</span>
            <StyledButton onClick={handleLogout}>log out</StyledButton>
          </NavBar>
          <Notification />
          <Container>
            <h1>Blog App</h1>
            <Routes>
              <Route path="/users" element={<Users users={users} />} />
              <Route path="/users/:id" element={<User users={users} />} />
              <Route path="/" element={<Blogs blogs={blogs} />} />
              <Route
                path="/blogs/:id"
                element={
                  <Blog
                    blogs={blogs}
                    user={user}
                    likeBlog={likeBlog}
                    deleteBlog={deleteBlog}
                  />
                }
              />
            </Routes>
          </Container>
        </div>
      )}
    </div>
  );
};

const NavBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: #222;
  color: #999;
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  padding: 0 40px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  gap: 10px;
`;

const Container = styled.div`
  padding: 30px;
  margin: 70px auto;
  width: 900px;
  border-radius: 12px;
  background: #222;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
`;

const StyledLink = styled(Link)`
  position: relative;
  font-size: 1.1rem;
  color: #666;
  text-decoration: none;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #666;
    transition: width 0.3s ease;
  }

  &:hover::before {
    width: 100%;
  }
`;

export const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  max-width: 240px;
  margin: 0;
  padding: 3px 10px;
  background-color: #666;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  color: #222;
  font-size: 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 1);

  &:hover {
    background-color: #999;
  }
`;

export default App;
