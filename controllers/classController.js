const classModel = require("../models/classModel");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

function ClassController() {
    this.getAll = function(req, res, next) {
        classModel.get({}, function(err, clases) {
            if (err) {
                next(err)
            }
            res.json({ clases: clases });
        });
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
    this.get = function(req, res, next) {
        var data = {
            class: req.params.id
        };
        userModel.get(data, function(err, data) {
            if (err) {
                next(err);
            }
            res.json({ "userClass": data });
        })

    };
};

module.exports = ClassController;
