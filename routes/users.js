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
          errors: err
        }, 409);
      } else {
        rails.response.json({
          document: document
        });
      }
    });

  }
})

indexDefinition.push({
  id: "GET",
  action: function action(rails) {
    var storage = rails.services.findById('storage');
    var usersSchema = storage.find('users');

    usersSchema.find({}, function(err, documents) {
      if (err) {
        rails.response.json({
          errors: err
        }, 409);
        return;
      }
      documents.forEach(function(document, index, array) {
        array[index] = {
          id: document._id,
          email: document.email,
        }
      })
      rails.response.json({
        users: documents
      });
    });

  }
})

indexDefinition.push({
  id: "OPTIONS",
  action: function action(rails) {
    rails.response.json({});
  }
})

module.exports = {
  id: "index",
  definition: indexDefinition,
}