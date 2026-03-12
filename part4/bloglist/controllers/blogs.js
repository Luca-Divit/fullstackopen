const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (_req, res) => {
  blogs = await Blog.find({});
  res.json(blogs);
});

blogRouter.post("/", async (req, res) => {
  const blog = new Blog(req.body._doc);

  result = await blog.save();
  res.status(201).json(result);
});

module.exports = blogRouter;
