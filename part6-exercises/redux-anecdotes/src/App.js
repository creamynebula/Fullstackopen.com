import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteActionCreator } from "./reducers/anecdoteReducer";
import {
  setNotification,
  removeNotification,
} from "./reducers/notificationReducer";
import AnecdoteForm from "./components/AnecdoteForm";

const App = () => {
  const anecdotes = useSelector((state) => state.anecdotes); //data fetched from store
  const dispatch = useDispatch(); //now dispatch(action) updates store

  const vote = (id) => {
    dispatch(voteActionCreator(id));
    //dispatch(setNotification);
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
      <AnecdoteForm />
    </div>
  );
};

export default App;
