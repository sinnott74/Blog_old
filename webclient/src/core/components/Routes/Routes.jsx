import React from 'react';
import { Route, Switch } from 'react-router';
import Loadable from 'react-loadable';
import Spinner from 'core/components/Spinner';
import AuthernticatedRoute from 'core/components/AuthenticatedRoute';

/**
 * Import all route pages
 * @param {Array} Array of require contexts which map to a route config file
 */
function importAll(r) {
  return r.keys().map((item) => {
    return r(item).default;
  })
}
// Relative to Src, recursively look for all files that match **/pages/pages.js
const pages = importAll(require.context('../../../', true, /.+\/pages\/pages.js/));

/**
 * Combine the page configurations
 */
let routesConfigs = []
pages.forEach((pagesConfig) => {
  routesConfigs = routesConfigs.concat(pagesConfig);
})

/**
 * Creates a React-Router route for each configured route
 */
const dynamicRoutes = routesConfigs.map(routeConfig => {
  const component = Loadable({
    loader: routeConfig.loader,
    loading: Spinner
  });
  const routeProps = {
    path: routeConfig.path,
    exact: true
  };
  const route =
    routeConfig.authenticated ?
      <AuthernticatedRoute {...routeProps} component={component} /> :
      <Route {...routeProps} component={component} />
  return route;
})

const Routes = (props) => {
  return (
    <Switch className="main">
      {dynamicRoutes}
    </Switch>
  )
}

export default Routes;