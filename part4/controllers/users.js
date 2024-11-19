const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

userRouter.get('/', (request, response, next) => {
    User.find({}).then(users => response.status(200).json(users)).catch(err => next(err))
})

userRouter.post('/', async (request, response, next) => {
    const {username, name, password} = request.body
    if (password.length < 3) {
        response.status(400).json({error: 'password must be at least 3 characters long'})
    }
    const passwordHash = await bcrypt.hash(password, 10)
    const newUser = new User({username, name, passwordHash})
    try {
        const savedUser = await newUser.save()
        response.status(201).json(savedUser)
    } catch (err) {
        next(err)
    }
})

module.exports = userRouter