import React from "react";

const Note = ({ note, toggleImportance }) => {
  const buttonStyle = {
    margin: "3px",
  };
  const label = note.important
    ? "Turn into not important"
    : "Make it matter somehow";

  return (
    <li className="note">
      {note.content}
      <button onClick={toggleImportance} style={buttonStyle}>
        {label}
      </button>
    </li>
  );
};

export default Note;
