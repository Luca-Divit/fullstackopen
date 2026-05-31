import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";
import blogService from "./services/blogs";
import loginService from "./services/logins";

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

  const handleCreateBlog = (e) => {
    e.preventDefault();
    console.log("TODO: handleCreateBlog");
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
          <form onSubmit={handleCreateBlog}>
            <label>
              Title
              <br />
              <input
                type="text"
                value={title}
                placeholder="blog title here"
                onChange={({ target }) => {
                  setTitle(target.value);
                }}
              />
            </label>
            <br />
            <label>
              Author
              <br />
              <input
                type="text"
                value={author}
                placeholder="blog author"
                onChange={({ target }) => {
                  setAuthor(target.value);
                }}
              />
            </label>
            <br />
            <label>
              Url
              <br />
              <input
                type="text"
                value={url}
                placeholder="blog url"
                onChange={({ target }) => {
                  setUrl(target.value);
                }}
              />
            </label>
            <br />
            <br />
            <button>Create blog</button>
          </form>
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
