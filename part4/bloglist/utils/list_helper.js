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
  if (blogs.length === 0) return;

  const counts = _.countBy(blogs, "author");
  const topAuthor = _.maxBy(_.toPairs(counts), ([author, count]) => count);

  return {
    author: topAuthor[0],
    blogs: topAuthor[1],
  };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return;

  return _.maxBy(
    blogs.reduce((prev, curr) => {
      const isInside = prev.findIndex((p) => {
        return p.author === curr.author;
      });

      if (isInside >= 0) {
        prev[isInside].likes += curr.likes;
        return prev;
      } else {
        prev.push({ author: curr.author, likes: curr.likes });
        return prev;
      }
    }, []),
    (o) => o.likes,
  );
};

// const mostLikes = (blogs) => {
//   if (blogs.length === 0) return;

//   const authorLikes = new Map();
//   let maxAuthor = null;

//   for (const blog of blogs) {
//     const currentLikes = authorLikes.get(blog.author) || 0;
//     const newTotal = currentLikes + blog.likes;

//     authorLikes.set(blog.author, newTotal);

//     if (!maxAuthor || newTotal > maxAuthor.likes) {
//       maxAuthor = {
//         author: blog.author,
//         likes: newTotal,
//       };
//     }
//   }

//   return maxAuthor;
// };

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
