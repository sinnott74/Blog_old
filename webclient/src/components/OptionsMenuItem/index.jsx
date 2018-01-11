import React from 'react';
import PropTypes from 'prop-types'
import './style.css'

// Functional Component
const OptionsMenuItem = (props) => {
  return <div className="options-menu_item" tabIndex="0">{props.title}</div>
}

OptionsMenuItem.propTypes = {
  title: PropTypes.string.isRequired
}

export default OptionsMenuItem;