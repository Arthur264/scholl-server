const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const path = require("path");
var app = express();

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}
var db = require("./database/database");
var config = require("./config/config");
app.use(express.static(path.join(__dirname, 'public')));


var userRouter = require("./routes/api/userRouter");
var authRouter = require("./routes/auth/authRouter");
var classRouter = require("./routes/api/classRouter");
var friendsRouter = require("./routes/api/friendsRouter");
var chatroomRouter = require("./routes/api/chatroomRouter");
var chatMessageRouter = require("./routes/api/chatMessageRouter");
var errorHandler = require("./controllers/errorController");
var reqHandler = require("./controllers/reqController");
app.use(bodyParser({ limit: '50mb' }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/friends", friendsRouter);
app.use("/class", classRouter);
app.use("/chatroom", chatroomRouter);
app.use("/chatmessage", chatMessageRouter);
app.use(reqHandler);
app.use(errorHandler);
var server = require('http').Server(app);
db.connect(config.mongoserver, function(err) {
    if (err) {
        return console.log(err);
    }
    server.listen(8081, process.env.IP, function() {
        console.log("8081")
    });
});
require("./socket.js")(server)
