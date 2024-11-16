const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    passwordHash: String
})

userSchema.set('toJSON', {
    transform: (document, returnedDocument) => {
      returnedDocument.id = returnedDocument._id.toString()
      delete returnedDocument._id
      delete returnedDocument.__v
      delete returnedDocument.passwordHash
    }
  })

module.exports = mongoose.model('User', userSchema)