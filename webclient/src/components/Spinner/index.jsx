import React from 'react';
import PropTypes from 'prop-types'
import './style.css'

const defaultSize = 32;

const Spinner = (props) => {

  let size = props.size || defaultSize;

  return (
    <div className="loader js-global-loader is-hidden">
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
      <circle className="spinner" cx={size/2} cy={size/2} r={size/2 - 2} fill="none"></circle>
    </svg>
    </div>
  )
}

Spinner.propTypes = {
  size: PropTypes.number
}

export default Spinner;