const Description = require('./models/Description');
const Organization = require('./models/Organization');
const User = require('./models/User');
const conn = require('./conn');

// User.belongsToMany(Organization, { through: Description });
// Organization.belongsToMany(User, { through: Description });

Description.belongsTo(User);
Description.belongsTo(Organization);

module.exports = {
  conn,
  models: {
    Description,
    Organization,
    User
  }
};
