import React, { Fragment } from 'react';
import PropTypes from 'prop-types'
import BlogListItem from '../BlogListItem'
import Spinner from '../Spinner'
import './BlogList.css'
import { connect } from 'react-redux';
import { loadBlogPosts, getBlogPostsSortedByCreatedByDate } from '../../redux/modules/blog';

class BlogList extends React.Component {

  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    if(this.props.blogPosts.length === 0){
      return <Spinner />
    }

    let blogPosts = this.props.blogPosts.map(function(blogPost){
      return <BlogListItem key={blogPost.id} {...blogPost}/>
    });

    return (
      <Fragment>
        { blogPosts }
      </Fragment>
    );
  }
}

BlogList.propTypes = {
  fetchData: PropTypes.func.isRequired,
  blogPostIDs: PropTypes.arrayOf(PropTypes.number).isRequired
}

const mapDispatchToProps = (dispatch) => ({
  fetchData: () => dispatch(loadBlogPosts())
})

const mapStateToProps = (state) =>({
  blogPosts: getBlogPostsSortedByCreatedByDate(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(BlogList)