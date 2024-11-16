const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

userRouter.post('/', async (request, response, next) => {
    const {username, name, password} = request.body
    const passwordHash = await bcrypt.hash(password, 10)
    const newUser = new User({username, name, passwordHash})
    const savedUser = await newUser.save()
    response.status(201).json(savedUser)
})

module.exports = userRouter