const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const {closeDBConnection} = require('../utils/config')
const Blog = require('../models/blog') 

const api = supertest(app)

const initialBlogs = [  
    {title: 'HTML is easy', author: 'author1', likes: 5, url: "testUrl.com"},  
    {title: 'Browser can execute only JavaScript', author: 'author2', likes: 7, url: "testUrl.com"}
]

beforeEach(async () => {
    await Blog.deleteMany({})
    await new Blog(initialBlogs[0]).save()
    await new Blog(initialBlogs[1]).save()
})

describe('blogs api', () => {
    test('retrieve all as json', async () => {
        await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
    })

    test('there are 2 blogs', async () => {
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, 2)
    })

    test('blog has id field', async () => {
        const response = await api.get('/api/blogs')
        assert(response.body[0].hasOwnProperty('id'))
    })

    test('should create new blog', async () => {
        const newBlog = {title: 'FSO is a great course', author: 'author3', likes: 10, url: "testUrl.com"}
        await api.post('/api/blogs').send(newBlog).expect(201)

        const response = await api.get('/api/blogs')

        assert.strictEqual(response.body.length, initialBlogs.length + 1)
        assert(response.body.find(blog => blog.title === newBlog.title))
    })

    test('missing likes defaults to zero', async () => {
        const newBlog = {title: 'FSO is a great course', author: 'author3', url: "testUrl.com"}
        const response = await api.post('/api/blogs').send(newBlog)

        assert.strictEqual(response.body.likes, 0)
    })

    test('url missing status 400', async () => {
        const newBlog = {title: 'FSO is a great course', author: 'author3'}
        const response = await api.post('/api/blogs').send(newBlog)

        assert.strictEqual(response.status, 400)
    })

    test('title missing status 400', async () => {
        const newBlog = {url: 'testUrl.com', author: 'author3'}
        const response = await api.post('/api/blogs').send(newBlog)

        assert.strictEqual(response.status, 400)
    })
})

after(() => {closeDBConnection()})