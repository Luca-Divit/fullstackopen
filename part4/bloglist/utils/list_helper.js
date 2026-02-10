const blog = require("../models/blog");

const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  // return blogs.reduce((sum, blog) => {
  //   console.log(blog);
  //   return sum + blog.likes;
  // }, 0);
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (!blogs.length) {
    return "Please pass an array of blogs";
  }

  return blogs.reduce((prevBlog, currBlog) =>
    prevBlog.likes >= currBlog.likes ? prevBlog : currBlog,
  );
};
module.exports = { dummy, totalLikes, favoriteBlog };
