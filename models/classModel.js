var mainModel = require("./mainModel.js");
var classSchema = {
    name: String,
    users: {
        type: String,
        res: "user"
    }
}
var classModel = new mainModel(classSchema, 'class');

module.exports = classModel;