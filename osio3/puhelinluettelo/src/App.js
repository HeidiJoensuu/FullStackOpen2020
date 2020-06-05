import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import AddPerson from './components/AddPerson'
import Filter from './components/Filter'
import personService from './services/Services'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newFind, setNewFind ] = useState('')
  const [ mess, setMessage ] = useState(null)
  const [ errorMes, setError ] = useState(false)

  useEffect(() =>{
    personService
      .getAll()
      .then(initialNotes => {
        setPersons(initialNotes)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={mess} errorMes={errorMes} />
      <Filter 
        setNewFind={setNewFind}
        newFind={newFind}
      />
      <h2>add a new person</h2>
      <AddPerson 
        persons={persons} 
        setPersons={setPersons}
        setMessage={setMessage}
        setError = {setError}
      />
      <h2>Numbers</h2>
      <Persons 
        newFind={newFind}
        persons={persons}
        setPersons={setPersons}
        setMessage={setMessage}
        setError = {setError}
      />
    </div>
  )
}

export default App

  
