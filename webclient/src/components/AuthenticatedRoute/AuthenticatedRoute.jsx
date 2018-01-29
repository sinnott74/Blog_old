import React from 'react';
import { connect } from "react-redux";
import { withRouter, Route, Redirect } from 'react-router-dom';

/**
 * Redirected a user if isLoggedIn is not true
 */
const AuthenticatedRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={props => (
    rest.isLoggedIn ? ( <Component {...props}/> ) : (<Redirect to={{ pathname: '/login', state: { from: props.location } }}/> )
  )}/>
);

const mapStateToProps = (state, ownProps) => ({
  isLoggedIn: state.auth.loggedIn
})

export default connect(mapStateToProps, null)(AuthenticatedRoute);