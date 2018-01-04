const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const cookieParser = require('cookie-parser');

function LoginController(req, res, next) {
    var data = {
        email: req.body.email,
        password: req.body.password
    };
    userModel.get({ email: data.email }, function(err, person) {
        if (err) {
            next(err)
        }
        if (!person.length) {
            res.json({ s: 0, m: 'User dont exist' })
        }
        else {
            res.json({ s: 1, "token": jwt.sign({ id: person[0]["_id"] }, config.secretkey), user: person[0] });
        }
    })

};

module.exports = LoginController;
