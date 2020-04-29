const Blog = require("../models/blog");
const blogRouter = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const handleToken = (token) => {
  //returns either {error:} or a decoded token
  if (!token) return { error: "token missing, not authorized" };
  const decodedToken = jwt.verify(token, process.env.SECRET); //should have username, name and id properties
  if (!decodedToken.id) return { error: "token invalid, not authorized" };
  else return decodedToken;
};

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);
  const decodedToken = handleToken(request.token); //a middleware is defined in app.js that extracts the token from the request headers
  if (decodedToken.error) return response.status(401).json(decodedToken.error);

  const user = await User.findById(decodedToken.id);
  blog.user = user._id; //this user is going to own the blog we are adding
  blog.author = user.name; //name of author is the name we have registered for him

  try {
    const result = await blog.save(); //save blog
    user.blogs = user.blogs.concat(result._id); //register the blog in the user's list of blogs
    await user.save(); //save the user (with the updated information saying he owns blog)
    response.status(201).json(result); //return added blog with status 201 created
  } catch (err) {
    response.status(500).json({
      error: "some error saving the blog",
      ...err,
    });
  }
});

blogRouter.delete("/:id", async (request, response, next) => {
  const blog = await Blog.findById(request.params.id);
  if (!blog) return response.status(400).json({ error: "bad id I guess" });

  const decodedToken = handleToken(request.token);
  if (decodedToken.error) return response.status(401).json(decodedToken.error);

  console.log("Type of blog.user._id:", typeof blog.user._id);
  const blogOwnerID = blog.user._id.toString();
  console.log("Blog owner ID:", blogOwnerID);

  if (decodedToken.id !== blogOwnerID)
    return response
      .status(401)
      .json({ error: "You are not the user you are trying to remove" });

  try {
    const removedNote = await Blog.findByIdAndRemove({
      _id: request.params.id,
    });
    response.status(204).json(removedNote);
  } catch (error) {
    next(error);
  }
});

blogRouter.put("/:id", async (request, response, next) => {
  const body = request.body;
  let blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
    });
    response.status(200).json(updatedBlog);
  } catch (err) {
    next(err);
  }
});

module.exports = blogRouter;
