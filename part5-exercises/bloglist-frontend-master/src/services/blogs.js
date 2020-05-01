import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;
let config = null;
const prepareTokenForRequests = (newToken) => {
  token = `bearer ${newToken}`;
  config = {
    headers: { Authorization: token },
  };
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

export default { getAll, prepareTokenForRequests };
