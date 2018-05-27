const conn = require('../conn');
const { Sequelize } = conn;

const Type = conn.define('type', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
}, {
  timestamps: false
});

module.exports = Type;
