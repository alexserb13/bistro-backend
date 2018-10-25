import React, { Component } from "react";
import "./style.css";

import slide1 from "../../../assets/slide1.jpg";
import slide2 from "../../../assets/slide2.jpg";
import slide3 from "../../../assets/slide3.jpg";
import slide4 from "../../../assets/slide4.jpg";
import slide5 from "../../../assets/slide5.jpg";

const Slide = ({ slide }) => {
  const style = {
    backgroundImage: "url(" + slide.image + ")",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
  };
  return (
    <div className="slide">
      <div className="slide-text">{slide.text}</div>
      <div className="slide-overlay" />
      <div className="slide-image" style={style} />
    </div>
  );
};

class Slider extends Component {
  state = {
    clearInterval: false,
    currentSlide: 0,
    prevSlide: 0,
    slides: [
      {
        image: slide1,
        text: `A taste of local ingredients
        & seasonal flavours
        `
      },
      {
        image: slide2,
        text: `A ‘small’ poutine
        or a ‘big’ salad?`
      },
      {
        image: slide3,
        text: `Step into Vallier
        and feel at home`
      },
      {
        image: slide4,
        text: `Where even beer and wine
        are from the neighbourhood`
      },
      {
        image: slide5,
        text: `Cure your weekend with
        our tasty brunch options`
      }
    ]
  };

  componentDidMount = () => {
    this.handleSlideChange();
    this.handleAutoChange();
  };

  handleControls = index => {
    if (this.state.currentSlide === index) {
      return false;
    }
    this.setState(
      {
        prevSlide: this.state.currentSlide,
        currentSlide: index,
        clearInterval: true
      },
      () => {
        this.handleSlideChange();
      }
    );
  };

  handleSlideChange = () => {
    let currentSlide = this.state.currentSlide;
    let slides = document.querySelectorAll(".slide");
    let dots = document.querySelectorAll(".dot");

    for (let i = 0; i < slides.length; i++) {
      slides[i].classList.remove("inactive");
      slides[i].classList.remove("animated");
      dots[i].classList.remove("active");
    }
    slides[this.state.prevSlide].classList.add("inactive");
    slides[currentSlide].classList.add("animated");
    dots[currentSlide].classList.add("active");
    setTimeout(() => {
      slides[this.state.prevSlide].classList.remove("inactive");
    }, 1000);
  };

  handleAutoChange = () => {
    let interval = setInterval(() => {
      this.setState(
        {
          prevSlide: this.state.currentSlide,
          currentSlide: this.state.currentSlide + 1
        },
        () => {
          if (this.state.clearInterval) {
            clearInterval(interval);
          } else if (this.state.currentSlide === this.state.slides.length) {
            this.setState(
              {
                prevSlide: this.state.currentSlide - 1,
                currentSlide: 0
              },
              () => {
                this.handleSlideChange();
              }
            );
          } else {
            this.handleSlideChange();
          }
        }
      );
    }, 8000);
  };

  render() {
    return (
      <div className="slider" id="slider">
        <div className="slider-controls">
          <div className="controls">
            {this.state.slides.map((slides, index) => (
              <div
                key={index}
                className="dot"
                onClick={() => {
                  this.handleControls(index);
                }}
              />
            ))}
          </div>
        </div>
        {this.state.slides.map((slide, index) => (
          <Slide key={index} slide={slide} />
        ))}
      </div>
    );
  }
}

export default Slider;
