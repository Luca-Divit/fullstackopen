import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";
import blogService from "./services/blogs";
import loginService from "./services/logins";
import BlogForm from "./components/BlogFrom";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs.data));
  }, []);

  useEffect(() => {
    const localStoredUser = window.localStorage.getItem("user");
    if (localStoredUser) {
      const parsedUserJson = JSON.parse(localStoredUser);
      setUser(parsedUserJson);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginResponse = await loginService.login(username, password);
      const userObject = loginResponse.data;
      setUsername("");
      setPassword("");
      window.localStorage.setItem("user", JSON.stringify(userObject));
      setUser(userObject);
    } catch (error) {
      alert(error.response.data.error);
      setUsername("");
      setPassword("");
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("user");
    setUser(null);
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    try {
      const response = await blogService.createBlog(
        title,
        author,
        url,
        user.token,
      );
      setBlogs(blogs.concat(response.data));
      setTitle("");
      setAuthor("");
      setUrl("");
    } catch (error) {
      alert(error.response.data.error);
      setTitle("");
      setAuthor("");
      setUrl("");
    }
  };

  return (
    <div>
      <h1>BlogList App</h1>
      {!user && (
        <LoginForm
          handleSubmit={handleSubmit}
          username={username}
          setUsername={(e) => setUsername(e.target.value)}
          password={password}
          setPassword={(e) => setPassword(e.target.value)}
        />
      )}
      {user && (
        <>
          <Logout user={user} handleLogout={handleLogout} />
          <h2>Create new</h2>
          <BlogForm
            handleCreateBlog={handleCreateBlog}
            title={title}
            setTitle={setTitle}
            author={author}
            setAuthor={setAuthor}
            url={url}
            setUrl={setUrl}
          />
          <h2>Blogs</h2>
          <ul>
            {blogs.map((blog) => (
              <li key={blog.id}>
                <Blog key={blog.id} blog={blog} />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default App;
