let mongoose = require('mongoose');
let Schema = mongoose.Schema;
var classSchema = new Schema({
    name: String,
    users: {
        type: String,
        res: "user"
    }
})
var classModel = mongoose.model('class', classSchema);
module.exports = classModel;
