const EVENTS = require('../events');

function groupHandler(io, socket) {
    // join
    io.on(EVENTS.GROUP.JOIN,(data)=>{
        socket.join(data.groupId);
        io.to(data.groupId).emit(EVENTS.GROUP.JOIN,{
            user:socket.user.id,
            groupId:data.groupId
        });
    })
    //leave
    io.on(EVENTS.GROUP.LEAVE,(data)=>{
        socket.leave(data.groupId);
        io.to(data.groupId).emit(EVENTS.GROUP.LEAVE,{
            user:socket.user.id,
            groupId:data.groupId
        });
    })
    //send
    io.on(EVENTS.GROUP.SEND,(data)=>{
        io.to(data.groupId).emit(EVENTS.GROUP.SEND,{
            user:socket.user.id,
            groupId:data.groupId,
            message:data.message
        });
    })
}

module.exports = groupHandler;