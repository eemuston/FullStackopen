const countBy = require('lodash/countBy')

const dummy = (blogs) => {
  if (blogs)
    return 1
  return 1
}

const totalLikes = (blogs) => {
  const totalSum = blogs.reduce((sum, blog) => sum + blog.likes, 0)
  return totalSum
}

const favouriteBlog = (blogs) => {
  if (blogs.length === 0)
    return {}
  const favourite = blogs.reduce((max, blog) => blog.likes > max.likes ? blog : max)
  return favourite
}

const mostBlogs = (blogs) => {
    const authorsBlogs = countBy(blogs.map(blog => blog.author))
    const mostBlogs = Object.entries(authorsBlogs).reduce((max, [author, blogs]) =>
         blogs > max.blogs ? {author, blogs} : max,
     {author: null, blogs: -Infinity})
    return mostBlogs
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs
}