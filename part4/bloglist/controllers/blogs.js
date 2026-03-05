const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (_req, res) => {
  blogs = await Blog.find({});
  res.json(blogs);
});

blogRouter.post("/", (req, res, next) => {
  const blog = new Blog(req.body);

  blog
    .save()
    .then((createdBlog) => {
      res.status(201).json(createdBlog);
    })
    .catch((err) => next(err));
});

module.exports = blogRouter;
