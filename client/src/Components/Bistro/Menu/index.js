import React, { Component } from "react";
import "./style.css";

class Menu extends Component {
  render() {
    let menus = this.props.menu;
    return (
      <div className="menu" id="menu">
        <div className="menu-wrapper">
          {menus.map((menu, index) => (
            <div key={index} className="full-menu">
              <div className="full-menu-header">
                {menu.name}
                <div className="line" />
              </div>

              <div className="full-menu-body">
                {menu.items.map((item, index) => (
                  <div key={index} className="full-menu-item">
                    <div className="menu-item-header">
                      <div className="menu-item-name">{item.name}</div>
                      <div className="menu-item-price">{item.price}</div>
                    </div>
                    <div className="menu-item-description">
                      {item.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Menu;
