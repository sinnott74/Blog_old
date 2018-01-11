import React from 'react';
import PropTypes from 'prop-types'
import Link from '../Link';
import './style.css';

// Functional Component
const SideNavLink = (props) => {
  return  <Link exact to={props.to} className="side-nav__link" activeClassName="side-nav__link-active">{props.children}</Link>
}

SideNavLink.propTypes = {
  to: PropTypes.string
}

export default SideNavLink;