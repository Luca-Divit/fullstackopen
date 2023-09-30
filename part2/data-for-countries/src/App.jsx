import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
    axios
      .get(baseUrl)
      .then(response => response.data)
      .then(coutries => setAllCountries(coutries))
  },[]);

  const handleChange = (e) => {
    const typed = e.target.value;
    setSearch(typed);
    const regex = new RegExp(typed, 'gi')

    const filteredCountries = allCountries.filter(country => {
      return country.name.common.match(regex) ;
    });
    setCountries(filteredCountries);
  }

  return (
    <div>
      <input value={search} onChange={handleChange} />
      {countries.length < 11 ?
        <ul>
          {countries.map((c,i) => <li key={i}>{c.name.common}</li>)}
        </ul> :
        <p>Too many countries specify more</p>
      }

    </div>
  )
}

export default App
