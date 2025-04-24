const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('dummy', () => {
  test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
  })
})

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

  test('when list has multiple blogs it counts the sum of all the likes', () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs)
    assert.strictEqual(result, 75)
  })
})

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

  test('when list has multiple blogs it finds the author with most blogs and returns the author and sum of blogs', () => {
    const result = listHelper.mostBlogs(listWithMultipleBlogs)
    assert.deepStrictEqual(result, {author: 'Petter', blogs: 2})
  })
})

describe('most likes', () => {
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