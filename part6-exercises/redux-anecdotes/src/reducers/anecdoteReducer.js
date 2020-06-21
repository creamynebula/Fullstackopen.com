import anecdotesService from "../services/anecdotes";

const mySort = (array) => {
  //returns array sorted in descending order without changing input
  const newArray = [...array];
  newArray.sort((a, b) => b.votes - a.votes); //sort by number of votes, descending order
  return newArray;
};

export const voteActionCreator = (id) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdotesService.updateVotes(id);
    console.log("value of updatedAnecdote:", updatedAnecdote);
    dispatch({ type: "vote", id });
  };
};

export const newAnecdoteActionCreator = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotesService.createNew(content); //saved to backend
    console.log(
      "newAnecdoteActionCreator is going to dispatch this:",
      newAnecdote
    );
    dispatch({ type: "new", newAnecdote });
  }; //dispatch to store to update on frontend
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll();
    console.log("initializeAnecdotes is going to dispatch these:", anecdotes);
    dispatch({ type: "init", anecdotes });
  };
};

const reducer = (state = [], action) => {
  //action is what goes inside dispatch()
  switch (action.type) {
    case "vote":
      const anecdoteToUpdate = state.find(
        (anecdote) => anecdote.id === action.id
      );
      anecdoteToUpdate.votes += 1;
      const newState = state.map((anecdote) =>
        anecdote.id !== action.id ? anecdote : anecdoteToUpdate
      );
      return mySort(newState);
    case "new":
      return state.concat(action.newAnecdote);
    case "init":
      return action.anecdotes;
    default:
      return state;
  }
};

export default reducer;
