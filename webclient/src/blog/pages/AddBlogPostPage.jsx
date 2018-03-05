import React from "react";
import AddBlogPost from "blog/components/AddBlogPost";
import Card from "core/components/Card";

// Functional Component
const AddBlogPostPage = props => {
  document.title = "Add Blog Post";
  return (
    <Card>
      <h1>Add Blog Post</h1>
      <AddBlogPost />
    </Card>
  );
};

export default AddBlogPostPage;
