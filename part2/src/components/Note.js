import React from "react";

const Note = ({ note, toggleImportance }) => {
  const label = note.important
    ? "Turn Into Not Important"
    : "Make it Important";

  return (
    <li className="note">
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
    </li>
  );
};

export default Note;
