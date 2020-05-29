import React from 'react'

const Person = ({person, removeThisPerson}) => {

  return (
    <div>
      {person.name} {person.number}
      <button onClick={removeThisPerson} id={person.id + "button"} >REMOVE</button>
    </div>
  )
}

export default Person

