import React, { Fragment } from 'react';
import HeaderLayout from 'core/components/HeaderLayout';
import SideNavLayout from 'core/components/SideNavLayout';
import OptionsMenu from 'core/components/OptionsMenu';
import Toast from 'core/components/Toast';
import ServiceWorker from 'core/components/ServiceWorker';
import Routes from 'core/components/Routes';
import ScreenMediaQuery from 'core/components/ScreenMediaQuery';
import 'core/components/Card';
import './App.css'

export default  class App extends React.Component {

  render() {
    return (
      <Fragment>
        <SideNavLayout>
          <HeaderLayout title="Sinnott">
            <Routes />
            <OptionsMenu />
          </HeaderLayout>
        </SideNavLayout>
        <Toast />
        <ServiceWorker />
        <ScreenMediaQuery mediaQuery="(min-width: 1025px)"/>
      </Fragment>
    )
  }
}