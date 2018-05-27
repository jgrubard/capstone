const Description = require('./models/Description');
const Organization = require('./models/Organization');
const UserOrganization = require ('./models/UserOrganization')
const User = require('./models/User');
const Type = require('./models/Type');
const conn = require('./conn');

// User.belongsToMany(Organization, { through: Description });
// Organization.belongsToMany(User, { through: Description });

Description.belongsTo(User);
Description.belongsTo(Organization);
Type.hasMany(Organization)

UserOrganization.belongsTo(User);
UserOrganization.belongsTo(Organization);

module.exports = {
  conn,
  models: {
    Description,
    Organization,
    UserOrganization,
    User,
    Type
  }
};
