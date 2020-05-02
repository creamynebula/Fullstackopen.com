import React from "react";

const Notification = ({ message }) => {
  const notificationStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: "18px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  if (message === "") return null;
  return <div style={notificationStyle}>{message}</div>;
};

export default Notification;
