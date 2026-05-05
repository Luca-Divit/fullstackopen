const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");
const { initialUsers } = require("./test_helper");

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  const userObjects = initialUsers.map((user) => new User(user));
  const promiseArray = userObjects.map((user) => user.save());
  await Promise.all(promiseArray);
});

describe("GET users", () => {
  test("return the correct number of users in the json format", async () => {
    const response = await api.get("/api/users");

    assert.strictEqual(response.body.length, 2);
  });
});

describe("POST users", () => {
  test("correctly store a new blog in the database", async () => {
    const newUser = {
      username: "newUser",
      name: "New User",
      password: "newuserpassword",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const users = await api.get("/api/users");
    const contents = users.body.map((u) => u.username);

    assert.strictEqual(users.body.length, initialUsers.length + 1);
    assert(contents.includes("newUser"));
  });

  test("missing or short username is not valid", async () => {
    const neUser = {
      username: "ne",
      name: "Ne User",
      password: "newuserpassword",
    };

    await api
      .post("/api/users")
      .send(neUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const users = await api.get("/api/users");
    const contents = users.body.map((u) => u.username);

    assert.strictEqual(users.body.length, initialUsers.length);
    assert(!contents.includes("ne"));

    neUser.username = "";

    await api
      .post("/api/users")
      .send(neUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersReFetched = await api.get("/api/users");
    const contentsRefetched = usersReFetched.body.map((u) => u.username);

    assert.strictEqual(usersReFetched.body.length, initialUsers.length);
    assert(!contentsRefetched.includes(""));
  });

  test("missing or short password is not valid", async () => {
    const neUser = {
      username: "neeeee",
      name: "Ne User",
      password: "pw",
    };

    await api
      .post("/api/users")
      .send(neUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const users = await api.get("/api/users");
    const contents = users.body.map((u) => u.username);

    assert.strictEqual(users.body.length, initialUsers.length);
    assert(!contents.includes("neeeee"));

    neUser.password = "";

    await api
      .post("/api/users")
      .send(neUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersReFetched = await api.get("/api/users");
    const contentsRefetched = usersReFetched.body.map((u) => u.username);

    assert.strictEqual(usersReFetched.body.length, initialUsers.length);
    assert(!contentsRefetched.includes("neeeee"));
  });
});

after(async () => {
  await mongoose.connection.close();
});
