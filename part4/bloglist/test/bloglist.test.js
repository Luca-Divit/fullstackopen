const { test, after, beforeEach, afterEach, describe } = require("node:test");
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

describe("GET blogs", () => {
  test("return the correct number of blog posts in the json format", async () => {
    const response = await api.get("/api/blogs");

    assert.strictEqual(response.body.length, 3);
  });

  test("the unique identifier property of the blog posts is named id", async () => {
    const response = await api.get("/api/blogs");

    blogHaveIds = response.body.every((b) => b.id);

    assert.strictEqual(blogHaveIds, true);
  });
});

describe("POST blogs", () => {
  test("correctly store a new blog in the database", async () => {
    const newBlog = {
      title: "New blog",
      author: "New author",
      url: "www.newurl.com",
      likes: 0,
    };

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

  test("if likes property is missing in request then default to 0", async () => {
    const newBlog = {
      title: "New blog",
      author: "New author",
      url: "www.newurl.com",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogs = await api.get("/api/blogs");
    const lastSavedBlog = blogs.body.slice(-1)[0];

    assert.strictEqual(lastSavedBlog.likes, 0);
  });

  test("missing title or url in a post request will respond 400", async () => {
    const newBlog = new Blog({
      author: "New author",
      url: "www.newurl.com",
    });

    await api.post("/api/blogs").send(newBlog).expect(400);
  });
});

after(async () => {
  await mongoose.connection.close();
});
