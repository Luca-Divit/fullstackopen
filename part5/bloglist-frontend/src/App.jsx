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
    blogService.getAll().then((blogs) => setBlogs(blogs.data));
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

  const handleLogout = () => {
    console.log("Logout button clicked");
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
          <p>
            <i>{user.name} logged in </i>
            <button onClick={handleLogout}>Logout</button>
          </p>
          <h2>Blogs</h2>
          <ul>
            {blogs.map((blog) => (
              <li>
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
