const Blog = require("../models/blog");
const blogRouter = require("express").Router();
const User = require("../models/user");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user");
  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);

  const users = await User.find({}); //keep in mind that this means we need to have at least a user to add blogs now
  const randomUser = users[Math.floor(Math.random() * users.length)];
  blog.user = randomUser._id;

  try {
    const result = await blog.save();
    response.status(201).json(result);
  } catch (err) {
    response.status(500).json({ error: "some error saving the blog", ...err });
  }
});

blogRouter.delete("/:id", async (request, response, next) => {
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
