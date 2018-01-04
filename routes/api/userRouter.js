var router = require('express').Router();
var UserController = require('../../controllers/userController');
var userController = new UserController();
var authentication = require("../../auth/authentication");
//user router
router.get('/', authentication, userController.GetAll);
router.put('/', authentication, userController.Change);
router.delete('/', authentication, userController.Delete);
// router.get('/avatar', authentication, userController.GetAvatar);
router.post('/avatar', authentication, userController.UploadAvatar);

//friends router 
//router.get('/friends', authentication, userController.getFriends);
router.post('/friends', authentication, userController.addToFriends);
//router.delete('/friends', authentication, userController.removeFriends);

module.exports = router;
