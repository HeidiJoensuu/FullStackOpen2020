import React from 'react'

const Filter = ({setNewFind, newFind}) => {
  
  const handleFindChange = event => {
    setNewFind(event.target.value)
  }
  return (
    <div>
      find: <input value={newFind} onChange={handleFindChange} />
    </div>
    )
}

export default Filter