const userRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

const makeUser = async (data) => {
  if (data.username && data.name && data.password) {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(data.password, saltRounds);
    const user = new User({
      username: data.username,
      name: data.name,
      passwordHash: passwordHash,
    });
    return user;
  } else return null;
};

userRouter.post("/", async (req, res) => {
  const body = req.body;
  if (!body.username || !body.password)
    return res.status(400).json({ error: "username or password missing" });
  else if (body.username.length < 3 || body.password.length < 3)
    return res.status(400).json({
      error: "username and password must be at least 3 characters long",
    });

  const user = await makeUser(body);
  console.log("user:", user);

  try {
    const savedUser = await user.save();
    res.status(201).json(savedUser.toJSON());
  } catch (err) {
    res.status(500).json({ error: "error registering the user", ...err });
  }
});

userRouter.get("/", async (req, res) => {
  const body = req.body;
  try {
    const users = await User.find({}).populate("blogs", {
      url: 1,
      title: 1,
      author: 1,
      likes: 1,
    }); //this returns all users
    res.status(200).json(users.map((x) => x.toJSON()));
  } catch (err) {
    res.status(500).json({ error: "we couldn't fetch the users", ...err });
  }
});

module.exports = userRouter;
