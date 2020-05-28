import React from 'react'

const Find = ({setNewFind, newFind}) => {
  const handleFindChange = event => {
    setNewFind(event.target.value)
    }
    return (
      <div>
        find countries: <input value={newFind} onChange={handleFindChange} />
      </div>
    )
}
export default Find