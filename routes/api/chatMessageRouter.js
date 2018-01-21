var express = require('express');
var router = express.Router();
var ChatMessageController = require('../../controllers/chatMessageController');
var chatMessageController = new ChatMessageController();
var authentication = require("../../auth/authentication");
router.get('/', authentication, chatMessageController.get);
// router.post('/', authentication, chatroomController.createRoom);


module.exports = router;
