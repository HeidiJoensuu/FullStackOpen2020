import React, { useState } from 'react'
import personService from '../services/Services'

const AddPerson = ({persons, setPersons, setMessage, setError}) => {
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const handleNameChange = event => setNewName(event.target.value)
  const handleNumberChange = event => setNewNumber(event.target.value)

  const addIt = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName)) {
      if (window.confirm(
      `${newName}' is already in the phonebook. 
      Want to replace the old number with the new one?`)){
        const person = persons.find((n => n.name === newName))
        const changedNumber = { ...person, number: newNumber}
        personService
        .updatePerson(person.id, changedNumber)
        .then(returnedNote => {
          setPersons(persons.map(person =>person.name !== newName ? person : returnedNote ))
          setMessage(`Edited '${newName}' phonenumber to new one '${newNumber}'`)
          setTimeout(() => {
            setMessage(null)
          }, 4000)
        })
        .catch(error => {
          setError(true)
          setMessage(`Information of '${newName}' has already been removed from server`)
          setTimeout(() => {
            setMessage(null)
            setError(false)
          }, 4000)
        })
      } else window.alert("Nothing has been changed")
    } else {
      const notePerson = {
        name: newName,
        number: newNumber
      }
      personService
        .createPerson(notePerson)
        .then(returnedNote =>{
          setPersons(persons.concat(returnedNote))
          setNewName('')
          setNewNumber('')
          setMessage(`Added '${newName}' to the phonebook`)
          setTimeout(() => {
            setMessage(null)
          }, 4000)
        })

        
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