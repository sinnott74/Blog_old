import React from 'react';
import PropTypes from 'prop-types'
import Card from '../Card'
import Link from '../Link'
import './style.css'
import { connect } from "react-redux";
import marked from 'marked';

const BlogListItem = (props) => {

  return (
      <Card className="bloglistitem">
        <Link to={`/blog/${props.id}`} className="bloglistentry__link">
          <h1 className="bloglistitem__title">{props.title}</h1>
        </Link>
        <div className="blogpost__subtitle">{`${props.date} by ${props.author}`}</div>
        <div className="bloglistitem__text" dangerouslySetInnerHTML={rawMarkup(props.text)}></div>
        <Link to={`/blog/${props.id}`} className="bloglistitem__readmore">Read more</Link>
    </Card>
  )
}

const rawMarkup = (markDown) => {
  if(markDown){
    let rawMarkup = marked(markDown, {sanitize: true, breaks: true});
    return { __html: rawMarkup };
  }
}

BlogListItem.propTypes = {
  id: PropTypes.number.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  ...state.blog.byId[ownProps.id]
})

export default connect(mapStateToProps, null)(BlogListItem)
