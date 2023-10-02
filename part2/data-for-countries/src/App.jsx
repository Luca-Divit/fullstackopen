import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState([]);
  const [countryToShow, setCountryToShow] = useState(null);

  useEffect(() => {
    const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
    axios
      .get(baseUrl)
      .then(response => response.data)
      .then(coutries => setAllCountries(coutries))
  },[]);

  useEffect(() => {
    setCountryToShow(null)
  }, [search])


  const handleChange = (e) => {
    const typed = e.target.value;
    setSearch(typed);
    const regex = new RegExp(typed, 'gi')

    const filteredCountries = allCountries.filter(country => {
      return country.name.common.match(regex) ;
    });
    setCountries(filteredCountries);
  }

  const handleDisplay = (places) => {
    if (places.length === 1) {
      return (
        <div>
          <h1>{places[0].name.common}</h1>
          <div>Capital: {places[0].capital.map((c, i) => <span key={i}>{c}</span>)}</div>
          <div>Area: {places[0].area}</div>
          <h3>Languages</h3>
          <ul>
            {Object.values(places[0].languages).map((lang, i) => <li key={i}>{lang}</li>)}
          </ul>
          <img src={places[0].flags.png} alt={`${places[0].name.common} flag`} />
        </div>
      )
    }
    if (countryToShow) {
      return (
        <div>
          <h1>{countryToShow.name.common}</h1>
          <div>Capital: {countryToShow.capital.map((c, i) => <span key={i}>{c}</span>)}</div>
          <div>Area: {countryToShow.area}</div>
          <h3>Languages</h3>
          <ul>
            {Object.values(countryToShow.languages).map((lang, i) => <li key={i}>{lang}</li>)}
          </ul>
          <img src={countryToShow.flags.png} alt={`${countryToShow.name.common} flag`} />
        </div>
      )
    }
    return (
      <ul>
        {countries.map((c,i) => <li key={i}>{c.name.common} <button onClick={() => setCountryToShow(c)}>show</button></li>)}
      </ul>
    )
  }

  return (
    <div>
      <p>find coutries <input value={search} onChange={handleChange} /></p>
      {
        countries.length < 11 ?
        handleDisplay(countries) :
        <p>Too many matches, specify another filter</p>
      }

    </div>
  )
}

export default App
