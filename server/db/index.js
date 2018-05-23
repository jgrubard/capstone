const Description = require('./models/Description');
const Organization = require('./models/Organization');
const User = require('./models/User');
const conn = require('./conn');

module.exports = {
  conn,
  models: {
    Description,
    Organization,
    User
  }
};
