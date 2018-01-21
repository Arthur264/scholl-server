var router = require('express').Router();
var FriendsController = require('../../controllers/friendsController');
var friendsController = new FriendsController();
var authentication = require("../../auth/authentication");


//friends router 
router.get('/', authentication, friendsController.getFriends);
router.post('/', authentication, friendsController.addToFriends);
// router.post('/', authentication, friendsController.addToFriends);
// invitation
//router.delete('/friends', authentication, userController.removeFriends);

module.exports = router;
