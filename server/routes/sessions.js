const router = require('express').Router();
const { User } = require('../db').models;

//ATTEMPT LOGIN - /api/sessions
router.post('/', (req, res, next) => {
  User.authenticate(req.body)
    .then(token => res.send(token))
    .catch(next);
});

router.get('/:token', (req, res, next) => {
  User.exchangeTokenForUser(req.params.token)
    .then(user => res.send(user))
    .catch(next);
});

module.exports = router;
