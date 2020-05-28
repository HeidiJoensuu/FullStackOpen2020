import React from 'react'

const Country = ({country}) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <p>Capital: {country.capital} <br /> Population: {country.population}</p>

      <h3>Languages</h3>
      <ul>
        {
          country.languages.map(lang =>
            <li key={lang.iso639_1}> {lang.name}</li>
          )
        }
      </ul>
      <img src={country.flag } alt="flag" width="200" />
    </div>
  )
}

export default Country