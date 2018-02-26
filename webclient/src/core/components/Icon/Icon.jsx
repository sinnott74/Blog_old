import React from 'react';

// Functional Component
const Icon = (props) => {
  return  <img src={props.img} alt={props.alt} title={props.alt} className={props.className}></img>
}

export default Icon;