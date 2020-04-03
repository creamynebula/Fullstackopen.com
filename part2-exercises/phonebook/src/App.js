import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]); //persons array, containing... the persons.
  const [newName, setNewName] = useState('New person goes here'); //this is for controlling the form input element
  const [newNumber, setNewNumber] = useState('His Number');
  const [filter, setNewFilter] = useState('');

  const hook = () => {
    axios.get('http://localhost:3001/persons')
      .then(res => {
        console.log(res);
        setPersons(res.data); //persons now contain DB data

      })
  }

  useEffect(hook, []); //empty array means we execute the effect only on the first render

  const handleFilter = (event) => {
    setNewFilter(event.target.value);
  }

  const handleName = (event) => {
    setNewName(event.target.value); //newName now holds whatever is currently written in the form input
  }

  const handleNumber = (event) => {
    setNewNumber(event.target.value);
  }

  const isPersonHere = (name, array) => {
    const result = array.filter((x) => x.name.includes(name)); //this array will be empty if name not in Numberbook
    if (result.length > 0) return true;
    else return false;
  }

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber
    } //new person

    if (isPersonHere(newName, persons)) {
      alert(`${newName} is already in the Numberbook, baka!`);
    }
    else {
      const newPersons = persons.concat(newPerson) //new persons array
      setPersons(newPersons); //done
    }
  }

  const searchArray = (array, query) => {
    const result = array.filter(x => x.name.toLowerCase().includes(query.toLowerCase()));
    return result;
  };

  const whichArrayToDisplay = () => {
    if (filter === '') return persons;
    else return searchArray(persons, filter)
  }

  return (

    <div>
      <div></div>
      <h2>Numberbook</h2>
      <div>
        Filter shown with <input value={filter} onChange={handleFilter} />
      </div>

      <h2>New Person</h2>
      <form onSubmit={addPerson} >
        <div>
          Name: <input value={newName} onChange={handleName} />
        </div>
        <div>
          Number: <input value={newNumber} onChange={handleNumber} />
        </div>
        <div>
          <button type="submit" >Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        whichArrayToDisplay().map((x, i) => <div key={i}>{x.name} {x.number}</div>)
      }
    </div>
  )
}

export default App