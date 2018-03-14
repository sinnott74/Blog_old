import React, { Fragment } from "react";
import PropTypes from "prop-types";
import BlogListItem from "blog/components/BlogListItem";
import Spinner from "core/components/Spinner";
import "./BlogList.css";

export default class BlogList extends React.Component {
  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    if (this.props.blogPosts.length === 0) {
      return <Spinner />;
    }

    let blogPosts = this.props.blogPosts.map(function(blogPost) {
      return <BlogListItem key={blogPost.id} {...blogPost} />;
    });

    return <Fragment>{blogPosts}</Fragment>;
  }
}

BlogList.propTypes = {
  fetchData: PropTypes.func.isRequired,
  blogPosts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      author: PropTypes.shape({
        fullname: PropTypes.string.isRequired
      }),
      user_id: PropTypes.number.isRequired
    })
  ).isRequired
};
