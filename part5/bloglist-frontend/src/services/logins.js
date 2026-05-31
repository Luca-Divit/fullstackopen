import axios from "axios";
const baseUrl = "/api/login";

const login = async (username, password) => {
  const request = axios.post(baseUrl, {
    username,
    password,
  });
  return request;
};

export default { login };
