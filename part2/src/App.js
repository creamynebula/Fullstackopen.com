import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import axios from 'axios'

const App = (props) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('A certain magical new note goes here'); //stores the content field of a new note
  const [showAll, setShowAll] = useState(true); //wheter we will display all notes or not

  const hook = () => {
    console.log('effect')
    axios.get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }

  useEffect(hook, []); //executed immediately after each rendering usually
  //By default, effects run after every completed render, but you can choose to fire it only when certain values have changed.
  //The second parameter of useEffect is used to specify how often the effect is run.
  //If the second parameter is an empty array [], then the effect is only run along with the first render of the component.

  console.log('render', notes.length, 'notes')

  const notesToShow = showAll //array com as notas que serão mostradas, default todas
    ? notes //if showAll is true, show all...
    : notes.filter(note => note.important === true); //otherwise only show the notes marked as important

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5, //half in average will be set as important randomly
      id: notes.length + 1 //this is fine as long as we never remove any note...
    }

    setNotes(notes.concat(noteObject))
    setNewNote('')
  } //fim addNote

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? 'Only VERY Important Notes' : 'All Notes'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) =>
          <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">Save Note</button>
      </form>
    </div>
  )
}

export default App;