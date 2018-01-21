let mongoose = require('mongoose');
let Schema = mongoose.Schema;
var friendsSchema = new Schema({
    userOne: {
        type: Schema.Types.ObjectId,
        res: "user",
        required: true
    },
    userTwo: {
        type: Schema.Types.ObjectId,
        res: "user",
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    isChat: {
        type: Boolean,
        default: false
    },
    action_user_id: {
        type: Schema.Types.ObjectId,
        res: "user",
        required: true
    },
    dataCreate: {
        type: Date,
        default: Date.now
    },
    dataConfirm: {
        type: Date
    }
})
var friendsModel = mongoose.model('friends', friendsSchema)
module.exports = friendsModel;
