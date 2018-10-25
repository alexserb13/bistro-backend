import React, { Component } from "react";
import "./style.css";

class Navigation extends Component {
  state = {
    isOpen: false
  };
  handleOpenMenu = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  render() {
    let { isOpen } = this.state;
    let buttonClass = "";
    let menuClass = "";
    if (isOpen) {
      buttonClass = "close";
      menuClass = "open";
    }
    return (
      <div className={`navigation ${menuClass}`}>
        <div className="nav-header">
          <div
            className={`menu-btn ${buttonClass}`}
            onClick={() => {
              this.handleOpenMenu();
            }}>
            <div className="btn-line" />
            <div className="btn-line" />
            <div className="btn-line" />
          </div>
          <div className="nav-brand">
            <a href="#slider">Bistro</a>
          </div>
        </div>
        <div className="nav-menu">
          <ul className="nav-menu-list">
            <li>
              <a
                className="nav-link"
                href="#menu"
                onClick={() => {
                  this.handleOpenMenu();
                }}>
                Menu
              </a>
            </li>
            <li>
              <a
                className="nav-link"
                href="#about"
                onClick={() => {
                  this.handleOpenMenu();
                }}>
                About
              </a>
            </li>
            <li>
              <a
                className="nav-link"
                href="#contact"
                onClick={() => {
                  this.handleOpenMenu();
                }}>
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Navigation;
