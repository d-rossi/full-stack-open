const routeHandler = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

routeHandler.get('/', (request, response) => {
    Blog
      .find({}).populate('user')
      .then(blogs => {
        response.json(blogs)
      })
  })
  
  routeHandler.post('/', (request, response, next) => {
    User.findById(request.user.id)
    .then(user => {
      const blog = {...request.body, likes: !request.body.likes ? 0 : request.body.likes, user: user._id}
      new Blog(blog)
      .save()
      .then(result => {
        response.status(201).json(result)
      })
      .catch(err => next(err))
    })
    .catch(err => next(err))
  })

  routeHandler.delete('/:id', (request, response, next) => {
    Blog.findById(request.params.id)
    .then(blog => {
      if (!blog) return response.status(404).end()
      if (blog.user.toString() === request.user.id.toString()) {
        Blog.findByIdAndDelete(request.params.id).then(() =>  response.status(204).end()).catch(err => next(err))
      } else response.status(401).json({error: 'You are not authorized to delete a blog you have not created!'})
    })
    .catch(err => next(err))
  })

  routeHandler.put('/:id', (request, response, next) => {
    updatedBlog = {...request.body}
    Blog.findByIdAndUpdate(request.params.id, updatedBlog, { runValidators: true, new: true })
    .populate('user')
    .then(blog => response.status(200).json(blog))
    .catch(err => next(err))
  })

  module.exports = routeHandler