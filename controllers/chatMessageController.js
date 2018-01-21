const chatRoomModel = require("../models/chatModel").chatRoomModel;
const chatMessageModel = require("../models/chatModel").chatMessageModel;
const friendsModel = require("../models/friendsModel");
const userModel = require("../models/userModel");

function ChatMessageController() {
    this.get = function(req, res, next) {
        var id = req.query.id;
        chatMessageModel
            .find({ idRoom: id })
            .sort("-dataCreate")
            .limit(20)
            .exec(function(err, results) {
                if (err) return next(err);
                res.json({ s: 1, data: results });
            })
    };
};

module.exports = ChatMessageController;
