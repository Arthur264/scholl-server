 var friendsModel = require("../models/friendsModel");
 var userModel = require("../models/userModel");

 function FriendsController() {
  this.addToFriends = function(req, res, next) {
   var data = {
    userOne: req.body.userid,
    userTwo: req.body.id,
    action_user_id: req.body.userid
   }
   friendsModel.findOne({ $or: [{ userOne: req.body.userid, userTwo: req.body.id }, { userOne: req.body.id, userTwo: req.body.userid }] }, function(err, result) {
    if (err) return next(err);
    if (result && result.length) {
     if (data["action_user_id"] !== String(result[0]["action_user_id"])) {
      console.log("not equal")
      friendsModel.findOneAndUpdate(result[0]['_id'], { status: true }, function(err, result) {
       if (err) return next(err);
       res.json(result)
      })
     }
     else {
      res.json({ m: "fgkjb" })
     }
    }
    else {
     friendsModel.create(data, function(err, result) {
      if (err) return next(err);
      res.json(result)
     })
    }
   })
  }
  this.getFriends = function(req, res, next) {
   var reqFriends = req.query.reqfriends;
   var data1, data2 = {};
   if (reqFriends) {
    data1 = { userOne: req.body.userid, status: false, action_user_id: { $ne: req.body.userid } }
    data2 = { userTwo: req.body.userid, status: false, action_user_id: { $ne: req.body.userid } }
   }
   else {
    data1 = { userOne: req.body.userid, status: true }
    data2 = { userTwo: req.body.userid, status: true }
   }
   friendsModel.find(data1, function(err, result1) {
    if (err) return next(err);
    userModel.populate(result1, { path: "userTwo" }, function(err, docs1) {
     if (err) return next(err);
     var arr1 = docs1.map(function(users) {
      return users.userTwo
     })
     friendsModel.find(data2, function(err, result2) {
      if (err) return next(err);
      userModel.populate(result2, { path: "userOne" }, function(err, docs2) {
       if (err) return next(err);
       var arr2 = docs2.map(function(users) {
        return users.userOne
       })
       var result = arr1.concat(arr2);
       res.json(result);
      })
     })
    })
   })
  }
  this.deleteFriends = function(req, res, next) {
   var data = {
    userOne: req.body.userid,
    userTwo: req.body.id,
    status: true
   }
   friendsModel.findOneAndRemove(data, function(err, result) {
    if (err) return next(err);
    res.json(result)
   })
  }

 }
 module.exports = FriendsController;
 