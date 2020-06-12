import React from "react";
import { createStore } from "redux";

function App() {
  const counterReducer = (state = 0, action) => {
    switch (action.type) {
      case "INCREMENT":
        return state + 1;
      case "DECREMENT":
        return state - 1;
      case "ZERO":
        return 0;
      default:
        return state;
    }
  };

  const store = createStore(counterReducer);
  store.subscribe(() => {
    const currentState = store.getState();
    console.log("Current state:", currentState);
  });

  store.dispatch({ type: "INCREMENT" }); //changing state
  store.dispatch({ type: "INCREMENT" });
  store.dispatch({ type: "INCREMENT" });
  store.dispatch({ type: "DECREMENT" });
  store.dispatch({ type: "ZERO" });

  return (
    <div className="App">
      <p>{store.getState()}</p>
      <button onClick={() => store.dispatch({ type: "INCREMENT" })}>
        GO UP
      </button>
      <button onClick={() => store.dispatch({ type: "DECREMENT" })}>
        GO DOWN
      </button>
      <button onClick={() => store.dispatch({ type: "ZERO" })}>
        GO TO ZERO
      </button>
    </div>
  );
}

export default App;
