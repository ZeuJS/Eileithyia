"use strict";

var UrlDefinition = require('zeujsArtemis/definition/url.js');
var bcrypt = require('bcrypt');
var crypto = require('crypto');
var indexDefinition = new UrlDefinition('/users/oauth2/token/generate');

indexDefinition.push({
  id: "POST",
  action: function action(rails) {
    var storage = rails.services.findById('storage');
    var usersSchema = storage.find('users');
    var search = rails.request.params;
    if (!search.email) {
      rails.response.json({
        errors: 'param.email.missing'
      }, 400);
      return;
    }
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
          errors: 'user.not.found'
        });
        return;
      }
      bcrypt.compare(search.password, document.password, function(err, res) {
        if (!res) {
          rails.response.json({
            errors: 'bad.password'
          }, 403);
          return;
        }
        crypto.randomBytes(64, function(err, accessTokenBuff){
          if (err) {
            rails.response.json({
              errors: ''
            }, 403);
            return;
          }
          crypto.randomBytes(64, function(err, refreshTokenBuff){
            if (err) {
              rails.response.json({
                errors: ''
              }, 403);
              return;
            }
            var accessTokenShasum = crypto.createHash('sha256');
            accessTokenShasum.update(document._id.toString());
            accessTokenShasum.update(accessTokenBuff);
            var accessToken = accessTokenShasum.digest('base64');

            var refreshTokenShasum = crypto.createHash('sha256');
            refreshTokenShasum.update(document._id.toString());
            refreshTokenShasum.update(refreshTokenBuff);
            var refreshToken = refreshTokenShasum.digest('base64');

            if (typeof document.tokens === 'undefined') {
              document.tokens = []
            }
            var expiration = new Date();
            expiration.setSeconds(expiration.getSeconds() + 3600);
            document.tokens.push({
              part: {
                access: accessToken,
                refresh: refreshToken
              },
              lifetime: 3600,
              expiration: expiration
            });
            usersSchema.save(document, function(err, modified) {
              if (err) {
                rails.response.json({
                  errors: err
                }, 409);
                return;
              }
              rails.response.json({
                email: document.email,
                personalData: document.personnalData,
                access_token: accessToken,
                refresh_token: refreshToken,
                expiration: expiration
              });
            });
          });
        });
      });
    });
  }
})

module.exports = {
  id: "index",
  definition: indexDefinition,
}