module.exports = {
  source: "default",
  storageEntity: "Users",
  id: "users",
  behaviors: [],
  schemaMask: 0,
  schema: function (types) {
    return {
      email: [types.find('Email')],
      password: types.find('Password'),
    }
  }
};

