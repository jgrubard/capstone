const router = require('express').Router();
module.exports = router;

const { Description } = require('../db').models;

router.get('/', (req, res, next) => {
  Description.findAll()
    .then(descriptions => res.send(descriptions))
    .catch(next);
});
