var express = require('express');
var router = express.Router();
var loginController = require('../../auth/loginController');
var registerController = require('../../auth/registerController');

router.post('/login', loginController);
router.post('/register', registerController);


module.exports = router;