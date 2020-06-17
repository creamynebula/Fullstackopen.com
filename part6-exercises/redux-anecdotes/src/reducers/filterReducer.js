export const setFilter = (filter) => {
  return { type: "filter", filter };
};

const reducer = (state = "", action) => {
  switch (action.type) {
    case "filter":
      return action.filter;
    default:
      return state;
  }
};

export default reducer;
