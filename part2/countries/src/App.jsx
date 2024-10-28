import { useEffect, useState } from 'react'
import axios from 'axios'
import DisplayCountries from './components/DisplayCountries'

function App() {
  const [countries, setCountries] = useState([])
  const [countriesToDisplay, setCountriesToDisplay] = useState([])

  useEffect(() => {
    axios.get("https://studies.cs.helsinki.fi/restcountries/api/all").then((response) =>setCountries(response.data))
  }, [])

  const handleSearchCountry = (e) => {
    const matchingCountries = countries.filter(country => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
    setCountriesToDisplay(matchingCountries)

  }

  return (
    <>
      find countries <input onChange={handleSearchCountry}/>
      {countriesToDisplay.length === 0 ? null :
      <DisplayCountries countries={countriesToDisplay} />}
    </>
  )
}

export default App
