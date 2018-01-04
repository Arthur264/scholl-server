var mainModel = require("./mainModel");
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
var userSchema = {
    firstname: {
        type: String,
        reqiured: true
    },
    lastname: {
        type: String,
        reqiured: true
    },
    age: Number,
    class: {
        type: Schema.Types.ObjectId,
            ref: 'class'
    },
    password: {
        type: String,
        reqiured: true
    },
    email: {
        type: String,
        reqiured: true
    },
    avatar: String,
    uploadAvatar: {
        type: String,
    },
    update: Date
};
var userModel = new mainModel(userSchema, 'user');
userModel.getAllUserClass = function(id, cb) {
    // userModel.model.;


}
userModel.getAllUserClass();
module.exports = userModel;
