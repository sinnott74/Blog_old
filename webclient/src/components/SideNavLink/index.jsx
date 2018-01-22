import React from 'react';
import PropTypes from 'prop-types'
import Link from '../Link';
import Icon from '../Icon';
import './style.css';

// Functional Component
const SideNavLink = (props) => {
  return  (
    <Link exact to={props.to} className="side-nav__link" activeClassName="side-nav__link-active">
      <Icon img={props.iconImg} alt={props.iconAlt} className="side-nav-link__icon"/>
      <div className="side-nav-link__text">
        {props.children}
      </div>
    </Link>
  );
}

SideNavLink.propTypes = {
  to: PropTypes.string
}

export default SideNavLink;