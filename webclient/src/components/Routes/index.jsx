import React from 'react';
import { Route } from 'react-router';
import Loadable from 'react-loadable';
import Spinner from '../Spinner';
import PropTypes from 'prop-types'

const LoadableHomePage = Loadable({
  loader: () => import(/* webpackChunkName: "indexPage" */ '../../pages/HomePage'),
  loading: Spinner
})

const LoadableUrl2Page = Loadable({
  loader: () => import(/* webpackChunkName: "Url2Page" */ '../../pages/Url2Page'),
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

const Routes = (props) => {
  return (
    <div className="main">
      <Route exact path="/" component={LoadableHomePage} />
      <Route exact path="/blog" component={LoadableBlogListPage} />
      <Route path="/blog/:id" component={LoadableBlogPostPage} />
      <Route exact path="/code" component={LoadableCodeListPage} />
      <Route exact path="/url2" component={LoadableUrl2Page} />
    </div>
  )
}

export default Routes;