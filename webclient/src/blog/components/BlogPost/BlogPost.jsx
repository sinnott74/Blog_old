import React from "react";
import PropTypes from "prop-types";
import Card from "core/components/Card";
import "./BlogPost.css";
import Link from "core/components/Link";
import Button from "react-md/lib/Buttons/Button";
import ViewBlogPost from "blog/components/ViewBlogPost";

export default class BlogPost extends React.Component {
  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    const authorName = this.props.author ? this.props.author.fullname : "";
    return (
      <Card className="blogpost">
        <ViewBlogPost
          title={this.props.title}
          text={this.props.text}
          author={authorName}
          date={this.props.date}
        />
        {this.getActions()}
      </Card>
    );
  }

  getActions() {
    // logged in user = blog post owner
    if (this.props.user_id && this.props.auth_id === this.props.user_id) {
      return (
        <div className="blogpost_actions">
          <Link to={`/blog/${this.props.id}/edit`}>
            <Button raised={true} secondary>
              Delete
            </Button>
          </Link>
          <Link to={`/blog/${this.props.id}/edit`}>
            <Button raised={true} primary>
              Edit
            </Button>
          </Link>
        </div>
      );
    }
  }
}

BlogPost.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  author: PropTypes.shape({
    fullname: PropTypes.string.isRequired
  }),
  user_id: PropTypes.string.isRequired,
  auth_id: PropTypes.string.isRequired,
  fetchData: PropTypes.func.isRequired
};
