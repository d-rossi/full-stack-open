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

  routeHandler.delete('/:id', (request, response, next) => {
    Blog.findByIdAndDelete(request.params.id)
    .then(result => response.status(204).end())
    .catch(err => next(err))
  })

  routeHandler.put('/:id', (request, response, next) => {
    updatedBlog = {...request.body}
    Blog.findByIdAndUpdate(request.params.id, updatedBlog, { runValidators: true, new: true })
    .then(blog => response.status(200).json(blog))
    .catch(err => next(err))
  })

  module.exports = routeHandler