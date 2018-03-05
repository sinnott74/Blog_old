import React from "react";
import PropTypes from "prop-types";
import marked from "marked";
import "./ViewBlogPost.css";

class ViewBlogPost extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1 className="blogpost__title">{this.props.title}</h1>
        {this.props.author && (
          <div className="blogpost__subtitle">{`${this.props.date} by ${
            this.props.author
          }`}</div>
        )}
        <div
          className="blogpost__text"
          dangerouslySetInnerHTML={this.rawMarkup()}
        />
      </React.Fragment>
    );
  }

  rawMarkup() {
    if (this.props.text) {
      let rawMarkup = marked(this.props.text, {
        sanitize: true,
        breaks: true,
        gfm: true,
        tables: true
      });
      return { __html: rawMarkup };
    }
  }
}

ViewBlogPost.PropTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
};

export default ViewBlogPost;
