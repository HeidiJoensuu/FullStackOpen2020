import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Find from "./components/Find"
import Countries from "./components/Countries"
import Weather from "./components/Weather"

const App = () => {
  const [countries, setCountries] = useState([])
  const [ weather, setWeather ] = useState({})
  const [ url, setUrl ] = useState('')
  const [ newFind, setNewFind ] = useState('')
  const key = process.env.REACT_APP_APIKEY
  
  
  useEffect(() =>{
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response =>{
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  useEffect(()=> {
    if (url !== ""){
      axios
        .get('http://api.weatherstack.com/current?access_key='+ key +'&query='+url)
        .then(response =>{
          setWeather(response.data)
        })
      }
  }, [url])        
  

  return (
    <div>
      <Find 
        setNewFind={setNewFind}
        newFind={newFind}
      />
      <Countries 
        newFind={newFind}
        countries={countries}
        setNewFind={setNewFind}
        setUrl = {setUrl}
      />
      <Weather 
        weather = {weather}
        url = {url}
      />
    </div>
  )
}

export default App;
