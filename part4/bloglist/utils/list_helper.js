const _ = require("lodash");
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

const mostBlogs = (blogs) => {
  const counts = _.countBy(blogs, "author");
  const topAuthor = _.maxBy(_.toPairs(counts), ([author, count]) => count);

  return {
    author: topAuthor[0],
    blogs: topAuthor[1],
  };
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs };
