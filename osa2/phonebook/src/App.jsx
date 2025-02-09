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
    const exists = persons.some(person => person.name === newName)
    if (exists === true) 
    {
      const update = persons.find(person => person.name === newName);
      if (update && update.number !== newNumber) 
      {
        if (window.confirm(`${newName} already exists in the phonebook! Do you want to update their number?`)) 
        {  
          personService
            .update(update.id, personObject)
            .then(returnedPerson => {
              setPersons(persons.map(p => (p.id !== update.id ? p : returnedPerson)));
              setNewName('');
              setNewNumber('');
            })
        }
        setNewName('');
        setNewNumber('');
        return ;
      }
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
      return;
    }
    personService
    .create(personObject)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
    })
  }

  const erasePerson = (person) => {
    if (window.confirm(`Do you really want to delete ${person.name}!`))
    {
      personService
        .erase(person.id)
        .then(deleted => {
          const filteredObjects = persons.filter(deleted => deleted.id !== person.id)
          setPersons(filteredObjects)
        })
    }  
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
      {personsToShow.map(person =>
        <Persons key={person.id} person={person} erasePerson={() => erasePerson(person)}/>
      )}
    </div>
  )

}

export default App