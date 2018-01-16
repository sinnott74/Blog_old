import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from "react-redux";
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import { closeSideNav } from '../../actions/sidenav';

NavLink.PropTypes = {
  to: PropTypes.string.isRequired
}

const mapDispatchToProps = {
  onClick: closeSideNav
}


export default withRouter(connect(null, mapDispatchToProps)(NavLink))