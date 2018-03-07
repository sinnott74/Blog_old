import React from "react";
import PropTypes from "prop-types";
import "./OptionsMenuItem.css";
import Link from "core/components/Link";

const OptionsMenuItem = props => {
  return (
    <Link
      to={props.to}
      className="options-menu_item"
      tabIndex="0"
      onClick={props.handleItemClick}
    >
      {props.children}
    </Link>
  );
};
export default OptionsMenuItem;

OptionsMenuItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};
