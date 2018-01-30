import React from 'react';
import PropTypes from 'prop-types'
import Card from '../Card'
import Link from '../Link'
import './style.css'
import { connect } from "react-redux";

const BlogListItem = (props) => {

  return (
      <Card className="bloglistitem__card">
        <div className="bloglistitem">
          <div className="bloglistitem__imagecontainer">
            <img className="bloglistitem__image" src="https://images.unsplash.com/photo-1483199095378-ce6e77cd1c0d?auto=format&fit=crop&w=1717&q=80" alt="" />
          </div>
          <div className="bloglistitem__detailscontainer">
            <Link to={`/blog/${props.id}`} className="bloglistentry__link">
              <div className="bloglistitem__title">{props.title}</div>
            </Link>
            <div className="bloglistitem__date">{props.date}</div>
            <div className="bloglistitem__textcontainer">
              <div className="bloglistitem__text">{props.text}</div>
              <Link to={`/blog/${props.blogpost_id}`} className="bloglistitem__readmore">Read more</Link>
            </div>
          </div>
        </div>
      </Card>
  )
}

BlogListItem.propTypes = {
  id: PropTypes.number.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  ...state.blog.byId[ownProps.id]
})

export default connect(mapStateToProps, null)(BlogListItem)
