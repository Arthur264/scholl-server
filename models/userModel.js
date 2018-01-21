let mongoose = require('mongoose');
let Schema = mongoose.Schema;
var userSchema = new Schema({
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
        reqiured: true,
        unique: true,
    },
    friends: {
        type: [String],
        ref: "friends"
    },
    avatar: String,
    uploadAvatar: {
        type: String,
    },
    update: Date
});

var userModel = mongoose.model('user', userSchema);
module.exports = userModel;
