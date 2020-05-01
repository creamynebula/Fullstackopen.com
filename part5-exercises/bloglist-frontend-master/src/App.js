import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault(); //don't refresh page
    try {
      let user = await loginService.login({ username, password }); //not the same user as the state variable, still need to change that
      console.log(
        "information we are going to put into user state variable:",
        user
      );
      window.localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword(""); //clean the form since we already logged in
    } catch (exception) {
      setErrorMessage("Bad credentials youngster");
      setTimeout(() => setErrorMessage(null), 5000); //after 5s clear error message
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("user");
    setUser(null);
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
        <div>
          {user.name} is logged in.
          <form onSubmit={handleLogout}>
            <button type="submit">Logout</button>
          </form>
        </div>
        <br />
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    );
};

export default App;
