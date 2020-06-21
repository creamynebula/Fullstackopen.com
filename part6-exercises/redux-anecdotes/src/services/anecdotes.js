import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const object = { content, votes: 0 };
  const response = await axios.post(baseUrl, object);
  //console.log("CreateNew is going to return:", response.data);
  return response.data;
};

const updateVotes = async (id) => {
  const request = await axios.get(baseUrl + `/${id}`);
  const anecdoteToUpdate = request.data;
  anecdoteToUpdate.votes += 1;
  const response = await axios.put(baseUrl + `/${id}`, anecdoteToUpdate);
  //console.log("response to axios.put:", response);
  //console.log("updateVotes is going to return:", response.data);
  return response.data;
};

export default { getAll, createNew, updateVotes };
