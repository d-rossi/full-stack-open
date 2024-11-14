const errorHandler = (error, request, response, next) => {
    if (error.name === 'ValidationError') {
        return response.status(400).send({ error: error.message }).end()
    } else if (error.name === 'CastError') {
        return response.status(404).send({ error: error.message }).end()
    }
    next(error)
}

module.exports = errorHandler
