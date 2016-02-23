"use strict";

var UrlDefinition = require('zeujsArtemis/definition/url.js');
var bcrypt = require('bcrypt');
var indexDefinition = new UrlDefinition('/users/login');

indexDefinition.push({
  id: "POST",
  action: function action(rails) {
    var storage = rails.services.findById('storage');
    var usersSchema = storage.find('users');
    var search = rails.request.params;
    if (!search.password) {
      rails.response.json({
        errors: 'param.password.missing'
      }, 400);
      return;
    }

    usersSchema.findOne(search, {maskName: 'login'}, function(err, document) {
      if (err) {
        rails.response.json({
          errors: err
        }, 409);
        return;
      }

      if (!document) {
        rails.response.json({
          errors: 'email.not.found'
        });
        return;
      }
      bcrypt.compare(search.password, document.password, function(err, res) {
        if (res) {
          var base64 = new Buffer([search.email, search.password].join(':')).toString('base64');
          rails.response.json({
            base64: base64
          });
          return;
        }
        rails.response.json({
          errors: 'bad.password'
        }, 403);
      });
    });

  }
})

module.exports = {
  id: "index",
  definition: indexDefinition,
}