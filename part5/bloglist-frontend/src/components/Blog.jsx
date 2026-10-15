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
            {blog.likes} <button onClick={handleLike}>Like</button>
          </span>
        </div>
      )}
    </div>
  );
};

export default Blog;
