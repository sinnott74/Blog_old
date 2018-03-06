import React from "react";
import PropTypes from "prop-types";
import Chip from "react-md/lib/Chips/Chip";

export default class TagChip extends React.PureComponent {
  render() {
    return (
      <Chip removable label={this.props.tag} onClick={this.handleRemove} />
    );
  }

  handleRemove = () => {
    this.props.onClick(this.props.tag);
  };
}

TagChip.PropTypes = {
  tag: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};
