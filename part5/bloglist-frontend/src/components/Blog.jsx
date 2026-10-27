import { useState } from "react"

const Blog = ({ blog, handleLike, handleRemove, user }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    padding: 12,
    border: "solid",
    borderWidth: 1,
  }

  const detailsStyle = {
    display: "flex",
    flexDirection: "column",
    marginLeft: 12,
    alignItems: "flex-start",
  }

  const buttonStyle = {
    backgroundColor: "royalblue",
    borderRadius: "4px",
  }

  const isBlogOwner = user.username === blog.user.username

  const handleRemoveBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      handleRemove(blog)
    }
  }

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
          {isBlogOwner && (
            <button onClick={handleRemoveBlog} style={buttonStyle}>
              remove
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
