import React from 'react';
import { Route } from 'react-router';
import Header from '../Header';
import SideNav from '../SideNav';
import OptionsMenu from '../OptionsMenu';
import Toast from '../Toast';
import Spinner from '../Spinner';
import Loadable from 'react-loadable';
import { showToast } from '../../actions/toast';
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

  constructor() {
    super();
    this._registerServiceWorker();
  }

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

  _registerServiceWorker() {
    if (!('serviceWorker' in navigator)) {
      // Service worker is not supported on this platform
      return;
    }

    navigator.serviceWorker.register('/service-worker.js', {
      scope: '/'
    }).then(function(registration) {
      console.log('Service worker is registered.');

      registration.onupdatefound = function(updateEvent) {
        console.log('A new Service Worker version has been found...');

        // If an update is found the spec says that there is a new Service
        // Worker installing, so we should wait for that to complete then
        // show a notification to the user.
        registration.installing.onstatechange = function(event) {
          if (this.state === 'installed') {
            var message = (registration.active ? 'App updated. Restart for the new version.' : 'App ready for offline use.');
            showToast(message);
          }
        };
      };
    })
    .catch(function(err) {
      console.log('Unable to register service worker.', err);
    });
  }
}