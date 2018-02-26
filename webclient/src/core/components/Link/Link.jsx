import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from "react-redux";
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import { closeSideNav } from 'core/ducks/sidenav';

NavLink.PropTypes = {
  to: PropTypes.string.isRequired
}

// const mapDispatchToProps = {
//   onClick: closeSideNav
// }

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: (e) => {
      dispatch(closeSideNav());
      if(ownProps.onClick){
        ownProps.onClick();
      }
    }
  };
};

const Link = (props) => {
  return <NavLink {... props} to={{
      pathname: props.to,
      state: {
        from: props.location.pathname
      }
    }}/>
}


export default withRouter(connect(null, mapDispatchToProps)(Link))