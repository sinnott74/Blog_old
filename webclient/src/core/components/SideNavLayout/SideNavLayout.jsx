import React from "react";
import SideNavLink from "core/components/SideNavLink";
import PersonalLinks from "core/components/PersonalLinks";
import { version } from "../../../../package.json";
import "./SideNavLayout.css";

import { connect } from "react-redux";
import { openSideNav, closeSideNav, isOpened } from "core/ducks/sidenav";

class SideNavLayout extends React.Component {
  render() {
    return (
      <div className="side-nav-layout">
        <div className="side-nav-layout_main">{this.props.children}</div>
        <div
          className="side-nav"
          ref={sidenav => {
            this.sidenav = sidenav;
          }}
        >
          <div
            className="side-nav__scrim"
            onClick={this._handleScrimTap}
            ref={scrim => {
              this.scrim = scrim;
            }}
          />
          <div
            className="side-nav__content side_nav--animatable"
            onTouchStart={this._handleSideNavTouchStart}
            onTouchMove={this._handleSideNavTouchMove}
            onTouchEnd={this._handleSideNavTouchEnd}
            ref={sideNavContent => {
              this.sideNavContent = sideNavContent;
            }}
          >
            <div className="side-nav__header">
              <h1 className="side-nav__title">App shell</h1>
            </div>
            <div
              className="side-nav__body"
              ref={body => {
                this.body = body;
              }}
            >
              <div className="side-nav__links">
                <SideNavLink to="/" icon="home">
                  Home
                </SideNavLink>
                <SideNavLink to="/blog" icon="create">
                  Blog
                </SideNavLink>
                <SideNavLink to="/code" icon="code">
                  Code
                </SideNavLink>
              </div>
              <div className="side-nav__contentbottom">
                <PersonalLinks />
                <div className="side-nav__version">Version {version}</div>
              </div>
            </div>
          </div>
          <div
            className="side-nav__edgearea"
            onTouchStart={this._handleEdgeTouchStart}
            onTouchMove={this._handleSideNavTouchMove}
            onTouchEnd={this._handleSideNavTouchEnd}
            ref={edge => {
              this.edge = edge;
            }}
          />
        </div>
      </div>
    );
  }

  constructor(props) {
    super(props);

    this.TOUCH_SLOP = 15 * window.devicePixelRatio;

    this._close = this._close.bind(this);
    this._open = this._open.bind(this);
    this._updateUI = this._updateUI.bind(this);
    this._updateUIOnEdgeTouch = this._updateUIOnEdgeTouch.bind(this);
    this._handleSideNavTouchStart = this._handleSideNavTouchStart.bind(this);
    this._handleSideNavTouchMove = this._handleSideNavTouchMove.bind(this);
    this._handleSideNavTouchEnd = this._handleSideNavTouchEnd.bind(this);
    this._handleEdgeTouchStart = this._handleEdgeTouchStart.bind(this);
    this._handleScrimTap = this._handleScrimTap.bind(this);
  }

  componentWillUpdate(nextProps) {
    if (nextProps.opened) {
      this._open();
    } else {
      this._close();
    }
  }

  _handleSideNavTouchStart(e) {
    this.sideNavContent.classList.remove("side_nav--animatable");
    this.scrim.classList.remove("side-nav__scrim--animatable");
    this.sideNavContentWidth = this.sideNavContent.offsetWidth;
    this.touching = true;
    this.sideNavTransform = 0;
    this.touchStartX = e.touches[0].pageX;
    this.touchStartY = e.touches[0].pageY;
    this.translateX = 0;
    this.translateY = 0;
    this.direction = "";
    this.do = this._close;
    this.undo = this._open;
  }

  _handleEdgeTouchStart(e) {
    this._handleSideNavTouchStart(e);
    this.sideNavContent.style.transform = "translate3d(-95%, 0 , 0)";
    this.touchingEdge = true;
    this.do = this._open;
    this.undo = this._close;
  }

  _handleSideNavTouchMove(e) {
    this.translateX = Math.abs(e.touches[0].pageX - this.touchStartX);
    this.translateY = e.touches[0].pageY - this.touchStartY;

    if (!this.direction) {
      if (Math.abs(this.translateX) >= Math.abs(this.translateY)) {
        this.direction = "horizontal";
      } else {
        this.direction = "vertical";
      }
    }

    if (this.direction === "horizontal") {
      if (this.touchingEdge) {
        requestAnimationFrame(this._updateUIOnEdgeTouch);
      } else {
        requestAnimationFrame(this._updateUI);
      }
    }
  }

  _updateUI() {
    if (this.touching) {
      this.sideNavTransform = clamp(
        this.translateX,
        0,
        this.sideNavContentWidth
      );
      // this.sideNavTransform = -this.sideNavTransform;
      this.sideNavContent.style.transform =
        "translate3d(" + -this.sideNavTransform + "px, 0, 0)";

      let opacityPercentage =
        0.85 + this.translateX / this.sideNavContentWidth * 0.85;
      opacityPercentage = clamp(opacityPercentage, 0, 0.85);
      this.scrim.style.opacity = opacityPercentage;
      requestAnimationFrame(this._updateUI);
    }
  }

  _updateUIOnEdgeTouch() {
    if (this.touching) {
      this.sideNavTransform = clamp(
        this.translateX,
        0,
        this.sideNavContentWidth
      );
      this.sideNavContent.style.transform =
        "translate3d(" +
        (-this.sideNavContentWidth + this.sideNavTransform) +
        "px, 0, 0)";

      let opacityPercentage = this.translateX / this.sideNavContentWidth * 0.85;
      opacityPercentage = clamp(opacityPercentage, 0, 0.85);
      this.scrim.style.opacity = opacityPercentage;
      requestAnimationFrame(this._updateUIOnEdgeTouch);
    }
  }

  _handleSideNavTouchEnd(e) {
    this.sideNavContent.classList.add("side_nav--animatable");
    this.scrim.classList.add("side-nav__scrim--animatable");
    this.touching = false;
    this.direction = "";
    this.touchingEdge = false;

    if (this.sideNavTransform >= this.TOUCH_SLOP) {
      this.do();
    } else {
      this.undo();
    }
  }

  _handleScrimTap(e) {
    this.props.closeSideNav();
  }

  _handleLinkTap(e) {
    this.props.closeSideNav();
  }

  _close() {
    this.sideNavContent.classList.add("side_nav--animatable");
    this.sidenav.classList.remove("side_nav--opened");
    this.sideNavContent.style.transform = "";
    this.scrim.style.opacity = "";
    document.body.classList.remove("noscroll");
    this.isOpened = false;

    setTimeout(() => {
      if (!this.isOpened && this.props.opened) {
        this.props.closeSideNav();
      }
    }, 130);
  }

  _open() {
    this.sideNavContent.classList.add("side_nav--animatable");
    this.sidenav.classList.add("side_nav--opened");
    this.sideNavContent.style.transform = "";
    this.scrim.style.opacity = "";
    document.body.classList.add("noscroll");
    this.isOpened = true;

    setTimeout(() => {
      if (this.isOpened && !this.props.opened) {
        this.props.openSideNav();
      }
    }, 130);
  }
}

const mapStateToProps = state => ({
  opened: isOpened(state)
});

const mapDispatchToProps = {
  openSideNav,
  closeSideNav
};

/**
 * Clamps a value to between the Min & Max range
 * @param {Number} value
 * @param {Number} min
 * @param {Number} max
 */
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export default connect(mapStateToProps, mapDispatchToProps)(SideNavLayout);
