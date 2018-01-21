const chatRoomModel = require("../models/chatModel").chatRoomModel;
const chatMessageModel = require("../models/chatModel").chatMessageModel;
const friendsModel = require("../models/friendsModel");
const userModel = require("../models/userModel");

function ChatController() {
    this.get = function(req, res, next) {
        var userid = req.body.userid;
        var id = req.query.id;

        var data = {
            $or: [{ userOne: userid }, { userTwo: userid }]
        };
        chatRoomModel.find(data)
            .sort("-dataCreate")
            .exec(function(err, results) {
                if (err) return next(err);
                userModel.populate(results, "userOne userTwo", function(err, results2) {
                    if (err) return next(err);
                    var arr = results2.map(function(result) {
                        if (result.userOne['_id'] == userid) {
                            return {
                                action_user_id: result.action_user_id,
                                user: result.userTwo,
                                _id: result['_id']
                            }
                        }
                        else {
                            return {
                                action_user_id: result.action_user_id,
                                user: result.userOne,
                                _id: result['_id']
                            }
                        }
                    })
                    res.json({ s: 1, data: arr });
                })
            })
    };
    this.createRoom = function(req, res, next) {
        var data = {
            userOne: req.body.userid,
            userTwo: req.body.id,
            action_user_id: req.body.userid
        }
        friendsModel.findOne({
            $or: [{ userOne: req.body.userid, userTwo: req.body.id, status: true }, { userOne: req.body.id, userTwo: req.body.userid, status: true }]
        }, function(err, docs) {
            if (err) return next(err);
            if (docs) {
                data["friends_id"] = docs["_id"];
                if (!docs.isChat) {
                    chatRoomModel.create(data, function(err, result) {
                        if (err) return next(err);
                        friendsModel.findByIdAndUpdate(docs["_id"], { isChat: true }, function(err, docs) {
                            if (err) return next(err);
                            res.status(200).json({ s: 1, data: result })
                        })
                    })
                }
                else {
                    chatRoomModel.find(data, function(err, result) {
                        if (err) return next(err);
                        res.status(200).json({ s: 1, data: result })
                    })
                }
            }
            else {
                res.json({ m: "User to a friends or room is exist", s: 0 })
            }
        })
    }
};

module.exports = ChatController;
