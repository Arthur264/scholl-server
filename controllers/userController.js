var userModel = require("../models/userModel");
var friendsModel = require("../models/friendsModel");
var multer = require('multer')
const config = require("../config/config");
const fs = require("fs");

function UserController() {
    this.Change = function(req, res, next) {
        var id = req.body.userid;
        var data = req.body.userData;
        userModel.change(id, data, function(err, person) {
            if (err) return next(err);
            res.json({ s: 1 });
        });

    };

    this.GetAll = function(req, res, next) {
        userModel.get({}, function(err, docs) {
            if (err) {
                next(err)
            }
            res.send(docs);
        });
    };

    this.Get = function(req, res, next) {
        userModel.getUser(function(err, docs) {
            if (err) {
                next(err)
            }
            res.send(docs);
        });
    }

    this.Delete = function(req, res, next) {
        userModel.deleteUser(function(err, docs) {
            if (err) {
                next(err)
            }
            res.status(200);
        });
    }
    this.addToFriends = function(req, res, next) {
        var data = {
            userSend: req.body.userid,
            userGet: req.body.id,
            action_user_id: req.body.userid
        }
        friendsModel.create(data, function(err, data) {
            if (err) return next(err);
            res.json(data)
        })

    }
    this.getFriends = function(res, req, next) {
        var data = {
            id: req.body.userid,
            status: true
        }
        friendsModel.find(data, function(err, result) {
            if (err) return next(err);
            res.json(result);
        })
    }
    this.UploadAvatar = function(req, res, next) {
        var id = req.body.userid;
        var datanow = String(Date.now());
        var avatar = 'avatar-' + datanow + '.jpg';

        var storage = multer.diskStorage({
            destination: function(req, file, cb) {
                cb(null, config.pathstatic + 'avatar/')
            },
            filename: function(req, file, cb) {
                cb(null, avatar);
            }
        })
        var upload = multer({ storage: storage, limits: { fileSize: 2000000 } }).single('avatar');
        userModel.get({ "_id": id }, function(err, persone) {
            if (err) return next(err);
            upload(req, res, function(err) {
                if (err) { return next(err) };
                if (persone[0].uploadAvatar) {
                    if (fs.existsSync(config.pathstatic + 'avatar/' + persone[0].avatar)) {
                        fs.unlinkSync(config.pathstatic + 'avatar/' + persone[0].avatar);
                    }
                }
                userModel.change(id, { avatar: avatar, uploadAvatar: datanow }, function(err, person) {
                    if (err) return next(err);
                    res.status(200).json(avatar)
                })
            })
        });
    }
};

module.exports = UserController;
