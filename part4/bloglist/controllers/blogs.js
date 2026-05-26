const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { sanitizeToken } = require("../utils/list_helper");
const { userExtractor } = require("../utils/middleware");

blogRouter.get("/", async (_req, res) => {
  blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  res.status(200).json(blogs);
});

blogRouter.post("/", userExtractor, async (req, res) => {
  const { title, author, url, likes } = req.body;
  const blog = new Blog({ title, author, url, likes });

  if (!blog.title || !blog.url) {
    return res.status(400).json({ error: "Title and URL are required" });
  }

  const user = await User.findById(req.user);
  blog.user = user.id;

  savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog.id);
  await user.save();

  res.status(201).json(savedBlog);
});

blogRouter.delete("/:id", userExtractor, async (req, res) => {
  const id = req.params.id;
  const blog = await Blog.findById(id);

  if (req.user !== String(blog.user)) {
    return res.status(403).json({
      error: "Unauthorised action by user",
    });
  }

  if (!blog) {
    return res.status(404).json({ error: "Blog does not exists" });
  }

  await blog.deleteOne();
  res.status(204).end();
});

blogRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  const blog = await Blog.findById(id);

  if (!blog) {
    return res.status(404).json({ error: "Blog does not exists" });
  }

  blog.likes += 1;

  await blog.save();
  res.status(201).json(blog);
});

module.exports = blogRouter;
