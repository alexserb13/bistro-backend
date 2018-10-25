import React, { Component } from "react";
import "./style.css";
import axios from "axios";

import MenuPanel from "./MenuPanel";

class Dashboard extends Component {
  state = {
    name: "",
    isError: false,
    menuList: []
  };

  componentDidMount() {
    this.props.checkAuth().then(isValid => {
      if (isValid) {
        this.getMenuList();
      }
    });
  }

  getMenuList = () => {
    axios({
      method: "GET",
      url: "/menu"
    }).then(res => {
      this.setState({
        menuList: res.data.menu
      });
    });
  };

  handleLogOut = () => {
    localStorage.removeItem("token");
    this.props.history.push("/admin");
  };

  handleInput = e => {
    let name = e.target.name;
    let value = e.target.value;

    this.setState({
      [name]: value
    });
  };

  handleAddMenu = () => {
    let { name } = this.state;
    if (name === "") {
      this.setState({
        isError: true
      });
    } else {
      let token = localStorage.getItem("token");
      axios({
        method: "POST",
        url: "/api",
        headers: { Authorization: `Bearer ${token}` },
        data: {
          name: name
        }
      })
        .catch(err => {
          throw err;
        })
        .then(res => {
          let { menuList } = this.state;
          menuList.push(res.data);
          this.setState({
            menuList: menuList
          });
        });
    }
  };

  handleMenuDelete = index => {
    let { menuList } = this.state;
    let token = localStorage.getItem("token");
    axios({
      method: "DELETE",
      url: "/api",
      headers: { Authorization: `Bearer ${token}` },
      data: {
        _id: index
      }
    })
      .catch(err => {
        throw err;
      })
      .then(res => {
        if (res.data.success === true) {
          let spliceIndex = menuList
            .map(menu => {
              return menu._id;
            })
            .indexOf(index);
          menuList.splice(spliceIndex, 1);
          this.setState({
            menuList: menuList
          });
        }
      });
  };

  render() {
    let { menuList } = this.state;
    let { isError } = this.state;
    let errorMessage = "";
    if (isError) {
      errorMessage = "Please enter your menu's name!";
    }
    return (
      <div className="dashboard">
        <div className="dashboard-header">
          <div className="dashboard-header-brand">
            <h1>Admin Panel</h1>
          </div>
          <div className="dashboard-header-button">
            <button className="header-button" onClick={this.handleLogOut}>
              Log-Out
            </button>
          </div>
        </div>
        <div className="dashboard-container">
          <div className="add-menu">
            <div className="add-input-container">
              <input
                className="add-menu-input"
                placeholder="Menu name"
                name="name"
                onChange={e => {
                  this.handleInput(e);
                }}
              />
              <button className="add-menu-button" onClick={this.handleAddMenu}>
                Add
              </button>
            </div>
            <div className="add-menu-message">{errorMessage}</div>
          </div>
          {menuList.map(menu => (
            <MenuPanel
              key={menu._id}
              menu={menu}
              handleMenuDelete={this.handleMenuDelete}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Dashboard;
