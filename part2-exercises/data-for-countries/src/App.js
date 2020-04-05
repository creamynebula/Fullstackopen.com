import React, { useState, useEffect } from 'react';
import axios from 'axios';
const shortid = require('shortid');


function isEmpty(obj) { //returns whether object is empty
  for (var key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}

const App = () => {


  const [countries, setCountries] = useState([]); //this array will hold the countries that we will fetch from API
  const [searchQuery, setSearchQuery] = useState(''); //controls the search query input

  const hook = () => {
    axios.get('https://restcountries.eu/rest/v2/all') //countries are here in JSON format
      .then(res => {
        setCountries(res.data); //now countries are inside 'countries' state variable (array)
      })
  };
  useEffect(hook, []); //empty array in second arg means execute effect only on first rendering


  const handleSearchInput = (event) => {
    console.log('we are inside handleSearchInput');
    setSearchQuery(event.target.value); //now 'searchQuery' contains what is currently written in input
  }

  const searchResult = (query, countries) => { //returns array of countries that correspond to query
    return countries.filter(x => x.name.toLowerCase().includes(query.toLowerCase()))
  }


  return (
    <div className="App">
      <div>
        <p>Find Countries</p>
        <input value={searchQuery} onChange={handleSearchInput} />
      </div>
      <div>
        <CountriesToShow countries={countries} searchQuery={searchQuery} searchResult={searchResult} setSearchQuery={setSearchQuery} />
      </div>
    </div>
  );
} //end of App component


const CountriesToShow = (props) => {
  const { countries, searchQuery, searchResult, setSearchQuery } = props;

  if (searchQuery === '')
    return (countries.map(x => <div key={shortid.generate()}>{x.name}</div>)); //render all countries names

  else {

    const result = searchResult(searchQuery, countries); //get countries matching query
    if (result.length > 10) //if > 10 countries found
      return (<div><p>More than 10 matches, please be less greedy with your searching!</p></div>)

    else if (result.length > 1 && result.length < 10) { //if (1,10) countries found
      return (
        result.map(x =>
          <div key={shortid.generate()}>
            {x.name} <button onClick={() => setSearchQuery(x.name)}>Show Info</button>
          </div>) //render them
      );
    }

    else if (result.length === 1) { //if search result is 1 country
      let x = result[0];
      return (
        <div>
          <h1>{x.name}</h1>
          <p>Capital: {x.capital}</p>
          <p>Population: {x.population}</p>
          <h2>Languages:</h2>
          <ul>
            {x.languages.map(lang => <li key={shortid.generate()}>{lang.name}</li>)}
          </ul>
          <img src={x.flag} alt={x.name + ' flag'} width='35%' />
          <WeatherData country={x} />
        </div>

      )
    }

    else return (<div><p>No matches ;_;</p></div>)

  } //this block rendered search results

} //end of CountriesToShow component


const WeatherData = (props) => { //pulls weather data for the country and renders it

  const { country } = props;
  const [weatherData, setWeatherData] = useState({});

  const api_key = process.env.REACT_APP_API_KEY

  const pullWeatherData = () => {
    console.log('we just got inside pullWeatherData func');
    if (!isEmpty(country))
      axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
        .then(res => {
          console.log('we made API call, the response:', res)
          setWeatherData(res.data.current); //now we have weather data in 'weatherData' state var
        })
  }

  useEffect(pullWeatherData, []);

  return (
    <>
      <h2>Weather in {country.capital}:</h2>
      <p>temperature: {weatherData.temperature}</p>
      <p>humidity: {weatherData.humidity}</p>
    </>
  )
} //end of WeatherData component


export default App;