import React, { Component } from "react";
import "./style.css";

import image from "../../../assets/about.jpg";

class About extends Component {
  render() {
    const style = {
      backgroundImage: "url(" + image + ")",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center"
    };
    return (
      <div className="about" id="about">
        <div className="about-wrapper">
          <div className="about-image-container">
            <div className="about-image" style={style} />
          </div>
          <div className="about-text-container">
            <div className="about-text">
              Whether you’re in the mood for a ‘small’ poutine or a ‘big’ salad,
              ‘just one’ beer or a double shot espresso, when it satisfies your
              tastebuds, it’s all good.
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
