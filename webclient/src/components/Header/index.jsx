import React from 'react';
import PropTypes from 'prop-types'
import Link from '../Link'
import './style.css'

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <button className="header__menu" onClick={this.props.handleMenuButtonClick}>Toggle nav menu</button>
        <h1 className="header__titlecontainer">
          <Link to={"/"} className="header__titletext">
            {this.props.title}
          </Link>
        </h1>
        <button className="header__options" onClick={this.props.handleOptionsButtonClick}>Toggle options menu</button>
      </div>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  handleMenuButtonClick: PropTypes.func.isRequired,
  handleOptionsButtonClick: PropTypes.func.isRequired
}


import { connect } from "react-redux";

import { openSideNav } from '../../actions/sidenav';
import { toggleOptionsMenu } from '../../actions/optionsMenu';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  handleMenuButtonClick: openSideNav,
  handleOptionsButtonClick: toggleOptionsMenu
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)