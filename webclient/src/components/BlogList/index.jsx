import React from 'react';
import PropTypes from 'prop-types'
import BlogListItem from '../BlogListItem'
import Spinner from '../Spinner'
import './style.css'
import { connect } from 'react-redux';
import { loadBlogPosts } from '../../actions/blog';

class BlogList extends React.Component {

  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    if(this.props.blogPostIDs.length === 0){
      return <Spinner />
    }

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

const mapDispatchToProps = (dispatch) => ({
  fetchData: () => dispatch(loadBlogPosts())
})

const mapStateToProps = (state) =>({
  blogPostIDs: state.blog.allIds
})

export default connect(mapStateToProps, mapDispatchToProps)(BlogList)