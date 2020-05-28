import React, { useState } from 'react'



const AddPerson = ({persons, setPersons}) => {
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const handleNameChange = event => setNewName(event.target.value)
  const handleNumberChange = event => setNewNumber(event.target.value)

  const addIt = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`) 
    } else {
      const notePerson = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(notePerson))
      setNewName('')
      setNewNumber('')
    }
  }
  return (
    <div>
      <form onSubmit={addIt}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  )
  }

export default AddPerson