const router = require('express').Router();
module.exports = router;

const { UserRequest } = require('../db').models;

router.get('/', (req, res, next) => {
  UserRequest.findAll()
    .then(userRequests => res.send(userRequests))
    .catch(next);
});
