import React, { Component } from "react";
import "./style.css";

class Navigation extends Component {
  render() {
    return (
      <div className="navigation">
        <div className="nav-header">
          <div className="nav-brand">
            <a href="#slider">Bistro</a>
          </div>
        </div>
        <div className="nav-menu">
          <ul className="nav-menu-list">
            <li>
              <a className="nav-link" href="#menu">
                Menu
              </a>
            </li>
            <li>
              <a className="nav-link" href="#about">
                About
              </a>
            </li>
            <li>
              <a className="nav-link" href="#contact">
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
