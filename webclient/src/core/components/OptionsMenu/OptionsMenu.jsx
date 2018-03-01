import React from "react";
import PropTypes from "prop-types";
import OptionsMenuItem from "core/components/OptionsMenuItem";
import "./OptionsMenu.css";

import { connect } from "react-redux";
import { closeOptionsMenu, isOpened } from "core/ducks/optionsMenu";
import { isLoggedIn } from "core/ducks/auth";

class OptionsMenu extends React.Component {
  render() {
    return (
      <div
        className="options-menu"
        ref={component => {
          this.component = component;
        }}
      >
        <div
          className="options-scrim js-options-scrim"
          onClick={this.props.handleScrimClick}
          ref={scrim => {
            this.scrim = scrim;
          }}
        />
        <aside
          className="options-view js-options-view"
          ref={view => {
            this.view = view;
          }}
        >
          {this._getLogOptionItem()}
          <OptionsMenuItem>Option 1</OptionsMenuItem>
          <OptionsMenuItem>Option 2</OptionsMenuItem>
          <OptionsMenuItem>Option 3</OptionsMenuItem>
          <OptionsMenuItem>Option 4</OptionsMenuItem>
        </aside>
      </div>
    );
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.opened) {
      this._open();
    } else {
      this._close();
    }
  }

  _getLogOptionItem() {
    if (!this.props.loggedIn) {
      return <OptionsMenuItem to="/login">Login</OptionsMenuItem>;
    } else {
      return <OptionsMenuItem to="/logout">Log Out</OptionsMenuItem>;
    }
  }

  _close() {
    document.body.classList.remove("noscroll");
    this.component.classList.remove("options-menu__opened");
    this.view.classList.remove("options-view__animate");
  }

  _open() {
    document.body.classList.add("noscroll");
    this.component.classList.add("options-menu__opened");
    requestAnimationFrame(() => {
      this.view.classList.add("options-view__animate");
    });
  }
}

OptionsMenu.propTypes = {
  opened: PropTypes.bool.isRequired,
  handleScrimClick: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  opened: isOpened(state),
  loggedIn: isLoggedIn(state)
});

const mapDispatchToProps = dispatch => ({
  handleScrimClick: () => {
    dispatch(closeOptionsMenu());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(OptionsMenu);