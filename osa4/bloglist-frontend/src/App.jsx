import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ message: null, color: null})

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

    const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0,
    }
    blogService
    .create(blogObject)
    .then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setNotification({ message:
        `a new blog ${newTitle} by ${newAuthor} added`
      , color: "green"})
      setTimeout(() => {
        setNotification({ message: null, color: null })
      }, 5000)
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
    })
  }

  const handleBlogChange = (event) => {
    const {name, value} = event.target
    if (name === 'title') setNewTitle(event.target.value)
    else if (name === 'author') setNewAuthor(event.target.value)
    else if (name === 'url') setNewUrl(event.target.value)
  }

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        <label>title:
        <input
          name='title'
          value={newTitle}
          onChange={handleBlogChange}
        />
        </label>
      </div>
      <div>
        <label>author:
        <input
          name='author'
          value={newAuthor}
          onChange={handleBlogChange}
        />
        </label>
      </div>
      <div>
        <label>url:
        <input
          name='url'
          value={newUrl}
          onChange={handleBlogChange}
        />
        </label>
      </div>
      <button type="submit">save</button>
    </form>  
  )

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
        <h3>create new</h3>
        {blogForm()}
         {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
        )}
      </div>
      } 
    </div>
  )
}

export default App