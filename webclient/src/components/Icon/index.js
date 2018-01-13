import React from 'react';
import PropTypes from 'prop-types'

// Functional Component
const Icon = (props) => {
  return  <img src={props.img} alt={props.alt} title={props.alt}></img>
}

// Icon.propTypes = {
//   icon: PropTypes.string
// }

export default Icon;