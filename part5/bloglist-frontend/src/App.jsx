import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import loginService from "./services/logins";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginResponse = await loginService.login(username, password);
      setUsername("");
      setPassword("");
      setUser(loginResponse.data);
    } catch (error) {
      alert(error.response.data.error);
      setUsername("");
      setPassword("");
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
          <h2>blogs</h2>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
