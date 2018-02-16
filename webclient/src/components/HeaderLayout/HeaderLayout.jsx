import React from 'react';
import PropTypes from 'prop-types'
import Link from '../Link'
import './HeaderLayout.css'

import { connect } from "react-redux";
import { openSideNav } from '../../redux/modules/ui/sidenav';
import { toggleOptionsMenu } from '../../redux/modules/ui/optionsMenu';

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




const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  handleMenuButtonClick: openSideNav,
  handleOptionsButtonClick: toggleOptionsMenu
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderLayout)