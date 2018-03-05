import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import { closeSideNav } from "core/ducks/sidenav";

const Link = props => {
  return (
    <NavLink
      {...props}
      to={{
        pathname: props.to,
        state: {
          from: props.location.pathname
        }
      }}
    />
  );
};

Link.PropTypes = {
  to: PropTypes.string.isRequired
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: e => {
      dispatch(closeSideNav());
      if (ownProps.onClick) {
        ownProps.onClick();
      }
    }
  };
};

export default withRouter(connect(null, mapDispatchToProps)(Link));
