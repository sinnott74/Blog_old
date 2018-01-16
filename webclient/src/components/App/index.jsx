import React from 'react';
import HeaderLayout from '../HeaderLayout';
import SideNavLayout from '../SideNavLayout';
import OptionsMenu from '../OptionsMenu';
import Toast from '../Toast';
import ServiceWorker from '../ServiceWorker';
import Routes from '../Routes';
import './style.css'

class App extends React.Component {

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
      </div>
    )
  }
}

import { connect } from "react-redux";
import { withRouter } from 'react-router'
export default withRouter(connect(null, null)(App));