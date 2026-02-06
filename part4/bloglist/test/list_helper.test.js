const { test, describe } = require("node:test");
const assert = require("node:assert");

const listHelper = require("../utils/list_helper");

describe("dummy function", () => {
  test("returns 1", () => {
    const blogs = [];
    const result = listHelper.dummy(blogs);

    assert.strictEqual(result, 1);
  });
});

describe("total likes", () => {
  const listWithOneBlog = [
    {
      id: "5a422aa71b54a676234d17f8",
      title: "blogNoOne",
      author: "me",
      url: "www.www.www",
      likes: 1000,
    },
  ];

  const blogs = [
    {
      id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
    },
    {
      id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
    },
    {
      id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
    },
    {
      id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
    },
    {
      id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
    },
  ];

  test("when list has only one blog returns the likes of that", () => {
    result = listHelper.totalLikes(listWithOneBlog);
    assert.strictEqual(result, 1000);
  });

  test("works with an array of blogs", () => {
    result = listHelper.totalLikes(blogs);

    assert.strictEqual(result, 36);
  });

  test("returns 0 with empty array", () => {
    result = listHelper.totalLikes([]);

    assert.strictEqual(result, 0);
  });
});
