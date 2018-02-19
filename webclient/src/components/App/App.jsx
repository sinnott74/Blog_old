import React from 'react';
import HeaderLayout from '../HeaderLayout';
import SideNavLayout from '../SideNavLayout';
import OptionsMenu from '../OptionsMenu';
import Toast from '../Toast';
import ServiceWorker from '../ServiceWorker';
import Routes from '../../Routes';
import ScreenMediaQuery from '../ScreenMediaQuery';
import '../Card';
import './App.css'

export default  class App extends React.Component {

  render() {
    return (
      <div>
        <SideNavLayout>
          <HeaderLayout title="Sinnott">
            <Routes />
            <OptionsMenu />
          </HeaderLayout>
        </SideNavLayout>
        <Toast />
        <ServiceWorker />
        <ScreenMediaQuery mediaQuery="(min-width: 1025px)"/>
      </div>
    )
  }
}