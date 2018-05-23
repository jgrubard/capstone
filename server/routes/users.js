const router = require('express').Router();
module.exports = router;

const { User } = require('../db').models;

router.get('/', (req, res, next) => {
  User.findAll()
    .then(users => res.send(users))
    .catch(next);
});
