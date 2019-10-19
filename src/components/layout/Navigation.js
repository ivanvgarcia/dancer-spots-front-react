import React, { Component } from "react";
import SideMenu from "./SideMenu";
import Backdrop from "./Backdrop";
import Navbar from "./Navbar";

class Navigation extends Component {
  state = {
    sideMenuOpen: false
  };

  sideMenuToggleClickHandler = () => {
    this.setState(prevState => {
      return { sideMenuOpen: !prevState.sideMenuOpen };
    });
  };

  backdropClickHandler = () => {
    this.setState({ sideMenuOpen: false });
  };

  render() {
    let backdrop;

    if (this.state.sideMenuOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }
    return (
      <React.Fragment>
        <Navbar sideMenuClickHandler={this.sideMenuToggleClickHandler} />
        <SideMenu
          show={this.state.sideMenuOpen}
          sideMenuClickHandler={this.sideMenuToggleClickHandler}
        />
        {backdrop}
      </React.Fragment>
    );
  }
}

export default Navigation;
