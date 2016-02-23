"use strict";
var bcrypt = require('bcrypt');

function PasswordType(password) {
  if (password && bcrypt.getRounds(password) < 1) {
    this.password = bcrypt.hashSync(password, 8);
    return;
  }
  this.password = password;
};
PasswordType.prototype.valueFor = function (dbType) {
  return this.password;
};
module.exports = {
  id: "Password",
  type: PasswordType
};