var router = require('express').Router();
var UserController = require('../../controllers/userController');
var userController = new UserController();
var authentication = require("../../auth/authentication");
//user router

router.get('/:id', authentication, userController.Get);
router.get('/', authentication, userController.Get);
router.put('/', authentication, userController.Change);
router.delete('/', authentication, userController.Delete);
// router.get('/avatar', authentication, userController.GetAvatar);
router.post('/avatar', authentication, userController.UploadAvatar);

module.exports = router;
