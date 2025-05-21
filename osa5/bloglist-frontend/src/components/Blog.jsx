import { useState } from 'react'

const Blog = ({ blog, user, likeBlog, deleteBlog }) => {
  const [visible, setVisible] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return(
    <div style={blogStyle}>
      <div name="titleandauthor">
        {blog.title} {blog.author} <button onClick={toggleVisibility}>{visible ? <div>hide</div> : <div>view</div>}</button>
      </div>
      {visible && <div>
        <div>{blog.url}</div>
        <div>{blog.likes} <button onClick={likeBlog}>like</button></div>
        <div>{blog.user.name}</div>
        {user.id === blog.user.id && <button onClick={deleteBlog}>delete</button>}
      </div>}
    </div>
  )
}

export default Blog