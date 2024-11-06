const mongoose = require('mongoose')

const DB_URL = process.env.DB_URL

mongoose.connect(DB_URL)

const personSchema = new mongoose.Schema({
    "name": String,
    "number": String
})

personSchema.set("toJSON", {
    transform: (document, returnedDocument) => {
        returnedDocument.id = returnedDocument._id.toString()
        delete returnedDocument._id
        delete returnedDocument.__v
    }
})

module.exports = mongoose.model("Person", personSchema)