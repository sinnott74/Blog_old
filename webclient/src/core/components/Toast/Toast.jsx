import React from "react";
import PropTypes from "prop-types";
import "./Toast.css";

import { connect } from "react-redux";
import { hideToast, isShowing, getMessage } from "core/ducks/toast";

class Toast extends React.Component {
  render() {
    return (
      <div
        className={"toast " + (this.props.showing ? "toast__opened" : "")}
        ref={component => {
          this.component = component;
        }}
      >
        <button
          className="btn-close js-toast-view__btn-close"
          onClick={this.props.handleCloseButtonClick}
          aria-label="Close Toast"
        >
          &#10006;
        </button>
        <div className="message js-toast-view__message">
          {this.props.message}
        </div>
      </div>
    );
  }
}

Toast.propTypes = {
  showing: PropTypes.bool,
  message: PropTypes.string.isRequired,
  handleCloseButtonClick: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  showing: isShowing(state),
  message: getMessage(state)
});

const mapDispatchToProps = {
  handleCloseButtonClick: hideToast
};

export default connect(mapStateToProps, mapDispatchToProps)(Toast);
