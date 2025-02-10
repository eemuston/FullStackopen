import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import countriesService from './services/countries'
import Countries from './components/Countries'
import CountryDetails from './components/CountryDetails'

const App = () => {
  const [countries, setCountries] = useState([]) 
  const [searchName, setNewSearch] = useState('')

  useEffect(() => {
    countriesService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
    })
  }, [])

  const countriesToShow = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchName.toLowerCase())
    )
  
  const ButtonHandler = (country) => {
    setNewSearch(country)
  }

   return (
     <div>
      <Filter searchName={searchName} setNewSearch={setNewSearch}/>
      {countriesToShow.length > 10 ? (
        <p>Too many matches, please specify more</p>
      ) : (
        <>
          {countriesToShow.length === 1 ? (
            <CountryDetails country={countriesToShow[0]} />
          ) : (
            countriesToShow.map(country => (
              <Countries key={country.name.common} country={country.name.common} ButtonHandler={() => ButtonHandler(country.name.common)}/>
            ))
          )}
        </>
      )}
    </div>
  )

}


export default App
