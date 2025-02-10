import countriesService from './../services/countries'
import { useState, useEffect } from 'react'

const CountryDetails = ({ country }) => {
    const [weatherData, setWeatherData] = useState(null);
    
    useEffect(() => {
    if (country.capital) {
        countriesService
        .getWeatherdata(country.capital)
        .then(data => setWeatherData(data))
        .catch(error => console.error('Error fetching weather data:', error));
    }
    }, [country.capital]);
    if (weatherData === null)
        return;
    console.log(weatherData)
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>capital {country.capital}</p>
        <p>area {country.area} km²</p>
        <h3>languages:</h3>
        <ul>
          {Object.values(country.languages).map((language, index) => (
            <li key={index}>{language}</li>
          ))}
        </ul>
        <img src={country.flags.png} />
        <h3>Weather in {country.capital}</h3>
        <p>temperature {weatherData.main.temp} °C</p>
        <img src={"https://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png"}/>
        <p>wind {weatherData.wind.speed} m/s</p>
      </div>
    );
  };
  
  export default CountryDetails;
  