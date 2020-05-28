import React, { useState, useEffect} from 'react'
import Country from './Country'
import CountryList from './CountryList'

const Countries = ({newFind, countries, setNewFind, setUrl}) => {
  const [show, setShow] = useState ('')

  const findCountry = newFind
  ? countries.filter(countries => countries.name.toLowerCase().includes(newFind.toLowerCase()))
  : countries

  useEffect(()=> {
    if (show !== ""){
      setNewFind(show)
      setShow("")
   }
  })

  useEffect(()=>{
    if (findCountry.length === 1) setUrl(findCountry[0].capital)
    else setUrl('')
  })

  const showCountry = () => {
    if (findCountry.length === 1){
      //setUrl(findCountry[0].capital)
      return <Country key={findCountry[0].name} country={findCountry[0]} />
    } else{
      //setUrl('')
      return <div>
        {
          findCountry.length >= 10
            ? "Too many matches, specity"
            : findCountry.map(country =>
              <CountryList key={country.name} country={country} setShow={setShow} />
              )
        }
      </div>
    } 
  } 

  return (
    <div>
      {showCountry()}
    </div>
  )
}

export default Countries