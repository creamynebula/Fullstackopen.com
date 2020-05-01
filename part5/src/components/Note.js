import React from "react";

const Note = ({ note, toggleImportance }) => {
  const label = note.important ? "make not important" : "make important";

  const buttonStyle = {
    margin: "4px",
  };
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
