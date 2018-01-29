import React from 'react';
import EditBlogPost from '../components/EditBlogPost'
import Card from '../components/Card'

// Functional Component
const EditBlogPostPage = (props) => {
  document.title = "Blog";
  return  (
    <Card>
      <h1>Edit Blog Post</h1>
      <EditBlogPost id={props.match.params.id}/>
    </Card>
  )
}

export default EditBlogPostPage;