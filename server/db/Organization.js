const conn = require('./conn');
const { Sequelize } = conn;

const Organization = conn.define('organization', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  organization_type: {
    type: Sequelize.STRING,
    allowNull: false
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false
  },
  zip: {
    type: Sequelize.STRING,
    allowNull: false
  },
  contact_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  contact_phone: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Organization;