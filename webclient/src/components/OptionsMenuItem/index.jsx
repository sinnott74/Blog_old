import React from 'react';
import './style.css'
import { connect } from "react-redux";
import { closeOptionsMenu } from '../../actions/optionsMenu';
import Link from '../Link';

// Functional Component
const OptionsMenuItem = (props) => {
  return <Link to={props.to} className="options-menu_item" tabIndex="0" onClick={props.handleItemClick}>{props.children}</Link>
}

const mapDispatchToProps = {
  handleItemClick: closeOptionsMenu
}

export default connect(null, mapDispatchToProps)(OptionsMenuItem)