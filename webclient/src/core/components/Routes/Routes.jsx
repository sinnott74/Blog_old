import React from 'react';
import { Route, Switch } from 'react-router';
import Loadable from 'react-loadable';
import Spinner from 'core/components/Spinner';
import AuthernticatedRoute from 'core/components/AuthenticatedRoute';

function importAll(r) {
  return r.keys().map((item) => {
    return r(item).default;
  })
}
const pages = importAll(require.context('./', true, /.+\/pages\/pages.js/));

let routesConfigs = []
pages.forEach((pagesConfig) => {
  routesConfigs = routesConfigs.concat(pagesConfig);
})

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