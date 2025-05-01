const Blog = require('../models/blog')

const initialBlogs = [
  {
      title: 'Moro nääs moro',
      author: 'meitsi',
      url: 'joopajoo',
      likes: 5,
  },
  {
      title: 'Tere nääs tere',
      author: 'teitsi',
      url: 'jipajii',
      likes: 54,
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', author: "Joopajoo", url: "wataa", likes: 2 })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}