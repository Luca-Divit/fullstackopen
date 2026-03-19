const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (_req, res) => {
  blogs = await Blog.find({});
  res.status(200).json(blogs);
});

blogRouter.post("/", async (req, res) => {
  const { title, author, url, likes } = req.body;
  const blog = new Blog({ title, author, url, likes });

  if (!blog.title || !blog.url) {
    return res.status(400).json({ error: "Title and URL are required" });
  }

  result = await blog.save();
  res.status(201).json(result);
});

blogRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const blog = await Blog.findById(id);

  if (!blog) {
    return res.status(404).json({ error: "Blog does not exists" });
  }

  await blog.deleteOne();
  res.status(204).end();
});

module.exports = blogRouter;
