const conn = require('./conn');
const { Sequelize } = conn;

const Description = ('description', {
  attribute: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Description;
