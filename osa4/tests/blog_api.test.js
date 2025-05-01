const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const blogs = await helper.blogsInDb()
  
    assert.strictEqual(blogs.length, helper.initialBlogs.length)
})

test('blog identifier field is named id', async () => {
    const blogs = await helper.blogsInDb()

    blogs.map(blog => {
        assert.ok(blog.id, 'Blog should have an id field')
        assert.strictEqual(typeof blog.id, 'string')
        assert.strictEqual(blog._id, undefined, '_id should not be present')
    })
})

test('a valid blog can be added ', async () => {
    const newBlog = {
        title: "Tämä on blogi",
        author: "Jussi",
        url: "www.blogi.fi",
        likes: 88,
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

    const title = blogsAtEnd.map(blog => blog.title)
    assert(title.includes('Tämä on blogi'))
    const author = blogsAtEnd.map(blog => blog.author)
    assert(author.includes('Jussi'))
    const url = blogsAtEnd.map(blog => blog.url)
    assert(url.includes('www.blogi.fi'))
  })

test('if likes propert is missing, the value will be 0 by default', async () => {
    const newBlog = {
        title: "Pöö",
        author: "Petteri",
        url: "www.Petskunblogi.fi",
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd[blogsAtEnd.length - 1].likes, 0)

  })

  test('blog without title or url is not added', async () => {
    const newBlog = {
      author: "Ismo",
      likes: 213
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  
    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })

after(async () => {
    await mongoose.connection.close()
})