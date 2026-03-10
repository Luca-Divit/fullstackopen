const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const initialBlogs = require("./test_helper");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test.only("return the correct number of blog posts in the json format", async () => {
  const response = await api.get("/api/blogs");

  assert.strictEqual(response.body.length, 3);
});

test.only("the unique identifier property of the blog posts is named id", async () => {
  const response = await api.get("/api/blogs");

  blogHaveIds = response.body.every((b) => b.id);

  assert.strictEqual(blogHaveIds, true);
});

after(async () => {
  await mongoose.connection.close();
});
