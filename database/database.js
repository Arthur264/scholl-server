var MongoClient = require("mongodb").MongoClient;
const Mongod = require('mongod');
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var state = {
    db: null
};

var data = {
    "connect": connect,
    "get": get,
    "schema": Schema,
    "mongoose": mongoose
}

function connect(url, done) {
// Simply pass the port that you want a MongoDB server to listen on.
    if (state.db) {
        return done();
    };
   mongoose.connect(url, function(error, db) {
        if (error) {
            return done(error);
        }
        state.db = db;
        done();
    });
};

function get(){
	return state.db;
}


module.exports = data;