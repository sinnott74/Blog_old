import React from "react";
import PropTypes from "prop-types";
import Card from "core/components/Card";
import "./BlogPost.css";
import { connect } from "react-redux";
import { loadBlogPost } from "blog/ducks/blog";
import Link from "core/components/Link";
import marked from "marked";
import Button from "react-md/lib/Buttons/Button";

class BlogPost extends React.Component {
  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    return (
      <Card className="blogpost">
        <h1 className="blogpost__title">{this.props.title}</h1>
        {this.props.author && (
          <div className="blogpost__subtitle">{`${this.props.date} by ${
            this.props.author.fullname
          }`}</div>
        )}
        <div
          className="blogpost__text"
          dangerouslySetInnerHTML={this.rawMarkup()}
        />
        {this.getActions()}
      </Card>
    );
  }

  rawMarkup() {
    if (this.props.text) {
      let rawMarkup = marked(this.props.text, { sanitize: true, breaks: true });
      return { __html: rawMarkup };
    }
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
  id: PropTypes.string.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  ...state.blog.byId[ownProps.id],
  auth_id: state.auth.id
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchData: () => dispatch(loadBlogPost(ownProps.id))
});

export default connect(mapStateToProps, mapDispatchToProps)(BlogPost);
