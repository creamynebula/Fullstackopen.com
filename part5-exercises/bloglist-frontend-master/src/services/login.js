import axios from "axios";
const baseUrl = "/api/login";
//this works even in development because in package.json we have proxy setup to localhost:3001
//and our backend is running there, and login is in /api/login

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  //the credentials here are {username: , password: }
  //I guess syntax is (api url, payload) for any appropriate post request
  return response.data;
};

export default { login };
