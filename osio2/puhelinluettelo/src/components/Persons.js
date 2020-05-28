import React from 'react'
import Person from './Person'

const Persons = ({newFind, persons}) => {
  const findPerson = newFind
  ? persons.filter(person => person.name.toLowerCase().includes(newFind.toLowerCase()))
  : persons

  return (
    <div>
      {findPerson.map((person) =>
        <Person key={person.name} person={person} />
      )}
    </div>
  )
}

export default Persons