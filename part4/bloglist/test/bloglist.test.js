const { test, after, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");

const api = supertest(app);

const initialBlogs = [
  {
    title: "My first blog",
    author: "Me",
    url: "localhost",
    likes: 1,
  },
  {
    title: "My second blog",
    author: "Myself",
    url: "localhosttwo",
    likes: 2,
  },
  {
    title: "My third blog",
    author: "and I",
    url: "localhostthree",
    likes: 3,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test.only("return the correct number of blog posts in the json format", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

after(async () => {
  await mongoose.connection.close();
});
