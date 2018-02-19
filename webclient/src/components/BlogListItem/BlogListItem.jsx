import React from 'react';
import PropTypes from 'prop-types'
import Link from '../Link'
import './BlogListItem.css'
import { connect } from "react-redux";

const BlogListItem = (props) => {

  return (
      <div className="bloglistitem">
        <Link to={`/blog/${props.id}`} className="bloglistentry__link">
          <span className="bloglistitem__title">{props.title}</span>
        </Link>
        <div className="bloglistitem__subtitle">{props.date}</div>
    </div>
  )
}

BlogListItem.propTypes = {
  id: PropTypes.number.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  ...state.blog.byId[ownProps.id]
})

export default connect(mapStateToProps, null)(BlogListItem)
