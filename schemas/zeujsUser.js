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
      personnalData: {
        firstname: String,
        lastname: String
      },
      tokens: [{
        part: {
          access: String,
          refresh: String
        },
        lifetime: Number,
        expiration: Date
      }]
    }
  },
  masks: {
    login: 'email'
  }
};

