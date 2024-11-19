const { test, describe, beforeEach, after, before } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const {closeDBConnection} = require('../utils/config')
const Blog = require('../models/blog') 
const User = require('../models/user') 

const api = supertest(app)

const initialBlogs = [  
    {title: 'HTML is easy', author: 'author1', likes: 5, url: "testUrl.com"},  
    {title: 'Browser can execute only JavaScript', author: 'author2', likes: 7, url: "testUrl.com"}
]

const newUser = {username: 'testUsername', name: 'testName', password: 'testPassword'}
let token = null

beforeEach(async () => {
    await User.deleteMany({})
    const user = await api.post('/api/users').send(newUser)
    response = await api.post('/api/login').send(newUser)
    token = response.body.token
    initialBlogs[0].user = user.body.id
    initialBlogs[1].user = user.body.id

    await Blog.deleteMany({})
    await new Blog(initialBlogs[0]).save()
    await new Blog(initialBlogs[1]).save()
})

describe('blogs api', () => {
    test('retrieve all as json', async () => {
        await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/).set('Authorization', `Bearer ${token}`)
    })

    test('there are 2 blogs', async () => {
        const response = await api.get('/api/blogs').set('Authorization', `Bearer ${token}`)
        assert.strictEqual(response.body.length, 2)
    })

    test('blog has id field', async () => {
        const response = await api.get('/api/blogs').set('Authorization', `Bearer ${token}`)
        assert(response.body[0].hasOwnProperty('id'))
    })

    test('should create new blog', async () => {
        const newBlog = {title: 'FSO is a great course', author: 'author3', likes: 10, url: "testUrl.com"}
        await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlog)

        const response = await api.get('/api/blogs').set('Authorization', `Bearer ${token}`)

        assert.strictEqual(response.body.length, initialBlogs.length + 1)
        assert(response.body.find(blog => blog.title === newBlog.title))
    })

    test('missing likes defaults to zero', async () => {
        const newBlog = {title: 'FSO is a great course', author: 'author3', url: "testUrl.com"}
        const response = await api.post('/api/blogs').send(newBlog).set('Authorization', `Bearer ${token}`)

        assert.strictEqual(response.body.likes, 0)
    })

    test('url missing status 400', async () => {
        const newBlog = {title: 'FSO is a great course', author: 'author3'}
        const response = await api.post('/api/blogs').send(newBlog).set('Authorization', `Bearer ${token}`)

        assert.strictEqual(response.status, 400)
    })

    test('title missing status 400', async () => {
        const newBlog = {url: 'testUrl.com', author: 'author3'}
        const response = await api.post('/api/blogs').send(newBlog).set('Authorization', `Bearer ${token}`)

        assert.strictEqual(response.status, 400)
    })

    test('token missing status 401', async () => {
        const newBlog = {title: 'FSO is a great course', author: 'author3', likes: 10, url: "testUrl.com"}
        const response = await api.post('/api/blogs').send(newBlog)

        assert.strictEqual(response.status, 401)
    })

    test('delete a blog', async () => {
        const blogsBeforeDeletion = (await api.get('/api/blogs').set('Authorization', `Bearer ${token}`)).body
        const blogIdToDelete = blogsBeforeDeletion[0].id
        await api.delete(`/api/blogs/${blogIdToDelete}`).set('Authorization', `Bearer ${token}`)
        const blogsAfterDeletion = (await api.get('/api/blogs').set('Authorization', `Bearer ${token}`)).body
        assert.strictEqual(blogsAfterDeletion.length, blogsBeforeDeletion.length - 1)
    })

    test('delete a blog invalid id', async () => {
        const response = await api.delete(`/api/blogs/randomId`).set('Authorization', `Bearer ${token}`)
        assert.strictEqual(response.status, 404)
    })

    test('update a blog', async () => {
        const blogsBeforeUpdate = (await api.get('/api/blogs').set('Authorization', `Bearer ${token}`)).body
        const updatedBlog = {...blogsBeforeUpdate[0], title: 'UPDATED TITLE', user: blogsBeforeUpdate[0].user.id}
        const updatedBlogResponse = await api.put(`/api/blogs/${blogsBeforeUpdate[0].id}`).send(updatedBlog).set('Authorization', `Bearer ${token}`)
        assert.strictEqual(updatedBlogResponse.body.title, updatedBlog.title)
    })

    test('update a blog invalid id', async () => {
        const updatedBlogResponse = await api.put(`/api/blogs/randomId`).send({}).set('Authorization', `Bearer ${token}`)
        assert.strictEqual(updatedBlogResponse.status, 404)
    })
})

after(() => {closeDBConnection()})