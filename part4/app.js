const express = require('express')
const app = express()
const cors = require('cors')
const {connectToDB} = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const errorHandler = require('./utils/errorHandler')
const tokenExtractor = require('./utils/tokenExtractor')
const userExtractor = require('./utils/userExtractor')

app.use(cors())
app.use(express.json())
connectToDB()
app.use(tokenExtractor)

app.use('/api/blogs', userExtractor, blogsRouter) //userExtractor middleware is used only for blogsRouter
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(errorHandler)

module.exports = app