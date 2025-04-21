const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('total likes', () => {
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

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  const listWithNoBlogs = [
  ]

  test('when list has 0 blogs the sum is 0', () => {
    const result = listHelper.totalLikes(listWithNoBlogs)
    assert.strictEqual(result, 0)
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

  test('when list has multiple blogs it counts the sum of all the likes', () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs)
    assert.strictEqual(result, 72)
  })
})