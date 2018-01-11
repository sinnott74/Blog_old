import React from 'react';
import PropTypes from 'prop-types'
import './style.css'

// Functional Component
const Card = (props) => {
  return <div className="card">{props.children}</div>
}

Card.propTypes = {
  children: PropTypes.node
}

export default Card;