const router = require('express').Router();

router.use('/organizations', require('./organizations'));
router.use('/users', require('./users'));
router.use('/descriptions', require('./descriptions'));

module.exports = router;
