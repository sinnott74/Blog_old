import React from 'react';
import PropTypes from 'prop-types'
import PersonalLink from './PersonalLink.jsx';
import Github from '../../images/github.svg';
import Facebook from '../../images/facebook.svg';
import Twitter from '../../images/twitter.svg';
import LinkedIn from '../../images/linkedin.svg';
import './style.css'

// Functional Component
const PersonalLinks = (props) => {
  return (
    <div className="personallinks">
      <PersonalLink url="https://ie.linkedin.com/in/daniel-sinnott-1587124b" icon={Github} alt="Github" />
      <PersonalLink url="https://facebook.com/sinnott74" icon={Facebook} alt="Facebook" />
      <PersonalLink url="https://twitter.com/sinnott74" icon={Twitter} alt="Twitter" />
      <PersonalLink url="https://ie.linkedin.com/in/daniel-sinnott-1587124b" icon={LinkedIn} alt="LinkedIn" />
    </div>
  )
}

// Icon.propTypes = {
//   icon: PropTypes.string
// }

export default PersonalLinks;