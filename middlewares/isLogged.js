"use strict";
var bcrypt = require('bcrypt');

module.exports = function (rails, pass) {
  if (!rails.identity) {
    pass(false, function() {
      rails.response.json({
        success: false,
        message: 'Identity is required',
      }, 403)
    });
  }
};