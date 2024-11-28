const loginRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

loginRouter.post('/', async (request, response, next) => {
    const {username, password} = request.body
    const existingUser = await User.findOne({username: username})
    const isPasswordCorrect = existingUser === null ? false : await bcrypt.compare(password, existingUser.passwordHash)
    if (!(existingUser && isPasswordCorrect)) {
       return response.status(404).json({error: 'Username or password is invalid!'})
    }

    const token = jwt.sign({username: username, id: existingUser._id}, process.env.SECRET)
    response.status(200).json({token, username: username, name: existingUser.name})
})

module.exports = loginRouter