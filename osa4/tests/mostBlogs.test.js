const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('most blogs', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog, the author of that blog has most blogs', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    assert.deepStrictEqual(result, {author: 'Edsger W. Dijkstra', blogs: 1})
  })

  const listWithNoBlogs = [
  ]

  test('when list has 0 blogs the author is null and blogs -Infinity', () => {
    const result = listHelper.mostBlogs(listWithNoBlogs)
    assert.deepStrictEqual(result, {author: null, blogs: -Infinity})
  })

  const listWithMultipleBlogs = [
    {
      _id: '1',
      title: 'Moi',
      author: 'Jussi',
      url: 'htl',
      likes: 5,
      __v: 0
    },
    {
      _id: '2',
      title: 'hehe',
      author: 'Mikko',
      url: 'http://www',
      likes: 50,
      __v: 0
    },
    {
      _id: '3',
      title: 'joo',
      author: 'Petter',
      url: 'http:/.html',
      likes: 2,
      __v: 0
    },
    {
      _id: '4',
      title: 'woah',
      author: 'Roman',
      url: 'html',
      likes: 15,
      __v: 0
    },
    {
        _id: '5',
        title: 'wofah',
        author: 'Roman',
        url: 'html',
        likes: 3,
        __v: 0
      }
  ]

  test('when list has multiple blogs it finds the author with most blogs and returns the author and sum of blogs', () => {
    const result = listHelper.mostBlogs(listWithMultipleBlogs)
    assert.deepStrictEqual(result, {author: 'Roman', blogs: 2})
  })
})