import React, { Component } from "react";
import "./style.css";
import axios from "axios";

class MenuPanel extends Component {
  state = {
    name: "",
    price: "",
    description: "",
    isError: false
  };

  handleItemDelete = (itemId, menuId) => {
    let token = localStorage.getItem("token");
    axios({
      method: "DELETE",
      url: "/api/item",
      headers: { Authorization: `Bearer ${token}` },
      data: {
        itemId: itemId,
        menuId: menuId
      }
    })
      .catch(err => {
        throw err;
      })
      .then(res => {
        this.props.menu.items = res.data.items;
        this.setState({
          isError: false
        });
      });

    console.log(itemId, menuId);
  };

  handleAddItem = menuIndex => {
    let { name } = this.state;
    let { price } = this.state;
    let { description } = this.state;

    if (name === "" || price === "") {
      this.setState({
        isError: true
      });
    } else {
      let token = localStorage.getItem("token");
      axios({
        method: "POST",
        url: "/api/item",
        headers: { Authorization: `Bearer ${token}` },
        data: {
          _id: menuIndex,
          name: name,
          price: price,
          description: description
        }
      })
        .catch(err => {
          throw err;
        })
        .then(res => {
          this.props.menu.items = res.data.items;
          this.setState({
            isError: false
          });
        });
    }
  };

  handleInput = e => {
    let name = e.target.name;
    let value = e.target.value;

    this.setState({
      [name]: value
    });
  };

  render() {
    let menu = this.props.menu;
    return (
      <div className="menu-panel">
        <div className="menu-panel-header">
          <div className="menu-panel-name">
            <h1>{menu.name}</h1>
          </div>
          <div className="menu-panel-button">
            <button
              className="panel-button"
              onClick={() => {
                this.props.handleMenuDelete(menu._id);
              }}>
              Delete
            </button>
          </div>
        </div>
        <div className="menu-panel-content">
          {menu.items.map(item => (
            <MenuItem
              key={item._id}
              item={item}
              menuId={menu._id}
              handleItemDelete={this.handleItemDelete}
            />
          ))}
          <div className="add-menu-item">
            <input
              className="add-item-name"
              placeholder="Name"
              name="name"
              onChange={e => {
                this.handleInput(e);
              }}
            />
            <input
              className="add-item-price"
              placeholder="Price"
              name="price"
              onChange={e => {
                this.handleInput(e);
              }}
            />
            <input
              className="add-item-description"
              placeholder="Description"
              name="description"
              onChange={e => {
                this.handleInput(e);
              }}
            />
            <button
              className="add-item-button"
              onClick={() => {
                this.handleAddItem(menu._id);
              }}>
              Add
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const MenuItem = ({ item, menuId, handleItemDelete }) => {
  return (
    <div className="menu-panel-item">
      <div className="panel-item-name">{item.name}</div>
      <div className="panel-item-price">{item.price}</div>
      <div className="panel-item-description">{item.description}</div>
      <button
        className="panel-item-button"
        onClick={() => {
          handleItemDelete(item._id, menuId);
        }}>
        Delete
      </button>
    </div>
  );
};

export default MenuPanel;
