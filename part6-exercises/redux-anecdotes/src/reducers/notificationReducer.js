export const setNotification = (content) => {
  return { type: "set_notification", content };
};

export const removeNotification = () => {
  return { type: "remove_notification" };
};

const reducer = (state = "", action) => {
  switch (action.type) {
    case "set_notification":
      return action.content;
    case "remove_notification":
      return "";
    default:
      return state;
  }
};

export default reducer;
