let mongoose = require('mongoose');
let Schema = mongoose.Schema;
var chatRoomSchema = new Schema({
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
    action_user_id: {
        type: Schema.Types.ObjectId,
        res: "user",
        required: true
    },
    friends_id: {
        type: Schema.Types.ObjectId,
        res: "friends",
        required: true
    },
    dataCreate: {
        type: Date,
        default: Date.now
    },
})
module.exports.chatRoomModel = mongoose.model('chat_room', chatRoomSchema);

var chatMessageSchema = new Schema({
    idRoom: {
        type: Schema.Types.ObjectId,
        res: "chat_room",
        required: true
    },
    message: {
        type: String,
    },
    status: {
        type: Boolean,
        default: false
    },
    creator_id: {
        type: Schema.Types.ObjectId,
        res: "user",
        required: true
    },
    dataCreate: {
        type: Date,
        default: Date.now
    },
})
module.exports.chatMessageModel = mongoose.model('chat_message', chatMessageSchema);

// module.exports = {
//     "chatMessageModel": chatMessageModel,
//     "chatRoomModel": chatRoomModel
// }
