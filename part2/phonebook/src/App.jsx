import { useEffect, useState } from 'react'
import Search from './components/Search'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from "axios"

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchText, setSearchText] = useState('')
  
  const updateName = (event) => setNewName(event.target.value)
  const updateNumber = (event) => setNewNumber(event.target.value)
  const updateSearchText = (event) => setSearchText(event.target.value)

  const handleFormSubmit = (event) => {
    event.preventDefault()
    const personExists = persons.find(person => person.name === newName)
    if (personExists) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const newPerson = {
      id: persons.length + 1,
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then(response => setPersons(response.data))
  }, [])

  const filterPersons = searchText === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(searchText))

  return (
    <div>
      <h2>Phonebook</h2>
        <Search text={searchText} onChange={updateSearchText} />
      <h2>add a new</h2>
      <PersonForm onSubmit={handleFormSubmit} name={newName} onChangeName={updateName} number={newNumber} onChangeNumber={updateNumber} />
      <h2>Numbers</h2>
      <Persons filteredPersons={filterPersons} />
    </div>
  )
}

export default App