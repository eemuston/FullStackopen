const blogsRouter = require('express').Router()
const Blog = require('../models/blog.js')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const user = request.user
  if (!user) {
    return response.status(401).json({ error: 'not authorized' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
    comments: []
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  await savedBlog.populate('user', { username: 1, name: 1 })
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }
  const user = request.user
  if (!user) {
    return response.status(404).json({ error: 'user not found' })
  }

  if (blog.user.toString() === user.id.toString()){
    await Blog.findByIdAndDelete(request.params.id)
    return response.status(204).end()
  }
  else{
    return response.status(401).json({ error: 'not authorized to delete this blog' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes, comments } = request.body

  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    response.status(404).end()
  }

  blog.title = title
  blog.author = author
  blog.url = url
  blog.likes = likes
  blog.comments = comments

  const updatedBlog = await blog.save()
  response.json(updatedBlog)
})

module.exports = blogsRouter