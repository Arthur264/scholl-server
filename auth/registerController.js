const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

function RegisterController(req, res, next) {
    var data = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password,
        email: req.body.email,
        age: req.body.age,
        class: req.body.class

    };
    userModel.find({ email: data.email }, function(err, persone) {
        if (err) return next(err);
        if (!persone.length) {
            userModel.create(req.body, function(err, person) {
                if (err) return next(err);
                res.json({ "token": jwt.sign({ id: person['_id'] }, config.secretkey), "userdata": person })
            })
        }
        else {
            res.json({ s: 0, m: "User exist!" })
        }
    })
};

module.exports = RegisterController;
