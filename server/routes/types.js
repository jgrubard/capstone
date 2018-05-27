const router = require('express').Router();
module.exports = router;

const { Type } = require('../db').models;

router.get('/', (req, res, next) => {
  Type.findAll()
    .then(types => res.send(types))
    .catch(next);
});
