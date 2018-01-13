import React from 'react';
import SideNavLink from '../SideNavLink';
import Icon from '../Icon';
import Link from '../Link';
import './style.css'
import Github from '../../../static/images/github.svg';
import Facebook from '../../../static/images/facebook.svg';
import Twitter from '../../../static/images/twitter.svg';
import LinkedIn from '../../../static/images/linkedin.svg';

class SideNav extends React.Component {

  render() {
    return (
      <div className="side-nav"
        ref={(sidenav) => {this.sidenav = sidenav;}}>
        <div className="side-nav__scrim"
          onClick={this._handleScrimTap}
          ref={(scrim) => {this.scrim = scrim;}}>
        </div>
        <div className="side-nav__content"
          onTouchStart={this._handleSideNavTouchStart}
          onTouchMove={this._handleSideNavTouchMove}
          onTouchEnd={this._handleSideNavTouchEnd}
          ref={(sideNavContent) => {this.sideNavContent = sideNavContent;}}>
          <div className="side-nav__header">
            <h1 className="side-nav__title">App shell</h1>
          </div>
          <div className="side-nav__body"
          ref={(body) => {this.body = body;}}>
            <div className="side-nav__links">
              <SideNavLink to="/">Home</SideNavLink>
              <SideNavLink to="/blog">Blog</SideNavLink>
              <SideNavLink to="/code">Code</SideNavLink>
            </div>
            <div className="side-nav__contentbottom">
              <div className="side-nav__personallinks">
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
              <div className="side-nav__version">Version @VERSION@</div>
            </div>
          </div>
        </div>
        <div className="side-nav__edgearea"
          onTouchStart={this._handleEdgeTouchStart}
          onTouchMove={this._handleEdgeTouchMove}
          onTouchEnd={this._handleEdgeTouchEnd}
          ref={(edge) => {this.edge = edge;}}>
        </div>
      </div>
    );
  }

  constructor(props) {
    super(props);

    this.touching = false;

    // Touch slop is a variable that is defined to suggest anything larger
    // than this value was an intended gesture by the user.
    // 8  is a value from Android platform.
    // 3 was added as a factor made up from what felt right.
    this.TOUCH_SLOP = 8 * window.devicePixelRatio * 3;;

    this._close = this._close.bind(this);
    this._open = this._open.bind(this);
    this._updateUI = this._updateUI.bind(this);
    this._updateUIOnEdgeTouch = this._updateUIOnEdgeTouch.bind(this);
    this._handleSideNavTouchStart = this._handleSideNavTouchStart.bind(this);
    this._handleSideNavTouchMove = this._handleSideNavTouchMove.bind(this);
    this._handleSideNavTouchEnd = this._handleSideNavTouchEnd.bind(this);
    this._handleEdgeTouchStart = this._handleEdgeTouchStart.bind(this);
    this._handleEdgeTouchMove = this._handleEdgeTouchMove.bind(this);
    this._handleEdgeTouchEnd = this._handleEdgeTouchEnd.bind(this);
    this._handleScrimTap = this._handleScrimTap.bind(this);
  }

  componentDidMount() {
    this.sideNavContent.addEventListener('transitionend', this.onTransitionEnd, false);
  }

  componentWillUnmount() {
    this.sideNavContent.removeEventListener('transitionend', this.onTransitionEnd);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.opened){
      this._open();
    } else {
      this._close();
    }
  }

  _handleSideNavTouchStart(e) {
    this.sideNavContentWidth = this.sideNavContent.offsetWidth;
    this.touching = true;
    this.sideNavTransform = 0;
    this.touchStartX = e.touches[0].pageX;
    this.touchStartY = e.touches[0].pageY;
    this.translateX = 0;
    this.translateY = 0;
    this.direction = "";
  }

  _handleSideNavTouchMove(e) {
    var newTouchX = e.touches[0].pageX;
    var newTouchY = e.touches[0].pageY;

    this.translateX = newTouchX - this.touchStartX;
    this.translateY = newTouchY - this.touchStartY;

    if(!this.direction){
      if(Math.abs(this.translateX) >= Math.abs(this.translateY)){
        this.direction = "horizontal";
      } else {
        this.direction = "vertical";
      }
    }

    if(this.direction == "horizontal"){
      e.preventDefault();
      requestAnimationFrame(this._updateUI);
    }
  }

  _updateUI() {
    if(this.touching){
      this.sideNavTransform = Math.min(0, this.translateX);
      this.sideNavContent.style.transform =
         'translate3d(' + this.sideNavTransform + 'px, 0, 0)';

      let opacityPercentage = Math.abs((0.85 + (this.translateX/this.sideNavContentWidth) * 0.85));
      opacityPercentage = Math.min(0.85, opacityPercentage);
      this.scrim.style.display = 'block';
      this.scrim.style.opacity = opacityPercentage;
      requestAnimationFrame(this._updateUI);
    }
  }

  _handleSideNavTouchEnd(e) {
    this.touching = false;
    this.direction = "";

    if (this.sideNavTransform < -this.TOUCH_SLOP) {
      this.props.closeSideNav();
    } else {
      this.props.openSideNav();
    }
  }

  _handleEdgeTouchStart(e) {
    this.sideNavContentWidth = this.sideNavContent.offsetWidth;
    this.edgeTransform = 0;
    this.direction = "";
    this.translateX = 0;
    this.translateY = 0;
    this.touching = true;
    this.edgeTouchStartX = e.touches[0].pageX;
    this.edgeTouchStartY = e.touches[0].pageY;
    this.sideNavContent.style.transform = 'translate3d(-95%, 0 , 0)';
  }

  _handleEdgeTouchMove(e) {
    let newEdgeTouchX = e.touches[0].pageX;
    let newEdgeTouchY = e.touches[0].pageY;

    this.translateX = newEdgeTouchX - this.edgeTouchStartX;
    this.translateY = newEdgeTouchY - this.edgeTouchStartY;

    if(!this.direction){
      if(Math.abs(this.translateX) >= Math.abs(this.translateY)){
        this.direction = "horizontal";
      } else {
        this.direction = "vertical";
      }
    }

    if(this.direction === "horizontal"){
      e.preventDefault();
      requestAnimationFrame(this._updateUIOnEdgeTouch);
    }
  }

  _updateUIOnEdgeTouch() {
    if(this.touching) {
      this.edgeTransform = Math.min(this.sideNavContentWidth, this.translateX);
      this.sideNavContent.style.transform =
      'translate3d(' + (-this.sideNavContentWidth + this.edgeTransform) + 'px, 0, 0)';

      let opacityPercentage = Math.abs((this.translateX/this.sideNavContentWidth) * 0.85);
      opacityPercentage = Math.min(0.85, opacityPercentage);
      this.scrim.style.display = 'block';
      this.scrim.style.opacity = opacityPercentage;
      requestAnimationFrame(this._updateUIOnEdgeTouch);
    }
  }

  _handleEdgeTouchEnd(e) {
    this.direction = "";
    this.touching = false;

    if (this.edgeTransform >= this.TOUCH_SLOP) {
      this.props.openSideNav();
    } else {
      this.props.closeSideNav();
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
    this.sideNavContent.style.transform = '';
    this.scrim.style.opacity = '';
    this.scrim.style.display = '';
    document.body.classList.remove('noscroll');
    setTimeout(() => {
      this.sideNavContent.classList.remove("side_nav--animatable");
    }, 500);
  }

  _open() {
    this.sideNavContent.classList.add("side_nav--animatable");
    this.sidenav.classList.add("side_nav--opened");
    this.sideNavContent.style.transform = '';
    this.scrim.style.opacity = '';
    this.scrim.style.display = '';
    document.body.classList.add('noscroll');
    setTimeout(() => {
      this.sideNavContent.classList.remove("side_nav--animatable");
    }, 500);
  }

  onTransitionEnd() {
    this.classList.remove("side_nav--animatable");
  }
}



import { connect } from "react-redux";
import { openSideNav, closeSideNav } from '../../actions/sidenav';

const mapStateToProps = (state) =>({
  opened: state.ui.sidenav.opened
})

const mapDispatchToProps = {
  openSideNav,
  closeSideNav
}

export default connect(mapStateToProps, mapDispatchToProps, null, {pure:false})(SideNav)
