const mySort = (array) => {
  //returns array sorted in descending order without changing input
  const newArray = [...array];
  newArray.sort((a, b) => b.votes - a.votes); //sort by number of votes, descending order
  return newArray;
};

export const voteActionCreator = (id) => {
  return { type: "vote", id };
};

export const newAnecdoteActionCreator = (content) => {
  return { type: "new", content };
};

export const initializeAnecdotes = (anecdotes) => {
  return { type: "init", anecdotes };
};

const reducer = (state = [], action) => {
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
      //const newAnecdote = asObject(action.content);
      return state.concat(action.content);
    case "init":
      return action.anecdotes;
    default:
      return state;
  }
};

export default reducer;
