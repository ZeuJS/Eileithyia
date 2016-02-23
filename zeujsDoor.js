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
    require('./routes/login.js'),
    require('./routes/oauth2/generate.js')
  ],
  prometheusTypes: [
    require('./types/Password.js'),
  ],
  artemisMiddlewares: [
    {
      id: "identity",
      action: require('./middlewares/identity.js')
    },
    {
      id: "isLogged",
      action: require('./middlewares/isLogged.js')
    }
  ],
};