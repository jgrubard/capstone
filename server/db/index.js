const Description = require('./models/Description');
const Organization = require('./models/Organization');
const UserOrganization = require ('./models/UserOrganization')
const OrganizationRequest = require ('./models/OrganizationRequest')
const User = require('./models/User');
const Form = require('./models/Form')
const conn = require('./conn');

// User.belongsToMany(Organization, { through: Description });
// Organization.belongsToMany(User, { through: Description });

Description.belongsTo(User);
Description.belongsTo(Organization);
Description.belongsTo(Form);
Form.hasMany(Description);

Form.belongsTo(Organization);

UserOrganization.belongsTo(User);
UserOrganization.belongsTo(Organization);

OrganizationRequest.belongsTo(Organization);
OrganizationRequest.belongsTo(User);

module.exports = {
  conn,
  models: {
    Description,
    Organization,
    UserOrganization,
    User,
    Form
  }
};
