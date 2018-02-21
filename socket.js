var chatMessageModel = require("./models/chatModel").chatMessageModel;
var chatRoomModel = require("./models/chatModel").chatRoomModel;
module.exports = function(app) {
    var io = require('socket.io').listen(app);
    var users = [];
    io.on('connection', function(socket) {
        users.push(socket.id);
        socket.on('disconnect', function(id) {
            users.slice(users.indexOf(id), 1);
            console.log(users, id)
        })
        socket.on('new-friend', (id) => {});
        socket.on('new-message', (idroom, mes, id) => {
            chatRoomModel.find({ _id: idroom }, function(err, results) {
                if (err) {
                    return socket.emit('new-message', { s: 0 });
                }
                if (results) {
                    chatMessageModel.create({ idRoom: idroom, message: mes, status: false, creator_id: id }, function(err, results2) {
                        if (err) {
                            return socket.emit('new-message', { s: 0 });
                        }
                        // socket.broadcast.to(idroom).emit('new-message', { s: 1, data: results2 })
                        io.sockets.in(idroom).emit('new-message', { s: 1, data: results2 })
                    })
                }
            })
        });
        socket.on('new-room', (idroom) => {
            chatRoomModel.find({ _id: idroom }, function(err, results) {
                if (err) {
                    return socket.emit('new-room', { s: 0 });
                }
                if (results) {
                    socket.join(idroom);
                    // console.log("dfg", socket.rooms)
                }
            })
        });
    });

}
