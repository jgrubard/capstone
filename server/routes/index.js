const router = require('express').Router();

router.use('/organizations', require('./organizations'));
router.use('/users', require('./users'));

module.exports = router;
