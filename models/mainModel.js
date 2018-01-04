function MainModel(data, nameColection) {
    let mongoose = require('mongoose');
    let Schema = mongoose.Schema;
    let colectionSchema = new Schema(data);
    let model = mongoose.model(nameColection, colectionSchema);

    this.models = model;

    this.create = function(data, cb) {
        let newdata = model(data);
        newdata.save(function(err, data) {
            cb(err, data);
        })

    };
    this.get = function(data, cb) {
        model.find(data)
            .limit(12)
            .exec(function(err, data) {
                cb(err, data);
            });

    };
    this.change = function(id, data, cb) {
        model.findByIdAndUpdate(id, data, function(err, data) {
            cb(err, data);
        });
    };
    this.delete = function(id, cb) {
        model.find({ id: id }, function(err, data) {
            var error = [err];
            data.remove(function(err) {
                error.push(err);
            });
            cb(error, data);
        });
    };
};
module.exports = MainModel;
