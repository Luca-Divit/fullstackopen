import { useState, useEffect } from "react";
import axios from "axios";
const apiKey = import.meta.env.VITE_WEATHER_KEY;

const App = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState([]);
  const [countryToShow, setCountryToShow] = useState(null);
  const [weather, setWeather] = useState({});

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
      const place = places[0]
      // console.log(place.latlng);
      const lat = place.latlng[0]
      const lng = place.latlng[1]
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${apiKey}`
      axios.get(weatherUrl)
        .then(response => {
        const data = response.data
        setWeather({
          name: data.name,
          temp: data.main.temp,
          imgId: data.weather[0].icon,
          wind: data.wind.speed
        })
      })
      return (
        <div>
          <h1>{place.name.common}</h1>
          <div>Capital: {place.capital.map((c, i) => <span key={i}>{c}</span>)}</div>
          <div>Area: {place.area}</div>
          <h3>Languages</h3>
          <ul>
            {Object.values(place.languages).map((lang, i) => <li key={i}>{lang}</li>)}
          </ul>
          <img src={place.flags.png} alt={`${place.name.common} flag`} />
          <h2>Weather in {weather.name}</h2>
          <p>temperature: {weather.temp} Celsius</p>
          <img src={`https://openweathermap.org/img/wn/${weather.imgId}@2x.png`} alt="weather icon" />
          <p>wind {weather.wind} m/s</p>
        </div>
      )
    }
    if (countryToShow) {
      const lat = countryToShow.latlng[0]
      const lng = countryToShow.latlng[1]
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${apiKey}`
      axios.get(weatherUrl)
        .then(response => {
        const data = response.data
        setWeather({
          name: data.name,
          temp: data.main.temp,
          imgId: data.weather[0].icon,
          wind: data.wind.speed
        })
      })
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
          <h2>Weather in {weather.name}</h2>
          <p>temperature: {weather.temp} Celsius</p>
          <img src={`https://openweathermap.org/img/wn/${weather.imgId}@2x.png`} alt="weather icon" />
          <p>wind {weather.wind} m/s</p>
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
