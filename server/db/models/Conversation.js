const conn = require('../conn');
const { Sequelize } = conn;
const Message = require('./Message');
const Op = Sequelize.Op;

const Conversation = conn.define('conversation', {
  chatId: {
    type: Sequelize.STRING,
    primaryKey: true
  }
});

Conversation.findOrCreateConversation = (user1Id, user2Id) => {
  const firstPermutation = `${user1Id}&${user2Id}`;
  const secondPermutation = `${user2Id}&${user1Id}`;
  return Conversation.find({
    where: {
      chatId: {
        [Op.or]: [firstPermutation, secondPermutation]
      }
    },
    include: [ Message ]
  })
    .then(conversation => {
      if(conversation) {
        return conversation;
      } else {
        return Conversation.create({
          chatId: firstPermutation
        })
          .then(() => Conversation.findById(firstPermutation, {
              include: [ Message ]
            }))
              .then(conversation => conversation);
      }
    })
}

module.exports = Conversation;

