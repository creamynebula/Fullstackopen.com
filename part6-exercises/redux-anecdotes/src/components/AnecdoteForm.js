import React from "react";
import { newAnecdoteActionCreator } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const create = async (event) => {
    event.preventDefault();
    const content = event.target.newAnecdote.value;
    event.target.newAnecdote.value = "";
    dispatch(newAnecdoteActionCreator(content)); //thanks to redux-thunk this creates note on both back and frontend
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
