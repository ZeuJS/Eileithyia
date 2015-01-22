"use strict";
var bcrypt = require('bcrypt');

module.exports = function (rails, pass) {
  pass(!!rails.identity, function() {
    rails.response.json({
      success: false,
      message: 'Identity is required',
    }, 403)
  });
};