const jwt = require('jsonwebtoken')

const userExtractor = (request, response, next) => {
    let decodedToken = null;
    try {
      decodedToken = jwt.verify(request.token, process.env.SECRET)
      request.user = decodedToken
    } catch(err) {
      return response.status(401).json({error: 'token invalid'})
    }
    next()
}

module.exports = userExtractor