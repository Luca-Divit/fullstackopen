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

const addLike = async (blog, token) => {
  const request = axios.put(
    `${baseUrl}/${blog.id}`,
    {
      ...blog,
      likes: blog.likes + 1,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return request;
};

const removeBlog = async (blog, token) => {
  console.log(blog);

  const request = axios.delete(`${baseUrl}/${blog.id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return request;
};

export default { getAll, createBlog, addLike, removeBlog };
