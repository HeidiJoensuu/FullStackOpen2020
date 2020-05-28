import React from 'react'

const CountryList = ({country, setShow}) => {

  const showAnyway = (event) => {
    event.preventDefault()
    setShow(country.name)
  }

  return(
    <div>
      <form onSubmit={showAnyway}>
        {country.name}
        <button onSubmit={showAnyway}>show</button>
      </form>
    </div>
  )
}  
export default CountryList