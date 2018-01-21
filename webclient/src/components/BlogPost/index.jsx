import React from 'react';
import PropTypes from 'prop-types'
import Card from '../Card'
import './style.css'
import { connect } from "react-redux";
import { loadBlogPost } from '../../actions/blog';

class BlogPost extends React.Component {

  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    return (
      <div className="blogpost">
        <Card>
            <div className="blogpost__title">{this.props.title}</div>
            <div className="blogpost__author">{this.props.author}</div>
            <div className="blogpost__date">{this.props.date}</div>
            <div className="blogpost__text">{this.props.text}</div>
        </Card>
      </div>
    )
  }
}

BlogPost.propTypes = {
  id: PropTypes.string.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  ...state.blog.byId[ownProps.id]
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchData: () => dispatch(loadBlogPost(ownProps.id))
})

export default connect(mapStateToProps, mapDispatchToProps)(BlogPost)
