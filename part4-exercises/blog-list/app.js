const mongoose = require("mongoose");
const config = require("./utils/config");
const cors = require("cors");
const express = require("express");
const app = express();
const blogRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to DB"))
  .catch(() => console.log("not connected to DB :("));

app.use(cors()); //now we can serve requests from a frontend in another port or address
app.use(express.json()); //now we can request.body

const getTokenFrom = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    request.token = authorization.substring(7);
  }
  next();
};
app.use(getTokenFrom);
app.use("/api/blogs", blogRouter); //our routes are available when we reach for /api/blogs
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);

module.exports = app;
