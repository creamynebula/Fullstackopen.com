import React from "react";
const Blog = ({ blog }) => {
  return (
    <div>
      <b>{blog.title}</b> by <i>{blog.author}</i>
    </div>
  );
};

export default Blog;
