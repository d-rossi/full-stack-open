const mongoose = require('mongoose')
const DB_URL = process.env.DB_URL

mongoose.connect(DB_URL)

const personSchema = new mongoose.Schema({
  'name': {
    type: String,
    require: true,
    minLength: 3
  },
  'number': {
    type: String,
    required: true,
    validate: {
      validator: (number) => {
        return /^\d{2,3}-\d{5,}$/.test(number)
      },
      message: props => `${props.value} is not a valid phone number!`
    },
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedDocument) => {
    returnedDocument.id = returnedDocument._id.toString()
    delete returnedDocument._id
    delete returnedDocument.__v
  }
})

module.exports = mongoose.model('Person', personSchema)