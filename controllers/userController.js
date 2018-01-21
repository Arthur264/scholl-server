var userModel = require("../models/userModel");
var friendsModel = require("../models/friendsModel");
var multer = require('multer')
const config = require("../config/config");
const fs = require("fs");

function UserController() {
    this.Change = function(req, res, next) {
        var id = req.body.userid;
        var data = req.body.userData;
        userModel.findOneAndUpdate(id, data, function(err, person) {
            if (err) return next(err);
            res.json({ s: 1 });
        });

    };

    this.Get = function(req, res, next) {
        // if /user get all 

        var id = req.body.userid;
        var data = {
            _id: { $ne: id },
        };


        //if /user/:id get by id
        var idUser = req.params.id;
        if (idUser) {
            data["_id"] = idUser;
        }
        console.log(req.query.count, req.query.page)
        userModel.find(data)
            .limit(Number(req.query.count) || 20)
            .skip(Number(req.query.count) * Number(req.query.page) || 0)
            .populate("class name")
            .sort('-update')
            .exec(function(err, result) {
                if (err) return next(err);
                if (idUser) {
                    friendsModel.findOne({
                        $or: [{ userOne: req.body.userid, userTwo: idUser, status: true }, { userTwo: req.body.userid, userOne: idUser, status: true }]
                    }, function(err, result2) {
                        if (err) return next(err);
                        if (result2) {
                            res.json({ s: 1, data: { "user": result, "friend": result2 } });
                        }
                        else {
                            res.json({ s: 1, data: { "user": result, "friend": null } });
                        }
                    })
                }
                else {
                    res.send(result);
                }

            })
    }
    this.Delete = function(req, res, next) {
        var id = req.body.userid;
        userModel.findOneAndRemove({ "_id": id }, function(err) {
            if (err) return next(err);
            res.json({ s: 1 }).status(200);
        });
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
                if (err) return next(err);
                console.log(persone)
                if (persone[0].uploadAvatar) {
                    if (fs.existsSync(config.pathstatic + 'avatar/' + persone[0].avatar)) {
                        fs.unlinkSync(config.pathstatic + 'avatar/' + persone[0].avatar);
                    }
                }
                userModel.findOneAndUpdate(id, { avatar: avatar, uploadAvatar: datanow }, function(err, person) {
                    if (err) return next(err);
                    res.status(200).json(avatar)
                })
            })
        });
    }
};

module.exports = UserController;
