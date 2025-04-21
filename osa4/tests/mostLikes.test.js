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

  test('when list has only one blog it returns the author and likes of that blog', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    assert.deepStrictEqual(result, {author: 'Edsger W. Dijkstra', likes: 5})
  })

  const listWithNoBlogs = [
  ]

  test('when list has 0 blogs the author is null and likes -Infinity', () => {
    const result = listHelper.mostLikes(listWithNoBlogs)
    assert.deepStrictEqual(result, {author: null, likes: -Infinity})
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
      author: 'Petter',
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

  test('when list has multiple blogs it finds the author with most likes and returns the author and sum of the likes', () => {
    const result = listHelper.mostLikes(listWithMultipleBlogs)
    assert.deepStrictEqual(result, {author: 'Petter', likes: 52})
  })
})