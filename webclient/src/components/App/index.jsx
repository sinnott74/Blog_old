import React from 'react';
import { Route } from 'react-router';
import Header from '../Header';
import SideNav from '../SideNav';
import OptionsMenu from '../OptionsMenu';
import Toast from '../Toast';
import Spinner from '../Spinner';
import Loadable from 'react-loadable';
import './style.css'

// import IndexPage from '../../pages/IndexPage';
// import Url1Page from '../../pages/Url1Page';
// import Url2Page from '../../pages/Url2Page';

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


export default class App extends React.Component {
  render() {
    return (
      <div>
        <div className="main">
          <Route exact path="/" component={LoadableHomePage} />
          <Route exact path="/blog" component={LoadableBlogListPage} />
          <Route path="/blog/:id" component={LoadableBlogPostPage} />
          <Route exact path="/code" component={LoadableCodeListPage} />
          <Route exact path="/url2" component={LoadableUrl2Page} />
        </div>
        <Header title="Sinnott"></Header>
        <SideNav></SideNav>
        <OptionsMenu></OptionsMenu>
        <Toast></Toast>
        {/* <Spinner size={36}></Spinner> */}
      </div>
    )
  }
}