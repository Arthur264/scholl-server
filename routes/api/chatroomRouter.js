var express = require('express');
var router = express.Router();
var ChatroomController = require('../../controllers/chatRoomController');
var chatroomController = new ChatroomController();
var authentication = require("../../auth/authentication");
router.get('/', authentication, chatroomController.get);
router.post('/', authentication, chatroomController.createRoom);


module.exports = router;
