"use strict";

var UrlDefinition = require('zeujsArtemis/definition/url.js');

var indexDefinition = new UrlDefinition('/users/:id');

indexDefinition.push({
  id: "GET",
  middlewares: ['identity'],
  action: function action(rails) {
    var storage = rails.services.findById('storage');
    var usersSchema = storage.find('users');
    usersSchema.findOne({id: indexDefinition.routeParams.id}, function(err, document) {
      if (err != null) {
        rails.response.json({
          error: err
        }, 404)
      }
      rails.response.json({
        user: {
          id: document._id,
          email: document.email,
        }
      });
    });
  }
})

module.exports = {
  id: "index",
  definition: indexDefinition,
}