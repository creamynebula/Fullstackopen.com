import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { voteActionCreator } from "./reducers/anecdoteReducer";
import {
  setNotification,
  removeNotification,
} from "./reducers/notificationReducer";

import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import Filter from "./components/Filter";

import anecdotesService from "./services/anecdotes";
import { initializeAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch(); //now dispatch(action) updates store
  useEffect(() => {
    anecdotesService
      .getAll()
      .then((anecdotes) => dispatch(initializeAnecdotes(anecdotes)));
  }, [dispatch]);

  const filter = useSelector((state) => state.filter);
  console.log("value of filter:", filter);
  const anecdotes = useSelector((state) => state.anecdotes); //data fetched from store
  console.log("value of anecdotes:", anecdotes);
  const filteredAnecdotes =
    anecdotes ||
    anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter)
    );

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
