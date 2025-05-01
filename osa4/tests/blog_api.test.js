const { test, after, beforeEach, describe } = require('node:test')
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

describe("get method tests for the blogs", () => {
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

    test('each blog object has id instead of _id', async () => {
        const blogs = await helper.blogsInDb()
    
        blogs.forEach(blog => {
            assert.ok(blog.id, 'Blog should have an id field')
            assert.strictEqual(typeof blog.id, 'string')
            assert.strictEqual(blog._id, undefined, '_id should not be present')
        })
    })
})


describe("the creation of a blog", () => {
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

    test('if likes property is missing, the value will be 0 by default', async () => {
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
  })

describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      const contents = blogsAtEnd.map(blog => blog.title)
      assert(!contents.includes(blogToDelete.content))

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
    })
  })

describe('updating a blog', () =>{
    test('succeeds with status code 200 if id and updation is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[1]

        const updatedBlog = {
            title: 'updated title',
            author: blogToUpdate.author,
            url: blogToUpdate.url,
            likes: blogToUpdate.likes + 5
        }
  
        await api.put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)
        
        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)

        const updated = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)
        assert.strictEqual(updated.title, 'updated title')
        assert.strictEqual(updated.likes, blogToUpdate.likes + 5)
    })
})

after(async () => {
    await mongoose.connection.close()
})