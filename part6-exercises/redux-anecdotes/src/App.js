import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteActionCreator } from "./reducers/anecdoteReducer";
import {
  setNotification,
  removeNotification,
} from "./reducers/notificationReducer";

import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import Filter from "./components/Filter";

const searchResult = (query, array) => {
  //returns array that correspond to query
  return array.filter((x) =>
    x.name.toLowerCase().includes(query.toLowerCase())
  );
};

const App = () => {
  const filter = useSelector((state) => state.filter);
  const anecdotes = useSelector((state) => state.anecdotes); //data fetched from store
  const filteredAnecdotes = anecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filter)
  );
  const dispatch = useDispatch(); //now dispatch(action) updates store

  const vote = (id) => {
    const votedAnecdote = anecdotes.find((anecdote) => anecdote.id === id);
    dispatch(voteActionCreator(id));
    dispatch(setNotification(votedAnecdote.content));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification />
      {filteredAnecdotes.map((anecdote) => (
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
