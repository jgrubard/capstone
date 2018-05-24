const conn = require('../conn');
const { Sequelize } = conn;

const Description = conn.define('description', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  attribute: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  timestamps: false
});

module.exports = Description;
