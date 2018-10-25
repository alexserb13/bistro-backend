const express = require("express");
const router = express.Router();

const Menu = require("../models/Menu");

router.get("/", (req, res) => {
  Menu.find()
    .catch(err => {
      res.json({ status: 501 });
    })
    .then(menu => {
      res.json({ menu });
    });
});

module.exports = router;
