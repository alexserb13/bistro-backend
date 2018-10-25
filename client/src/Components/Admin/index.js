import React, { Component } from "react";
import "./style.css";
import axios from "axios";

class Admin extends Component {
  state = {
    username: "",
    password: "",
    isError: false
  };
  componentDidMount() {
    this.props.checkAuth();
  }

  handleKeyPress = e => {
    if (e.key === "Enter") {
      this.handleSubmit();
    }
  };

  handleInput = e => {
    let name = e.target.name;
    let value = e.target.value;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = () => {
    const { username } = this.state;
    const { password } = this.state;

    if (username === "" || password === "") {
      this.setState({
        isError: true
      });
    } else {
      axios({
        method: "POST",
        url: "/admin",
        data: {
          username: username,
          password: password
        }
      })
        .then(res => {
          if (res.data.success === true) {
            localStorage.setItem("token", res.data.token);
            return res;
          }
        })
        .then(() => {
          this.props.checkAuth().then(isValid => {
            if (isValid) {
              this.props.history.push("/dashboard");
            }
          });
        });
    }
  };

  render() {
    const { isError } = this.state;
    let message = "";
    if (isError) {
      message = "Please enter a valid username and password !";
    }
    return (
      <div className="admin">
        <div
          className="admin-form"
          onKeyPress={e => {
            this.handleKeyPress(e);
          }}>
          <h1 className="form-header">Bistro</h1>
          <input
            autoComplete="off"
            className="form-input"
            type="text"
            name="username"
            placeholder="Username"
            onChange={e => {
              this.handleInput(e);
            }}
          />
          <input
            autoComplete="off"
            className="form-input"
            type="password"
            name="password"
            placeholder="Password"
            onChange={e => {
              this.handleInput(e);
            }}
          />
          <div className="login-message">{message}</div>
          <button className="form-button" onClick={this.handleSubmit}>
            Log-In
          </button>
        </div>
      </div>
    );
  }
}

export default Admin;
