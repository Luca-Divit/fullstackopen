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

test("return the correct number of blog posts in the json format", async () => {
  const response = await api.get("/api/blogs");

  assert.strictEqual(response.body.length, 3);
});

test("the unique identifier property of the blog posts is named id", async () => {
  const response = await api.get("/api/blogs");

  blogHaveIds = response.body.every((b) => b.id);

  assert.strictEqual(blogHaveIds, true);
});

test.only("correctly store a new blog in the database", async () => {
  const newBlog = new Blog({
    title: "New blog",
    author: "New author",
    url: "www.newurl.com",
    likes: 0,
  });

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogs = await api.get("/api/blogs");
  const contents = blogs.body.map((b) => b.url);

  assert.strictEqual(blogs.body.length, initialBlogs.length + 1);
  assert(contents.includes("www.newurl.com"));
});

after(async () => {
  await mongoose.connection.close();
});
