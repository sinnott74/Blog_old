import React from "react";
import SideNavLink from "core/components/SideNavLink";
import PersonalLinks from "core/components/PersonalLinks";
import { version } from "../../../../package.json";
import "./SideNavPanel.css";

export default class SideNavPanel extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="sidenavpanel__header">
          <h1 className="sidenavpanel__title">App shell</h1>
        </div>
        <div className="sidenavpanel__body">
          <div className="sidenavpanel__links">
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
          <div className="sidenavpanel__contentbottom">
            <PersonalLinks />
            <div className="sidenavpanel__version">Version {version}</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
