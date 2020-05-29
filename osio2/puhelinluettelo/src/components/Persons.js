import React from 'react'
import Person from './Person'
import personService from '../services/Services'

const Persons = ({newFind, persons, setPersons, setMessage, setError}) => {
  const findPerson = newFind
  ? persons.filter(person => person.name.toLowerCase().includes(newFind.toLowerCase()))
  : persons

  const removeP = (id, name) => {
    if (window.confirm(`Remove '${name}'?`)){
      personService
      .removePerson(id)
      .then(() => {
        setPersons(persons.filter(person => person.name !== name))
      })
      .catch(error => {
        setError(true)
        setMessage(`Information of '${name}' has already been removed from server`)
        setTimeout(() => {
          setMessage(null)
          setError(false)
        }, 4000)
      })
      setMessage(
        `Removed '${name}' from phonebook`
        )
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      
    }
  }

  return (
    <div>
      {findPerson.map((person) =>
        <Person key={person.id}
        person={person}
        removeThisPerson={() => removeP(person.id, person.name)}
        />
        )}
        
      
    </div>
  )
}

export default Persons