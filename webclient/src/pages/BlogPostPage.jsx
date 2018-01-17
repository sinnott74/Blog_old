import React from 'react';
import PropTypes from 'prop-types'
import BlogPost from '../components/BlogPost'

// Functional Component
const BlogPostPage = (props) => {
  document.title = "Blog";
  return  <BlogPost id={props.match.params.id}/>
}

BlogPostPage.propTypes = {
  id: PropTypes.number
}

export default BlogPostPage;