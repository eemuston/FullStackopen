import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ message: null, color: null})
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

    useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification({ message:
        "wrong credentials"
      , color: "red"})
      setTimeout(() => {
        setNotification({ message: null, color: null })
      }, 5000)
    }
    
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
    .create(blogObject)
    .then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setNotification({ message:
        `a new blog ${blogObject.title} by ${blogObject.author} added`
      , color: "green"})
      setTimeout(() => {
        setNotification({ message: null, color: null })
      }, 5000)
    })
  }

   const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

    const handleLogout = () => {
    console.log("clearing localstorage")
    window.localStorage.clear()
    setUser(null)
  }

  return (
    <div>
      <Notification notification={notification} />
      <h2>blogs</h2>
      {!user && loginForm()}
      {user && <div>
       <p>{user.name} logged in</p>
       <button onClick={handleLogout}>log out</button>
        {
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog}/>
          </Togglable>
        }
         {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
        )}
      </div>
      } 
    </div>
  )
}

export default App