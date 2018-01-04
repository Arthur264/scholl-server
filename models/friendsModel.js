var mainModel = require("./mainModel.js");
let Schema = require('mongoose').Schema;
var friendsSchema = {
    userSend: {
        type: Schema.Types.ObjectId,
        res: "user"
    },
    userGet: {
        type: Schema.Types.ObjectId,
        res: "user"
    },
    status: {
        type: Boolean,
        default: false
    },
    action_user_id: {
        type: Schema.Types.ObjectId,
        res: "user"
    },
    dataCreate: {
        type: Date,
        default: Date.now
    },
    dataConfirm: {
        type: Date
    }
}
var friendsModel = new mainModel(friendsSchema, 'friends');

module.exports = friendsModel;
