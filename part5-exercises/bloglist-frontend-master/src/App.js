import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [blogTitle, setBlogTitle] = useState("");
  const [blogUrl, setBlogUrl] = useState("");
  const [blogLikes, setBlogLikes] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault(); //don't refresh page
    try {
      let user = await loginService.login({ username, password }); //not the same user as the state variable, still need to change that
      console.log(
        `information we are going to put into user state variable: ${JSON.stringify(
          user
        )}\n`
      );

      window.localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      setMessage(`You are now logged in ${user.username}`);
      setUsername("");
      setPassword(""); //clean the form since we already logged in
      setTimeout(() => setMessage(""), 5000); //after 5s clear login message
    } catch (exception) {
      setMessage("Bad credentials youngster.");
      setTimeout(() => setMessage(""), 5000); //after 5s clear error message
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("user");
    setMessage(`${user.username} logged out`);
    setUser(null);
    setTimeout(() => setMessage(""), 5000); //after 5s clear error message
  };

  const handleAddBlog = async (event) => {
    event.preventDefault();
    const newBlog = {
      title: blogTitle,
      url: blogUrl,
      likes: blogLikes,
    };
    try {
      await blogService.addBlog(
        newBlog,
        blogService.prepareTokenForRequests(user.token)
      );
      setMessage(`${blogTitle} added`);
      setBlogTitle("");
      setBlogUrl("");
      setBlogLikes("");
      setTimeout(() => setMessage(""), 5000);
    } catch (exception) {
      console.log("some error while we tried to handleAddBlog", exception);
    }
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserString = window.localStorage.getItem("user");
    if (loggedUserString) {
      setUser(JSON.parse(loggedUserString));
    }
  }, []);

  if (user === null)
    return (
      <div>
        <Notification message={message} />
        <h2>log in to to our awesome application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username:{" "}
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password:{" "}
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  else
    return (
      <div>
        <h2>blogs</h2>
        <Notification message={message} />
        <div>
          {user.name} is logged in.
          <form onSubmit={handleLogout}>
            <button type="submit">Logout</button>
          </form>
        </div>
        <div>
          <h2>create new</h2>

          <form onSubmit={handleAddBlog}>
            <div>
              title:{" "}
              <input
                type="text"
                value={blogTitle}
                onChange={({ target }) => setBlogTitle(target.value)}
              />
            </div>
            <div>
              url:{" "}
              <input
                type="text"
                value={blogUrl}
                onChange={({ target }) => setBlogUrl(target.value)}
              />
            </div>
            <div>
              likes:{" "}
              <input
                type="text"
                value={blogLikes}
                onChange={({ target }) => setBlogLikes(target.value)}
              />
            </div>
            <input type="submit" value="create blog" />
          </form>
        </div>
        <br />
        {blogs.map((blog) => (
          <Blog key={Math.random()} blog={blog} />
        ))}
      </div>
    );
};

export default App;
