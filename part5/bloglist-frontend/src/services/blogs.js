import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = async () => {
  const request = axios.get(baseUrl);
  return request;
};

const createBlog = async (title, author, url, token) => {
  const request = axios.post(
    baseUrl,
    {
      title,
      author,
      url,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return request;
};

export default { getAll, createBlog };
