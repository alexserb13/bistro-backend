import React, { Component } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import "./App.css";
import axios from "axios";

import Admin from "./Components/Admin";
import Bistro from "./Components/Bistro";
import Dashboard from "./Components/Dashboard";

const PrivateRoute = ({
  checkAuth,
  isAllowed,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAllowed ? (
          <Component {...props} checkAuth={checkAuth} />
        ) : (
          <Redirect to={{ pathname: "/admin" }} />
        )
      }
    />
  );
};

class App extends Component {
  state = {
    isAllowed: true
  };
  componentDidMount() {
    this.handleInterceptor();
    this.checkAuth();
  }

  handleInterceptor = () => {
    axios.interceptors.response.use(
      function(response) {
        // Do something with response data
        return response;
      },
      function(error) {
        // Do something with response error
        return Promise.reject(error);
      }
    );
  };

  checkAuth = async () => {
    let token = localStorage.getItem("token");

    if (token) {
      return await axios({
        method: "GET",
        url: "/api",
        headers: { Authorization: `Bearer ${token}` }
      })
        .catch(err => {
          if (err.response.status === 401) {
            localStorage.removeItem("token");
            this.setState({
              isAllowed: false
            });

            return false;
          } else {
            this.setState({
              isAllowed: true
            });
            return true;
          }
        })
        .then(res => {
          if (res) {
            this.setState({
              isAllowed: true
            });

            return true;
          } else {
            this.setState({
              isAllowed: false
            });

            return false;
          }
        });
    } else {
      this.setState({
        isAllowed: false
      });

      return false;
    }
  };

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route path="/" render={props => <Bistro {...props} />} exact />
          <Route
            path="/admin"
            render={props => <Admin {...props} checkAuth={this.checkAuth} />}
            exact
          />
          <PrivateRoute
            path="/dashboard"
            component={Dashboard}
            isAllowed={this.state.isAllowed}
            checkAuth={this.checkAuth}
            exact
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
