import axios from "axios";
const baseUrl = "/api/blogs";

const prepareTokenForRequests = (newToken) => {
  //I think we have to call this on the frontend before every request to our functions here in blogservice
  return `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const addBlog = async (newBlog, tokenForRequests) => {
  console.log(
    `we are inside blogService.addBlog, and the value of tokenForRequests is ${tokenForRequests}\n`
  );
  const config = {
    headers: { Authorization: tokenForRequests },
  };
  try {
    const response = await axios.post(baseUrl, newBlog, config);
    return response.data;
  } catch (exception) {
    console.log("some error while we tried to addBlog", exception);
  }
};

export default { getAll, prepareTokenForRequests, addBlog };
