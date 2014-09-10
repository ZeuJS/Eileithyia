"use strict";
module.exports =
{
  uninstallable: false,
  prometheusSchemas: [
    require('./schemas/zeujsUser.js')
  ],
  artemisRoutes: [
    require('./routes/users.js'),
    require('./routes/user.js'),
  ],
  prometheusTypes: [
    require('./types/Password.js'),
  ]
};