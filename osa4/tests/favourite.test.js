const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('favourite blog', () => {
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

  test('when list has only one blog, that one is the favourite', () => {
    const result = listHelper.favouriteBlog(listWithOneBlog)
    assert.deepStrictEqual(result, {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    })
  })

  const listWithNoBlogs = [
  ]

  test('when list has 0 blogs, it returns an empty object', () => {
    const result = listHelper.favouriteBlog(listWithNoBlogs)
    assert.deepStrictEqual(result, {})
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
    }
  ]

  test('when list has multiple blogs it returns the blog with most likes', () => {
    const result = listHelper.favouriteBlog(listWithMultipleBlogs)
    assert.deepStrictEqual(result, {
      _id: '2',
      title: 'hehe',
      author: 'Mikko',
      url: 'http://www',
      likes: 50,
      __v: 0
    })
  })

  const listWithMultipleEqualBlogs = [
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
      likes: 2,
      __v: 0
    },
    {
      _id: '3',
      title: 'joo',
      author: 'Petter',
      url: 'http:/.html',
      likes: 15,
      __v: 0
    },
    {
      _id: '4',
      title: 'woah',
      author: 'Roman',
      url: 'html',
      likes: 15,
      __v: 0
    }
  ]

  test('when list has multiple equal blogs it returns one of the blogs with most likes', () => {
    const result = listHelper.favouriteBlog(listWithMultipleEqualBlogs)
    assert.deepStrictEqual(result, {
      _id: '3',
      title: 'joo',
      author: 'Petter',
      url: 'http:/.html',
      likes: 15,
      __v: 0
    })
  })
})