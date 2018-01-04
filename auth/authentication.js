const jwt = require("jsonwebtoken");
const config = require("../config/config");

function checkController(req, res, next) {
    
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if(token){
        jwt.verify(token, config.secretkey, function (err, data) {
            if(err){
                res.status(511).send({s: 0});
            }else{
                req.body.userid = data.id;
                next();
            }
        })
    }else{
        res.status(511).send({s: 0});
    }
}

module.exports = checkController;
