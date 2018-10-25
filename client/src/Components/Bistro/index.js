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
    window.onload = () => {
      let html = document.querySelector("html");
      let mask = document.querySelector(".loading-mask");
      mask.classList.add("loaded");
      setTimeout(() => {
        mask.style.display = "none";
      }, 2000);
      html.style.overflowY = "scroll";
    };
    window.addEventListener("scroll", this.handleScroll);
    this.handleGetMenu();
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    let scroll = window.scrollY;
    let height = window.innerHeight;
    let slides = document.querySelectorAll(".slide-image");
    let aboutImage = document.querySelector(".about-image");
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.transform = `translateY(${scroll / 2}px)`;
    }
    let menuHeight = document.getElementById("menu").clientHeight;

    if (scroll > menuHeight && scroll < 2 * height + menuHeight) {
      let value = scroll - menuHeight - height;
      aboutImage.style.transform = `translateY(${value / 6}px)`;
    }
  };

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
        <div className="loading-mask">
          <div className="lds-dual-ring" />
        </div>
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
