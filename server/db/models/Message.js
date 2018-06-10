const conn = require('../conn');
const { Sequelize } = conn;
const Conversation = require('./Conversation');

const Message = conn.define('message', {
  text: Sequelize.STRING,
  userId: Sequelize.STRING
});

Message.createMessage = function(text, senderId, user1Id, user2Id) {
  return Message.create({
    text,
    userId: senderId
  })
    .then(() => {
      const firstPermutation = `${user1Id}&${user2Id}`;
      const secondPermutation = `${user2Id}&${user1Id}`;
      Conversation.find({
        where: {
          chatId: {
            [Op.or]: [firstPermutation, secondPermutation]
          }
        }
      })
        .then(conversation => {
          const messages = conversation.messages;
          return messages;
        })
    })
}

module.exports = Message;
