import React, { useState, useEffect } from "react";
import Note from "./components/Note";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]); //array containing all notes
  const [newNote, setNewNote] = useState("A certain magical new note"); //stores the content field of a new note
  const [showAll, setShowAll] = useState(true); //whether we will display all notes or not
  const [message, setMessage] = useState(null);

  const baseUrl = "http://localhost:3001/notes";

  const create = (newObject) => {
    return axios.post(baseUrl, newObject).then((res) => res.data); //returns the created object if everything worked
  };

  const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject).then((res) => res.data);
  };

  useEffect(
    () =>
      axios.get(baseUrl).then((res) => {
        setNotes(res.data);
      }),
    []
  );

  const notesToShow = showAll //array com as notas que serão mostradas, default todas
    ? notes //if showAll is true, show all...
    : notes.filter((note) => note.important === true); //otherwise only show the notes marked as important

  const addNote = (event) => {
    event.preventDefault(); //prevents page from refreshing after submit
    const noteObject = {
      content: newNote,
      date: new Date(),
      important: Math.random() > 0.5, //half in average will be set as important randomly
    };

    create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setMessage(`Note created`);
      setTimeout(() => {
        setMessage(null); //after 5s clear msg
      }, 5000);
      setNewNote("");
    });
  }; //fim addNote

  const handleNoteChange = (event) => {
    setNewNote(event.target.value); //as input is typed, we update the view and the value of newNote
  };

  const toggleImportanceOf = (id) => {
    const note = notes.find((x) => x.id === id); //this holds the value of the note we are looking for
    const changedNote = { ...note, important: !note.important }; //this flips its importance
    let newNotesArray = notes.map((x) => (x.id !== id ? x : changedNote));

    update(id, changedNote) //update note on backend
      .then((returnedNote) => {
        setNotes(newNotesArray);
        setMessage(`Note updated`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      })
      .catch((error) => {
        setMessage(`Note was already removed from server ;_;.\n${error}`);
        setTimeout(() => {
          setMessage(null); //after 5s clear msg
        }, 5000);
        newNotesArray = notes.filter((x) => x.id !== id);
        setNotes(newNotesArray); //remove note from view since it's already removed
      });
  };

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={message} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? "Only VERY IMPORTANT Notes!!" : "All Notes."}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.date}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <p>
          <input value={newNote} onChange={handleNoteChange} />
        </p>
        <button type="submit">Save Note</button>
      </form>
      <Footer />
    </div>
  );
};

const Notification = ({ message }) => {
  if (message === null) {
    //if message prop is null, nothing is rendered
    return null;
  }

  return <div className="error">{message}</div>;
};

const Footer = () => {
  const footerStyle = {
    color: "rgb(29, 1, 107)",
    fontStyle: "italic",
    fontSize: 16,
  };

  return (
    <div style={footerStyle}>
      <br />
      <em>Note App, curso da Universidade de Helsinki, 2020</em>
    </div>
  );
};

export default App;
