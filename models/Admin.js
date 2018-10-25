const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const AdminSchema = new Schema({
  username: String,
  password: String
});

const Admin = (module.exports = mongoose.model("Admin", AdminSchema));

module.exports.addAdminUser = (user, callback) => {
  console.log("aici");
  bcrypt.genSalt(9, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      user.password = hash;
      user.save(callback);
    });
  });
};

module.exports.comparePasswords = (myPlaintextPassword, hash, callback) => {
  bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
    callback(res);
  });
};
