const router = require('express').Router();
const { User } = require('../db').models;

router.use((req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return next();
  }
  User.exchangeTokenForUser(token)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(() => next({ status: 401 }));
});

router.use('/organizations', require('./organizations'));
router.use('/users', require('./users'));
router.use('/descriptions', require('./descriptions'));
router.use('/sessions', require('./sessions'));
router.use('/userorganizations', require('./userorganizations'))
router.use('/forms', require('./forms'));
router.use('/organizationRequests', require('./organizationRequests'))

module.exports = router;
