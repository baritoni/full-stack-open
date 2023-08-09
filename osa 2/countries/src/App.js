import { useState, useEffect } from 'react'
import countriesService from './services/countries'
//import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])

  const handleCountryChange = (event) => {
    console.log(event.target.value)
    setCountries(event.target.value)
  }

  useEffect(() => {
    console.log('fetching data...')
    countriesService.getAll().then((response) => {
      setCountries(response.data)
      console.log('countries: ', countries)
    })
  }, [])

  return (
    <div>
      <form>
        <div>
          <b>find countries</b>
          <input onChange={handleCountryChange}></input>
        </div>
        <div></div>
      </form>
    </div>
  )
}

export default App
