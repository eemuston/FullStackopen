import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons' 

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setNewSearch] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const exists = persons.some(person => person.name === newName)
    if (exists === true)
    {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
      return;
    }
    if (newName.trim() === "" || newNumber.trim() === "")
    {
      alert(`Can't add empty name or number`)
      setNewName('')
      setNewNumber('')
      return;
    }
    const personObject = {
      name: newName,
      number: newNumber,
    }
    personService
    .create(personObject)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
    })
  }

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(searchName.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchName={searchName} setNewSearch={setNewSearch}/>
      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber}/>
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} />
    </div>
  )

}

export default App