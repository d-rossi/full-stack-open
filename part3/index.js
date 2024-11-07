const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require("./models/person")
const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

morgan.token('body', req => {
    return JSON.stringify(req.body)
  })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get("/api/persons", (request, response) => {
    Person.find({}).then(persons => response.json(persons))
})

app.get("/api/persons/:id", (request, response, next) => {
    Person.findById(request.params.id).then(person => person ? response.json(person) : response.status(404).end()).catch(err => next(err))
})

app.post("/api/persons", (request, response) => {
    const name = request.body.name
    const number = request.body.number
    if (!name) {
        return response.status(400).json({error: 'name is missing'})
    }
    if (!number) {
        return response.status(400).json({error: 'number is missing'})
    }
    console.log(name)

    Person.find({name: name}).then(persons => {
        if (persons.length > 0) {return response.status(400).json({error: 'name must be unique'})}
        else {
            const person = new Person({
                name: request.body.name,
                number: request.body.number,
            })
        
            person.save().then(savedPerson => response.json(savedPerson))
        }
    })
})

app.put("/api/persons/:id", (request, response, next) => {
    const person = {
        name: request.body.name,
        number: request.body.number,
    }
    Person.findByIdAndUpdate(request.params.id, person, {new: true}).then(updatedPerson => response.json(updatedPerson)).catch(err => next(err))
})

app.delete("/api/persons/:id", (request, response, next) => {
    Person.findByIdAndDelete(request.params.id).then(person =>  response.sendStatus(204).end()).catch(err => next(err))
})

app.get("/info", (request, response) => {
    Person.countDocuments({}).then(count => {
        const html = `
        <div>
            <p>Phonebook has info for ${count} people</p>
            <p>${new Date()}</p>
        </div>`
        response.send(html)
    })
})

const unknownEndpoint = (request, response) => {
    response.status(404).send("Unknown Endpoint").end()
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError') {
        return response.status(400).send({error: "malformed id"}).end()
    }
    next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`)
})