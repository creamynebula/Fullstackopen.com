const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");

loginRouter.post("/", async (req, res) => {
  console.log("body of request received by loginRouter:", req.body);
  console.log("headers of request received by loginRouter:", req.headers);
  const body = req.body; //username and password

  const user = await User.findOne({ username: body.username });
  const passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash);

  if (!(user && passwordCorrect))
    return res.status(401).json({ error: "invalid username or password" }); //401 is 'unauthorized'

  const userForToken = {
    username: user.username,
    id: user._id,
    name: user.name,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);
  res
    .status(200)
    .send({ token, username: user.username, name: user.name, id: user._id });
});

module.exports = loginRouter;
