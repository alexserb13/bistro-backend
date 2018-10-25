const express = require("express");
const router = express.Router();

const Menu = require("../models/Menu");

router.get("/", (req, res) => {
  res.json({ isValid: true });
});

//Add a Menu
router.post("/", (req, res) => {
  let menu = new Menu({
    name: req.body.name
  });

  menu
    .save()
    .catch(err => {
      throw err;
    })
    .then(menu => {
      res.json(menu);
    });
});

//Delete Menu
router.delete("/", (req, res) => {
  Menu.remove({ _id: req.body._id })
    .catch(err => {
      throw err;
    })
    .then(res.json({ success: true }));
});

//Add a menu item
router.post("/item", (req, res) => {
  let item = {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description
  };
  Menu.findOne({ _id: req.body._id })
    .catch(err => {
      throw err;
    })
    .then(menu => {
      menu.items.push(item);
      menu
        .save()
        .catch(err => {
          throw err;
        })
        .then(menu => {
          res.json(menu);
        });
    });
});

//Delete Menu Item
router.delete("/item", (req, res) => {
  let menuId = req.body.menuId;
  let itemId = req.body.itemId;
  Menu.findOne({ _id: menuId })
    .catch(err => {
      throw err;
    })
    .then(menu => {
      let index = menu.items
        .map(item => {
          return item._id;
        })
        .indexOf(itemId);
      menu.items.splice(index, 1);

      menu
        .save()
        .catch(err => {
          throw err;
        })
        .then(res.json(menu));
    });
});
module.exports = router;
