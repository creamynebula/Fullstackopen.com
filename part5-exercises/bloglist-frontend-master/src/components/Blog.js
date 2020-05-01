import React from "react";
const Blog = ({ blog }) => (
  <div>
    <b>{blog.title}</b> by <i>{blog.author}</i>
  </div>
);

export default Blog;
