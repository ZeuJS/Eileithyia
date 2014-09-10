"use strict";

var UrlDefinition = require('zeujsArtemis/definition/url.js');

var indexDefinition = new UrlDefinition('/users');

indexDefinition.push({
  id: "POST",
  action: function action(rails) {
    var storage = rails.services.findById('storage');
    var usersSchema = storage.find('users');
    var document = rails.request.params;
    usersSchema.insert(document, function(err, document) {
      if (err) {
        rails.response.json({
          success: false,
          errors: err
        });
      } else {
        rails.response.json({
          success: true,
          document: document
        });
      }
    });

  }
})

module.exports = {
  id: "index",
  definition: indexDefinition,
}