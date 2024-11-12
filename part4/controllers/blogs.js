const routeHandler = require('express').Router()
const Blog = require('../models/blog')

routeHandler.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
  
  routeHandler.post('/', (request, response, next) => {
    const blog = {...request.body, likes: !request.body.likes ? 0 : request.body.likes}
  
    new Blog(blog)
      .save()
      .then(result => {
        response.status(201).json(result)
      })
      .catch(err => next(err))
  })

  module.exports = routeHandler