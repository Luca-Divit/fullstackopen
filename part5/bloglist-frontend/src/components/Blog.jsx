import { useState } from "react";

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false);

  const blogStyle = {
    padding: 12,
    border: "solid",
    borderWidth: 1,
  };

  return (
    <div style={blogStyle}>
      {blog.title}{" "}
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? "hide" : "show"}
      </button>
      {showDetails && (
        <ul>
          <li>{blog.author}</li>
          <li>{blog.url}</li>
        </ul>
      )}
    </div>
  );
};

export default Blog;
