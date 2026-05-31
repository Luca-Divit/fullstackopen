import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = async () => {
  const request = axios.get(baseUrl);
  return request;
};

export default { getAll };
