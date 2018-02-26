import React from 'react';
import PropTypes from 'prop-types'
import Link from 'core/components/Link'
import './HeaderLayout.css'

import { connect } from "react-redux";
import { openSideNav } from 'core/ducks/sidenav';
import { toggleOptionsMenu } from 'core/ducks/optionsMenu';

import Button from 'react-md/lib/Buttons/Button';

class HeaderLayout extends React.Component {
  render() {
    return (
      <div className="header-layout">
        <div className="header">
          <Button icon className="header__menu"  onClick={this.props.handleMenuButtonClick}>menu</Button>
          <h1 className="header__titlecontainer">
            <Link to={"/"} className="header__titletext">
              {this.props.title}
            </Link>
          </h1>
          <Button icon  className="header__options" onClick={this.props.handleOptionsButtonClick}>more_vert</Button>
        </div>
        <div className="header-layout_main">
          {this.props.children}
        </div>
      </div>
    );
  }
}

HeaderLayout.propTypes = {
  title: PropTypes.string.isRequired,
  handleMenuButtonClick: PropTypes.func.isRequired,
  handleOptionsButtonClick: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  handleMenuButtonClick: openSideNav,
  handleOptionsButtonClick: toggleOptionsMenu
}

export default connect(null, mapDispatchToProps)(HeaderLayout)