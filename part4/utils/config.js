const mongoose = require('mongoose')

const connectToDB = () => {
    try {
        mongoose.connect(process.env.DB_URL)
    } catch(err) {
        console.log(err)
    }
}

const PORT = process.env.PORT || 3003

module.exports = {connectToDB, PORT}