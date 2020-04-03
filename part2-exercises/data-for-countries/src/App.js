import React, { useState, useEffect } from 'react';
import axios from 'axios';
const shortid = require('shortid');

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}

const searchResult = (query, countries) => {
  return countries.filter(x => x.name.toLowerCase().includes(query.toLowerCase()))
} //returns array containing the countries that contain searched string (case insensitive)

const fullCountryInfo = (country) => {

  return (
    <div key={shortid.generate()}>
      <h1 key={shortid.generate()} >{country.name}</h1>
      <p key={shortid.generate()}>Capital: {country.capital}</p>
      <p key={shortid.generate()}>Population: {country.population}</p>
      <h2 key={shortid.generate()}>Languages:</h2>
      <ul key={shortid.generate()}>
        {country.languages.map(lang => <li key={shortid.generate()}>{lang.name}</li>)}
      </ul>
      <img src={country.flag} alt={country.name + ' flag'} width='35%' />
    </div>
  )

}

const countryName = (country) => {
  return (
    <div key={shortid.generate()}>{country.name}</div>
  )
}

function App() {

  const [countries, setCountries] = useState([]); //this array will hold the countries that we will fetch from API
  const [searchQuery, setSearchQuery] = useState(''); //controls de search query input
  const [belowCountry, setBelowCountry] = useState({});

  const hook = () => {
    axios.get('https://restcountries.eu/rest/v2/all') //countries are here in JSON format
      .then(res => {
        setCountries(res.data); //now countries are inside 'countries' state variable
      })
  };

  useEffect(hook, []); //empty array in second arg means execute effect only on first rendering

  const handleSearchInput = (event) => {
    setSearchQuery(event.target.value); //now 'searchQuery' contains what is currently written in input
    setBelowCountry({});
  }

  const handleShowInfo = (country) => {
    if (isEmpty(belowCountry)) setBelowCountry(country);
    else setBelowCountry({});
  }

  return (
    <div className="App">
      <div>
        <p>Find Countries</p>
        <input value={searchQuery} onChange={handleSearchInput} />
      </div>
      <div>
        <CountriesToShow countries={countries} searchQuery={searchQuery} handleShowInfo={handleShowInfo} />
        <BelowCountryComp country={belowCountry} func={fullCountryInfo} />
      </div>
    </div>
  );
}

const CountriesToShow = (props) => {
  const { countries, searchQuery, handleShowInfo, } = props;

  if (searchQuery === '') return (countries.map(x => countryName(x))); //render all countries names

  else {
    const possibleResult = searchResult(searchQuery, countries); //get countries matching query

    if (possibleResult.length > 10) //if > 10 countries found
      return (<div><p>Too many matches, please be less greedy with your searching!</p></div>)

    else if (possibleResult.length > 1 && possibleResult.length < 10) { //if (1,10) countries found
      return (
        possibleResult.map(x =>
          <div key={shortid.generate()}>
            {x.name} <button onClick={() => handleShowInfo(x)}>Show Info</button>
          </div>) //render them
      );

    }

    else if (possibleResult.length === 1) return ( //if 1 country found
      possibleResult.map(x => fullCountryInfo(x))
    )

    else return (<div><p>No matches ;_;</p></div>)
  } //this block rendered search results
} //fim countriesToShow()

const BelowCountryComp = (props) => {
  if (!isEmpty(props.country)) return (
    <div>
      {props.func(props.country)}
    </div>
  )
  else return <div></div>
}

export default App;