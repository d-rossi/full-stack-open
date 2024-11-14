const mongoose = require('mongoose')

const connectToDB = () => {
    try {
        const DB_URL = process.env.NODE_ENV === 'test' ? process.env.DB_TEST_URL : process.env.DB_URL
        mongoose.connect(DB_URL)
    } catch(err) {
        console.log(err)
    }
}

const closeDBConnection = () => {
    mongoose.connection.close()
}

const PORT = process.env.PORT || 3003

module.exports = {connectToDB, closeDBConnection, PORT}