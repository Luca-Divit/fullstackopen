const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");
const { initialBlogs, dummyUser } = require("./test_helper");
const jwt = require("jsonwebtoken");

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  const userObject = new User(dummyUser);
  const savedUser = await userObject.save();

  await Blog.deleteMany({});
  const blogObjects = initialBlogs.map((blog) => {
    const newBlog = new Blog(blog);
    newBlog.user = savedUser.id;
    return newBlog;
  });
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
    const retreivedUser = await User.findOne({});

    const userForToken = {
      username: retreivedUser.username,
      id: retreivedUser._id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET);

    const newBlog = {
      title: "New blog",
      author: "New author",
      url: "www.newurl.com",
      likes: 0,
      user: retreivedUser._id,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogs = await api.get("/api/blogs");
    const contents = blogs.body.map((b) => b.url);

    assert.strictEqual(blogs.body.length, initialBlogs.length + 1);
    assert(contents.includes("www.newurl.com"));
  });

  test("if likes property is missing in request then default to 0", async () => {
    const retreivedUser = await User.findOne({});

    const userForToken = {
      username: retreivedUser.username,
      id: retreivedUser._id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET);

    const newBlog = {
      title: "New blog",
      author: "New author",
      url: "www.newurl.com",
      user: retreivedUser.id,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogs = await api.get("/api/blogs");
    const lastSavedBlog = blogs.body.slice(-1)[0];

    assert.strictEqual(lastSavedBlog.likes, 0);
  });

  test("missing title or url in a post request will respond 400", async () => {
    const retreivedUser = await User.findOne({});

    const userForToken = {
      username: retreivedUser.username,
      id: retreivedUser._id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET);

    const newBlog = new Blog({
      author: "New author",
      url: "www.newurl.com",
      user: retreivedUser.id,
    });

    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `Bearer ${token}`)
      .expect(400);
  });
});

describe("DELETE blogs", () => {
  test("delete a post by its id", async () => {
    const retreivedUser = await User.findOne({});

    const userForToken = {
      username: retreivedUser.username,
      id: retreivedUser._id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET);

    const blogs = await Blog.find({});
    const { id } = blogs[0];

    await api
      .delete(`/api/blogs/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);
  });

  test("missing blog id will return 404", async () => {
    const retreivedUser = await User.findOne({});

    const userForToken = {
      username: retreivedUser.username,
      id: retreivedUser._id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET);

    const dummyId = "";

    await api
      .delete(`/api/blogs/${dummyId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(404);
  });

  test("malformatted id returns 400", async () => {
    const retreivedUser = await User.findOne({});

    const userForToken = {
      username: retreivedUser.username,
      id: retreivedUser._id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET);

    const malformattedId = "malformattedId";

    await api
      .delete(`/api/blogs/${malformattedId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(400);
  });
});

describe("PUT blogs", () => {
  test("update a blog likes by its id", async () => {
    const blogs = await Blog.find({});
    const { id } = blogs[0];

    const response = await api
      .put(`/api/blogs/${id}`)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(blogs[0].likes + 1, response.body.likes);
  });

  test("missing blog id will return 404", async () => {
    const dummyId = "63229bfba9ac2102a50000cd";

    await api.put(`/api/blogs/${dummyId}`).expect(404);
  });

  test("malformatted id returns 400", async () => {
    const malformattedId = "malformattedId";

    await api.put(`/api/blogs/${malformattedId}`).expect(400);
  });
});

after(async () => {
  await mongoose.connection.close();
});
