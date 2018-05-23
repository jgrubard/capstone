const conn = require('../conn');
const { Sequelize } = conn;

const Description = conn.define('description', {
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
