const Blog = require("../models/blog");
const blogRouter = require("express").Router();
const User = require("../models/user");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);

  const users = await User.find({}); //keep in mind that this means we need to have at least a user to add blogs now
  const randomUser = users[Math.floor(Math.random() * users.length)];
  blog.user = randomUser._id; //this user is going to own the blog we are adding

  try {
    const result = await blog.save(); //save blog
    randomUser.blogs = randomUser.blogs.concat(result._id); //keep the blog in the user list of blogs
    await randomUser.save(); //save the user (with the updated information saying he owns blog)
    response.status(201).json(result); //return added blog with status 201 created
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
