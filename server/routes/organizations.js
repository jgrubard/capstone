const router = require('express').Router();
module.exports = router;

const { Organization } = require('../db').models;

router.get('/', (req, res, next) => {
  Organization.findAll()
    .then(organizations => res.send(organizations))
    .catch(next);
});
