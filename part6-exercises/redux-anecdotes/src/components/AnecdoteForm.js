import React from "react";
import { newAnecdoteActionCreator } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";
import anecdotesService from "../services/anecdotes";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const create = async (event) => {
    event.preventDefault();
    const content = event.target.newAnecdote.value;
    event.target.newAnecdote.value = "";
    const newAnecdote = await anecdotesService.createNew(content);
    console.log("value of newAnecdote:", newAnecdote);
    dispatch(newAnecdoteActionCreator(newAnecdote));
  };
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div>
          <input name="newAnecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
