const express = require('express')
const app = express()
const cors = require('cors')
const {connectToDB, PORT} = require('./utils/config')
const blogsRouter = require('./controllers/blogs')

app.use(cors())
app.use(express.json())
connectToDB()

app.use('/api/blogs', blogsRouter)

app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)})