const mongoose = require('mongoose')

const PASSWORD = process.argv[2]

const URI = `mongodb+srv://fullstackopen:${PASSWORD}@freecluster.z6kf8.mongodb.net/?retryWrites=true&w=majority&appName=FreeCluster`

mongoose.connect(URI)

const name = process.argv[3]
const number = process.argv[4]

const personSchema = new mongoose.Schema({
  'name': String,
  'number': String
})

const Person = mongoose.model('Person', personSchema)

if (!name || !number) {
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => console.log(`${person.name} ${person.number}`))
    mongoose.connection.close()
  })
} else {
  const person = new Person({
    'name': name,
    'number': number
  })

  person.save().then(savedPerson => {
    console.log(`added ${savedPerson.name} number ${savedPerson.number} to phonebook`)
    mongoose.connection.close()
  })
}
