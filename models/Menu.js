const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Menu = new Schema({
  name: String,
  items: [{ name: String, price: String, description: String }]
});

module.exports = mongoose.model("Menu", Menu);
