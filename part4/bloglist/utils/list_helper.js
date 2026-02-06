const blog = require("../models/blog");

const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  // return blogs.reduce((sum, blog) => {
  //   console.log(blog);
  //   return sum + blog.likes;
  // }, 0);
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

module.exports = { dummy, totalLikes };
