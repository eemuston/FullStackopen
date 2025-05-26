const commentsRouter = require('express').Router({mergeParams: true})
const Comment = require('../models/comment.js')
const Blog = require('../models/blog')

commentsRouter.get('/', async (request, response) => {
  const comments = await Comment.find({})
    .find({}).populate('blog', { title: 1, author: 1, id: 1})
  response.json(comments)
})

commentsRouter.post('/', async (request, response) => {
    const { comment } = request.body
    const blogId = req.params.blogId

    const blog = await Blog.findById(blogId)
    if (!blog) {
        return response.status(404).json({ error: 'Blog not found' })
    }

    const newComment = new Comment({
        comment,
        blog: blog._id
    })

    const savedComment = await newComment.save()
    blog.comments = blog.comments.concat(savedComment._id)
    await blog.save()
    await savedComment.populate({ title: 1, author: 1, id: 1})
    response.status(201).json(savedComment)
})

module.exports = commentsRouter