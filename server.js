const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const path = require("path");
// const methodOverride = require('method-override');

var app = express();

var corsOptions = {
    origin: 'http://school-artyr264.c9users.io',
    optionsSuccessStatus: 200
}
var db = require("./database/database");
var config = require("./config/config");
app.use(express.static(path.join(__dirname, 'public')));


var userRouter = require("./routes/api/userRouter");
var authRouter = require("./routes/auth/authRouter");
var classRouter = require("./routes/api/classRouter");

var errorHandler = require("./controllers/errorController");
app.use(bodyParser({ limit: '50mb' }));

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(methodOverride());
app.use(cors(corsOptions));
app.use(cookieParser());


app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/class", classRouter);
app.use(errorHandler);

db.connect(config.mongoserver, function(err) {
    if (err) {
        return console.log(err);
    }
    app.listen(8081, process.env.IP, function() {
        console.log("8081")
    });
});
