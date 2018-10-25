import React, { Component } from "react";
import "./style.css";
import axios from "axios";

import Navigation from "./Navigation";
import Slider from "./Slider";
import Menu from "./Menu";
import About from "./About";
import Contact from "./Contact";

class Bistro extends Component {
  state = {
    menuList: []
  };

  componentDidMount() {
    this.handleGetMenu();
  }

  handleGetMenu = () => {
    axios({
      method: "GET",
      url: "/menu"
    })
      .catch(err => {
        throw err;
      })
      .then(res => {
        this.setState({
          menuList: res.data.menu
        });
      });
  };

  render() {
    return (
      <div className="bistro">
        <Navigation />
        <Slider />
        <Menu menu={this.state.menuList} />
        <About />
        <Contact />
      </div>
    );
  }
}

export default Bistro;
