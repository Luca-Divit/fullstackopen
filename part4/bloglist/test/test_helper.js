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

const initialUsers = [
  {
    username: "rootuser",
    name: "root",
    passwordHash: "supersecret",
  },
  {
    username: "adminuser",
    name: "admin",
    passwordHash: "secretadmin",
  },
];

module.exports = { initialBlogs, initialUsers };
