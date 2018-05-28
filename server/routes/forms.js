const router = require('express').Router();
module.exports = router;

const { Form } = require('../db').models;

router.get('/', (req, res, next) => {
  Form.findAll()
    .then(forms => res.send(forms))
    .catch(next);
});
