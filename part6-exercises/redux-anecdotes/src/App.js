import React from "react";
import { useSelector, useDispatch } from "react-redux";

const App = () => {
  const anecdotes = useSelector((state) => state); //data fetched from store
  const dispatch = useDispatch(); //now dispatch(action) updates store

  const vote = (id) => {
    dispatch({ type: "vote", id });
  };

  const create = (event) => {
    event.preventDefault();
    const content = event.target.newAnecdote.value;
    dispatch({ type: "new", content });
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={create}>
        <div>
          <input name="newAnecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default App;
