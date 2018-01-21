var express = require('express');
var router = express.Router();
var ClassController = require('../../controllers/classController');
var classController = new ClassController();

router.get('/', classController.get);
router.post('/', classController.create);


module.exports = router;
