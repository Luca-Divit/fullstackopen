import { useState } from "react";

const Blog = ({ blog, handleLike }) => {
  const [showDetails, setShowDetails] = useState(false);

  const blogStyle = {
    padding: 12,
    border: "solid",
    borderWidth: 1,
  };

  const detailsStyle = {
    display: "flex",
    flexDirection: "column",
    marginLeft: 12,
    alignItems: "flex-start",
  };

  const buttonStyle = {
    backgroundColor: "royalblue",
    borderRadius: "4px",
  };

  const handleRemove = () => {
    return window.confirm(`Remove blog ${blog.title} by ${blog.author}`);
  };

  return (
    <div style={blogStyle}>
      {blog.title}{" "}
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? "hide" : "show"}
      </button>
      {showDetails && (
        <div style={detailsStyle}>
          <span>{blog.author}</span>
          <span>{blog.url}</span>
          <span>
            {blog.likes} <button onClick={() => handleLike(blog)}>Like</button>
          </span>
          <span>{blog.user.username}</span>
          <button onClick={handleRemove} style={buttonStyle}>
            remove
          </button>
        </div>
      )}
    </div>
  );
};

export default Blog;
