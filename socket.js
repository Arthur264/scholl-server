var chatMessageModel = require("./models/chatModel").chatMessageModel;
var chatRoomModel = require("./models/chatModel").chatRoomModel;
module.exports = function(app) {
    var io = require('socket.io').listen(app);
    // var users = [];
    var connections = [];
    io.on('connection', function(socket) {
        connections.push(socket.id);
        // console.log('connections', connections);
        socket.on('disconnect', function(data) {
            connections.slice(connections.indexOf(socket), 1);
        })
        socket.on('new-friend', (id) => {
            // console.log(id);
        });
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
