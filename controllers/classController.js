const classModel = require("../models/classModel");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

function ClassController() {
    this.get = function(req, res, next) {
        var id = req.query.id;
        var data = {};
        if (id) {
            data.class = id;
            userModel.find(data)
                .populate("class name")
                .exec(function(err, data) {
                    if (err) return next(err);
                    res.send(data);
                })
        }
        else {
            classModel.find(data, function(err, clases) {
                if (err) {
                    next(err)
                }
                res.json({ clases: clases });
            });
        }

    };
    this.create = function(req, res, next) {
        var data = {
            name: req.body.name
        };
        classModel.create(data, function(err, clases) {
            if (err) {
                next(err)
            }
            res.json({ clases: clases });
        })
    };

};

module.exports = ClassController;
