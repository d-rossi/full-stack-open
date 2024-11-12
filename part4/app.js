const express = require('express')
const app = express()
const cors = require('cors')
const {connectToDB} = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const errorHandler = require('./utils/errorHandler')

app.use(cors())
app.use(express.json())
connectToDB()

app.use('/api/blogs', blogsRouter)

app.use(errorHandler)

module.exports = app