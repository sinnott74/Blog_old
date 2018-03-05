import React from "react";
import PropTypes from "prop-types";
import BlogPost from "blog/containers/BlogPost";

// Functional Component
const ViewBlogPostPage = props => {
  document.title = "Blog";
  return <BlogPost id={props.match.params.id} />;
};

ViewBlogPostPage.propTypes = {
  id: PropTypes.number
};

export default ViewBlogPostPage;
