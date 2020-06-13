import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { noteReducer } from "./reducers/noteReducer";

const store = createStore(noteReducer);
store.subscribe(() => {
  const currentState = store.getState();
  console.log("Current state:", currentState);
}); //subscription means registering a callback that executes every time state changes

let lastId = 0;
function doTheIdThing() {
  lastId = lastId + 1;
  return lastId;
}

function App() {
  return (
    <div className="App">
      <button
        onClick={() =>
          store.dispatch({
            type: "NEW_NOTE",
            data: {
              content: "the app state is in redux store",
              important: true,
              id: doTheIdThing(),
            },
          })
        }
      >
        new note 1
      </button>
      <button
        onClick={() =>
          store.dispatch({
            type: "NEW_NOTE",
            data: {
              content: "state changes are made with actions",
              important: false,
              id: doTheIdThing(),
            },
          })
        }
      >
        new note 2
      </button>
      <button
        onClick={() =>
          store.dispatch({
            type: "TOGGLE_IMPORTANCE",
            data: {
              id: lastId,
            },
          })
        }
      >
        change importance of last added note
      </button>
      <div>
        <ul>
          {store.getState().map((note) => (
            <li key={note.id}>
              {note.content}{" "}
              <strong>{note.important ? "important" : ""}</strong>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};

renderApp();
store.subscribe(renderApp); //renderapp will be called every time state changes

export default App;
