import React from 'react';

import { connect } from "react-redux";
import { largeScreen } from '../../actions/screen';

class ScreenMediaQuery extends React.Component {

  componentWillMount() {
    if(!window.matchMedia) return;
    this.mediaQueryList = window.matchMedia(this.props.mediaQuery);
    this.mediaQueryList.addListener(this._onMatch);
    this._onMatch(this.mediaQueryList);
  }

  componentWillUnmount() {
    this.mediaQueryList && this.mediaQueryList.removeListener(this._onMatch);
  }

  render() {
    return null;
  }

  _onMatch(mediaQueryList) {
    if(mediaQueryList.matches) {
      this.props.onMatch();
    }
  }
}


const mapDispatchToProps = {
  onMatch: largeScreen
}

export default connect(null, mapDispatchToProps)(ScreenMediaQuery);