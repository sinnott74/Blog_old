import React from 'react';
import { Route, Switch } from 'react-router';
import Loadable from 'react-loadable';
import Spinner from '../Spinner';

const LoadableHomePage = Loadable({
  loader: () => import(/* webpackChunkName: "indexPage" */ '../../pages/HomePage'),
  loading: Spinner
})

const LoadableBlogListPage = Loadable({
  loader: () => import(/* webpackChunkName: "BlogListPage" */ '../../pages/BlogListPage'),
  loading: Spinner
})

const LoadableBlogPostPage = Loadable({
  loader: () => import(/* webpackChunkName: "BlogPostPage" */ '../../pages/BlogPostPage'),
  loading: Spinner
})

const LoadableCodeListPage = Loadable({
  loader: () => import(/* webpackChunkName: "CodeListPage" */ '../../pages/CodeListPage'),
  loading: Spinner
})

const LoadableError404Page = Loadable({
  loader: () => import(/* webpackChunkName: "Error404Page" */ '../../pages/Error404Page'),
  loading: Spinner
})

const LoadableLoginPage = Loadable({
  loader: () => import(/* webpackChunkName: "LoginPage" */ '../../pages/LoginPage'),
  loading: Spinner
})

const LoadableLogoutPage = Loadable({
  loader: () => import(/* webpackChunkName: "LogoutPage" */ '../../pages/LogoutPage'),
  loading: Spinner
})

const LoadableSignUpPage = Loadable({
  loader: () => import(/* webpackChunkName: "SignUpPage" */ '../../pages/SignUpPage'),
  loading: Spinner
})

const Routes = (props) => {
  return (
    <Switch className="main">
      <Route exact path="/" component={LoadableHomePage} />
      <Route exact path="/blog" component={LoadableBlogListPage} />
      <Route path="/blog/:id" component={LoadableBlogPostPage} />
      <Route exact path="/code" component={LoadableCodeListPage} />
      <Route exact path="/login" component={LoadableLoginPage} />
      <Route exact path="/logout" component={LoadableLogoutPage} />
      <Route exact path="/signup" component={LoadableSignUpPage} />
      <Route component={LoadableError404Page} />
    </Switch>
  )
}

export default Routes;