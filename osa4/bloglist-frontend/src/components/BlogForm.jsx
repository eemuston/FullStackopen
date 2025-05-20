import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
        title: newTitle,
        author: newAuthor,
        url: newUrl,
        likes: 0,
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
}

  return (
    <div>
    <form onSubmit={addBlog}>
      <div>
        <label>title:
        <input
          name='title'
          value={newTitle}
          onChange={event => setNewTitle(event.target.value)}
        />
        </label>
      </div>
      <div>
        <label>author:
        <input
          name='author'
          value={newAuthor}
          onChange={event => setNewAuthor(event.target.value)}
        />
        </label>
      </div>
      <div>
        <label>url:
        <input
          name='url'
          value={newUrl}
          onChange={event => setNewUrl(event.target.value)}
        />
        </label>
      </div>
      <button type="submit">save</button>
    </form>  
    </div>
  )
}

export default BlogForm