import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import AddPerson from './components/AddPerson'
import Filter from './components/Filter'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newFind, setNewFind ] = useState('')

  useEffect(() =>{
    axios
      .get('http://localhost:3001/persons')
      .then(response =>{
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        setNewFind={setNewFind}
        newFind={newFind}
      />
      <h2>add a new person</h2>
      <AddPerson 
        persons={persons} 
        setPersons={setPersons}
      />
      <h2>Numbers</h2>
      <Persons 
        newFind={newFind}
        persons={persons} 
      />
    </div>
  )
}

export default App

  
