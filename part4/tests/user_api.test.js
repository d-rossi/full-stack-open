const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const { closeDBConnection } = require('../utils/config')
const User = require('../models/user')

const api = supertest(app)

const USER_API = '/api/users'

const getExistingUsers = async () => {
    return await api.get(USER_API)
}

beforeEach(async () => {
    await User.deleteMany({})
})

describe('users', () => {
    test('create new user', async () => {
        const existingUsers = (await api.get(USER_API)).body

        const newUser = {username: "testUserName", name: "testName", password: "testPassword"}
        const response = await api.post(USER_API).send(newUser).expect(201)

        const currentUsers = (await api.get(USER_API)).body

        assert.strictEqual(currentUsers.length, existingUsers.length + 1)
        assert.strictEqual(response.password, undefined)
    })

    test('create new user should fail when userName under 3 characters', async () => {
        const newUser = {username: "t", name: "testName", password: "testPassword"}
        const response = await api.post(USER_API).send(newUser)
        assert.strictEqual(response.status, 400)
    })

    test('create new user should fail when userName not provided', async () => {
        const newUser = {name: "testName", password: "testPassword"}
        const response = await api.post(USER_API).send(newUser)
        assert.strictEqual(response.status, 400)
    })

    test('create new user should fail when password under 3 characters', async () => {
        const newUser = {username: "testUserName", name: "testName", password: "t"}
        const response = await api.post(USER_API).send(newUser)
        assert.strictEqual(response.status, 400)
    })

    test('create new user should fail when userName not unique', async () => {
        const newUser1 = {username: "testUserName1", name: "testName", password: "testPassword"}
        const responseUser1 = await api.post(USER_API).send(newUser1)

        const newUser2 = {username: "testUserName1", name: "newName", password: "newPassword"}
        const responseUser2 = await api.post(USER_API).send(newUser2)

        assert.strictEqual(responseUser1.status, 201)
        assert.strictEqual(responseUser2.status, 400)
    })
})

after(() => {closeDBConnection()})