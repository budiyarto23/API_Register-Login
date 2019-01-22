var express = require('express')
var router = express.router();
const { authController } = require('../controllers')

router.post('/register', authController.register)
router.post('/sigin', authController.signin)

module.exports = router;