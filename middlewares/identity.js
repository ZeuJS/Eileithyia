"use strict";
var bcrypt = require('bcrypt');

module.exports = function (rails, pass) {
  var headers = rails.request.headers;
  if (typeof headers.authorization === 'undefined') {
    return pass(true);
  } else {
    var authorization = headers.authorization.split(/\s+/);
    if (authorization[0] === 'Basic') { //rfc2617
      var buffer = new Buffer(authorization[1], 'base64')
      var credentials = buffer.toString().split(/:/);
      credentials = {
        user: credentials.shift(),
        password: credentials.join(':')
      }
      var storage = rails.services.findById('storage');
      var usersStorage = storage.find('users');
      usersStorage.findOne({email: credentials.user}, function (err, user) {
        if (!user) {
          return pass(false, function() {
            rails.response.json({
              success: false,
              message: 'User not found.'
            }, 403)
          });
        }
        bcrypt.compare(credentials.password, user.password, function(err, result) {
          rails.identity = user;
          pass(result, function() {
            rails.response.json({
              success: false,
              message: 'User not authorized.'
            }, 403)
          });
        })
      });
    }
  }
};