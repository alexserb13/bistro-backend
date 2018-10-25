const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");

router.get("/", (req, res) => {
  res.send("Admin route!");
});

//Add a new Admin
// router.post("/", (req, res) => {
//   let adminUser = new Admin({
//     username: req.body.username,
//     password: req.body.password
//   });
//   Admin.addAdminUser(adminUser, (err, user) => {
//     if (err) throw err;
//     res.json(user);
//   });
// });

//Login
router.post("/", (req, res) => {
  let adminUser = new Admin({
    username: req.body.username,
    password: req.body.password
  });

  Admin.findOne({ username: adminUser.username }).then(user => {
    Admin.comparePasswords(adminUser.password, user.password, isValid => {
      if (isValid) {
        const token = jwt.sign(user.toJSON(), "secret", {
          expiresIn: 3600
        });
        res.json({ success: true, token });
      } else {
        res.json({ success: false });
      }
    });
  });
});

module.exports = router;
