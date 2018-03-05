import React from "react";
import PropTypes from "prop-types";
import Card from "core/components/Card";
import Link from "core/components/Link";
import "./BlogListItem.css";

const BlogListItem = props => {
  return (
    <Card className="bloglistitem">
      <Link to={`/blog/${props.id}`} className="bloglistentry__link">
        <span className="bloglistitem__title">{props.title}</span>
      </Link>
      <div className="bloglistitem__subtitle">{props.date}</div>
    </Card>
  );
};

BlogListItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
};

export default BlogListItem;
