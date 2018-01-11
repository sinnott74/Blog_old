import React from 'react';
import PropTypes from 'prop-types'
import BlogListItem from '../BlogListItem'
import './style.css'

class BlogList extends React.Component {

  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    let blogPosts = this.props.blogPostIDs.map(function(id){
      return <BlogListItem key= {id} id={id} />
    });

    return (
      <div className="bloglist">
        { blogPosts }
      </div>
    );
  }
}

BlogList.propTypes = {
  fetchData: PropTypes.func.isRequired,
  blogPostIDs: PropTypes.arrayOf(PropTypes.number).isRequired
}

import { connect } from 'react-redux';
import { loadBlogPosts } from '../../actions/blog';

const mapDispatchToProps = (dispatch) => ({
  fetchData: () => dispatch(loadBlogPosts())
})

const mapStateToProps = (state) =>({
  blogPostIDs: state.blog.allIds
})

export default connect(mapStateToProps, mapDispatchToProps)(BlogList)