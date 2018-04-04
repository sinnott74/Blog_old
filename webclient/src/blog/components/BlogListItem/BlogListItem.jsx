import React from "react";
import PropTypes from "prop-types";
import Card from "core/components/Card";
import Link from "core/components/Link";
import TagChip from "blog/components/TagChip";
import "./BlogListItem.css";

const BlogListItem = props => {
  return (
    <Card className="bloglistitem">
      <div className="bloglistitem__heading">
        <Link to={`/blog/${props.id}`} className="bloglistitem__link">
          <span className="bloglistitem__title">{props.title}</span>
        </Link>
        <div className="bloglistitem__date">{props.date}</div>
      </div>
      <div className="bloglistitem__tags">
        {props.tags && getTags(props.tags)}
      </div>
    </Card>
  );
};

function getTags(propTags) {
  return propTags.map(tag => {
    return <TagChip tag={tag.name} />;
  });
}

BlogListItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })
  )
};

export default BlogListItem;
