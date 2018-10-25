const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const db = require("./config/db");

require("./config/passport");
const app = express();

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Database Connection
mongoose.connect(
  db.name,
  { useNewUrlParser: true },
  err => {
    if (err) throw err;
    console.log(`Conected to ${db.name}`);
  }
);

//Routes paths
const Admin = require("./routes/admin");
const Api = require("./routes/api");
const Menu = require("./routes/menu");

//Routes
app.use("/api", passport.authenticate("jwt", { session: false }), Api);
app.use("/admin", Admin);
app.use("/menu", Menu);

let port = process.env.PORT || 5000;

app.get("*", (req, res) => {
  res.send("Index route!");
});

app.listen(port, () => {
  console.log(`Listening on port ${port} !`);
});
