const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(express.json())

morgan.token('body', req => {
    return JSON.stringify(req.body)
  })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


app.get("/api/persons", (request, response) => {      
    response.json(persons)
})

app.get("/api/persons/:id", (request, response) => {
    const person = persons.find(person => person.id === request.params.id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
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
    if (persons.find(person => person.name === name)) {
        return response.status(400).json({error: 'name must be unique'})
    }

    const person = {
        id: `${Math.max(...persons.map(person => person.id)) + 1}`,
        name: request.body.name,
        number: request.body.number,
    }
    persons = persons.concat(person)
    response.json(person)
})

app.delete("/api/persons/:id", (request, response) => {
    persons = persons.filter(person => person.id !== request.params.id)
    response.send(204).end()
})

app.get("/info", (request, response) => {
    const html = `
    <div>
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date()}</p>
    </div>`
    response.send(html)
})

app.listen(3001, () => {
    console.log("Server Running")
})