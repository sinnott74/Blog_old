import React from 'react';
import PropTypes from 'prop-types'
import Icon from '../Icon';
import Github from '../../../static/images/github.svg';
import Facebook from '../../../static/images/facebook.svg';
import Twitter from '../../../static/images/twitter.svg';
import LinkedIn from '../../../static/images/linkedin.svg';
import './style.css'

// Functional Component
const PersonalLinks = (props) => {
  return (
    <div className="personallinks">
      <a href="https://github.com/sinnott74">
        <Icon img={Github} />
      </a>
      <a href="https://facebook.com/sinnott74">
        <Icon img={Facebook} />
      </a>
      <a href="https://twitter.com/sinnott74">
        <Icon img={Twitter} />
      </a>
      <a href="https://ie.linkedin.com/in/daniel-sinnott-1587124b">
        <Icon img={LinkedIn} />
      </a>
    </div>
  )
}

// Icon.propTypes = {
//   icon: PropTypes.string
// }

export default PersonalLinks;