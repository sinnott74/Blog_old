import React from 'react';
import AddBlogPost from '../components/AddBlogPost'
import Card from '../components/Card'

// Functional Component
const AddBlogPostPage = (props) => {
  document.title = "Add Blog Post";
  return  (
    <Card>
      <h1>Add Blog Post</h1>
      <AddBlogPost />
    </Card>
  )
}

export default AddBlogPostPage;