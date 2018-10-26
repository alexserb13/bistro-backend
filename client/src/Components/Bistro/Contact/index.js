import React, { Component } from "react";
import "./style.css";

class Contact extends Component {
  componentDidMount() {
    //window.onload = () => {
    this.getMap();
    //};
  }

  getMap = () => {
    let ymaps = window.ymaps;
    ymaps.ready(() => {
      let myMap = new ymaps.Map("map", {
        center: [46.780036, 23.624268],
        zoom: 14
      });

      myMap.geoObjects.add(
        new ymaps.Placemark(
          [46.780036, 23.624268],
          {
            balloonContent: "<strong>Bistro</strong> feel at home !",
            iconCaption: "Bistro !"
          },
          {
            preset: "islands#greenDotIconWithCaption"
          }
        )
      );
    });
    //console.log(ymaps);
  };

  render() {
    return (
      <div className="contact" id="contact">
        <div className="contact-wrapper">
          <div className="contact-details">
            <div className="find-us">
              <div className="find-us-header">FIND US</div>
              <div className="find-us-text">
                Strada Aurel Vlaicu, nr.44, Cluj-Napoca
              </div>
            </div>
            <div className="contact-line" />
            <div className="opening-hours">
              <div className="opening-hours-header">OPENING HOURS</div>
              <div className="opening-hours-body">
                <ul className="days-list">
                  <li>Monday</li>
                  <li>Tuesday</li>
                  <li>Wednesday</li>
                  <li>Thursday</li>
                  <li>Friday</li>
                  <li>Saturday</li>
                  <li>Sunday</li>
                </ul>
                <ul className="hours-list">
                  <li>11:30 am - 10:00 pm</li>
                  <li>11:30 am - 10:00 pm</li>
                  <li>11:30 am - 10:00 pm</li>
                  <li>11:30 am - 10:00 pm</li>
                  <li>11:30 am - 10:00 pm</li>
                  <li>11:30 am - 10:00 pm</li>
                  <li>11:30 am - 10:00 pm</li>
                </ul>
              </div>
            </div>
            <div className="contact-line" />
            <div className="reservations">
              <div className="reservation-header">RESERVATIONS</div>
              <div className="reservation-text">
                514.842.2905 or Book a table For more information
                info@vallierbistro.com
              </div>
            </div>
          </div>
          <div id="map" />
        </div>
      </div>
    );
  }
}

export default Contact;
