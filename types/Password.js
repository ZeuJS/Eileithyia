"use strict";
var bcrypt = require('bcrypt');

function PasswordType(password) {
  this.password = bcrypt.hashSync(password, 8);;
}
PasswordType.prototype.valueOf = function () {
  return this.password;
}
module.exports = {
  id: "Password",
  type: PasswordType
};