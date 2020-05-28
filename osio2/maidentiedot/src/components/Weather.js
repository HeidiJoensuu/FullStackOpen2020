import React from 'react'

const Weather = ({url, weather}) => {
  let i = 1
  if (url !== "" && weather.location !== undefined){
    return (
      <div>
        <h3>Weather in {weather.location.name} </h3>
        <p><b>Temperature: </b>{weather.current.temperature} Celsius <br />
        <img src={weather.current.weather_icons} alt="weather_icon" width="100" /> <br />
        <b>Wind: </b>{weather.current.wind_speed} mph direction {weather.current.wind_dir}
        
        
        </p>
      </div>
    )
  }

  else return ""
}


export default Weather