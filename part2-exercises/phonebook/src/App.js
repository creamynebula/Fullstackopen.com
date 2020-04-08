import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]); //persons array, containing... the persons.
  const [newName, setNewName] = useState("New person goes here"); //this is for controlling the form input element
  const [newNumber, setNewNumber] = useState("His Number");
  const [filter, setNewFilter] = useState("");
  const [message, setMessage] = useState(null);
  const [msgStatus, setMsgStatus] = useState(null);

  const serverUrl = `http://localhost:3001/persons`;

  const hook = () => {
    axios.get(serverUrl).then((res) => {
      console.log("GET response:", res);
      setPersons(res.data); //persons now contain DB data
    });
  };

  useEffect(hook, []); //empty array means we execute the effect only on the first render

  const handleFilter = (event) => {
    setNewFilter(event.target.value);
  };

  const handleName = (event) => {
    setNewName(event.target.value); //newName now holds whatever is currently written in the form input
  };

  const handleNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const isPersonHere = (name, array) => {
    const result = array.filter((x) => x.name.includes(name)); //this array will be empty if name not in Numberbook
    if (result.length > 0) return true;
    else return false;
  };

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    }; //new person

    if (isPersonHere(newName, persons)) {
      alert(`${newName} is already in the Numberbook, baka!`);
    } else {
      axios.post(serverUrl, newPerson).then((x) => {
        setPersons(persons.concat(x.data)); //new persons array
        setMsgStatus("success");
        setMessage(`${newName} added to the book.`);
        setTimeout(() => setMessage(null), 4000);
      });
    }
  };

  const handleDeletion = (id, name) => {
    const result = window.confirm(
      `Are you sure you want to remove ${name} from your life?`
    );
    if (result)
      axios
        .delete(`${serverUrl}/${id}`)
        .then((res) => {
          console.log("deletion response:", res.data);
          setPersons(persons.filter((x) => x.id !== id)); //não desenhar a nota removida
          setMsgStatus("success");
          setMessage(`${name} removed from the book`);
          setTimeout(() => setMessage(null), 4000);
        })
        .catch((error) => {
          setMsgStatus("error");
          setMessage(
            `${name} was already not in the book, we will update the list in a few seconds.`
          );
          setTimeout(() => setMessage(null), 4000);
          setPersons(persons.filter((x) => x.id !== id));
        });
  };

  const searchArrayByName = (array, query) => {
    const result = array.filter((x) =>
      x.name.toLowerCase().includes(query.toLowerCase())
    );
    return result;
  };

  const whichArrayToDisplay = () => {
    if (filter === "") return persons;
    else return searchArrayByName(persons, filter);
  };

  return (
    <div>
      <div>
        <Message message={message} msgStatus={msgStatus} />
      </div>
      <h2>Numberbook</h2>
      <div>
        Filter shown with <input value={filter} onChange={handleFilter} />
      </div>

      <h2>New Person</h2>
      <form onSubmit={addPerson}>
        <div>
          Name: <input value={newName} onChange={handleName} />
        </div>
        <div>
          Number: <input value={newNumber} onChange={handleNumber} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {whichArrayToDisplay().map((x, i) => (
        <div key={i}>
          {x.name} {x.number}{" "}
          <button onClick={() => handleDeletion(x.id, x.name)}>
            Delete Entry
          </button>{" "}
        </div>
      ))}
    </div>
  );
};

const Message = ({ message, msgStatus }) => {
  const msgStyleSuccess = {
    fontSize: 24,
    color: "chartreuse",
    background: "navy",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  const msgStyleError = {
    fontSize: 24,
    color: "red",
    background: "lightgrey",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  let msgStyle;
  if (msgStatus === "error") msgStyle = msgStyleError;
  else msgStyle = msgStyleSuccess;

  if (message === null) return null;
  else return <div style={msgStyle}>{message}</div>;
};

export default App;
