const router = require('express').Router();
module.exports = router;

const { Conversation, Message } = require('../db').models;
const Op= require('sequelize').Op;

router.get('/:user1Id/:user2Id', (req, res, next) => {
  Conversation.findOrCreateConversation(req.params.user1Id, req.params.user2Id)
    .then(conversation => {
      const messages = conversation.messages;
      res.send(messages);
    })
    .catch(next);
})

router.post('/:user1Id/:user2Id', (req, res, next) => {
  const text = req.body.text;
  const senderId = req.body.senderId
  const user1Id = req.params.user1Id;
  const user2Id = req.params.user2Id;
  Message.createMessage(text, senderId, user1Id, user2Id)
    .then(messages => res.send(messages))
    .catch(next);
})
