import { useEffect, useState } from 'react'
import Search from './components/Search'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from "./services/persons"
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchText, setSearchText] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  
  const updateName = (event) => setNewName(event.target.value)
  const updateNumber = (event) => setNewNumber(event.target.value)
  const updateSearchText = (event) => setSearchText(event.target.value)

  const handleFormSubmit = (event) => {
    event.preventDefault()
    const personExists = persons.find(person => person.name === newName)

    const newPerson = {
      id: `${persons.length + 1}`,
      name: newName,
      number: newNumber
    }

    if (personExists) {
      if (!window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) return
      else {
        personsService.updatePerson(personExists.id, {...newPerson, id: personExists.id})
        .then(updatedPerson => {
          setPersons(persons.map(person => person.id === personExists.id ? updatedPerson : person))
          setSuccessMessage(`Updated ${newPerson.name} phone number`)
        })
        .catch(() => setErrorMessage(`Information of ${newPerson.name} has already been removed from server`))
      }
    } else {
      personsService.createPerson(newPerson).then(person => setPersons(persons.concat(person)))
      setSuccessMessage(`Added ${newPerson.name}`)
    }
    setNewName('')
    setNewNumber('')
    setTimeout(() => setSuccessMessage(null), 5000)
  }

  const handlePersonDeletion = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      personsService.deletePerson(id).then(deletedPerson => setPersons(persons.filter(person => person.id !== id)))
    }
  }

  useEffect(() => {
    personsService.getAllPersons().then(persons => setPersons(persons))
  }, [])

  const filterPersons = searchText === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(searchText))

  return (
    <div>
      <h2>Phonebook</h2>
        <Notification className="success" message={successMessage} />
        <Notification className="error" message={errorMessage} />
        <Search text={searchText} onChange={updateSearchText} />
      <h2>add a new</h2>
      <PersonForm onSubmit={handleFormSubmit} name={newName} onChangeName={updateName} number={newNumber} onChangeNumber={updateNumber} />
      <h2>Numbers</h2>
      <Persons filteredPersons={filterPersons} onDelete={handlePersonDeletion} />
    </div>
  )
}

export default App