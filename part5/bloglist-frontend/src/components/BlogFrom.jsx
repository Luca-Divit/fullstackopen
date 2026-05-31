const BlogForm = ({
  handleCreateBlog,
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
}) => {
  return (
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
  );
};

export default BlogForm;
