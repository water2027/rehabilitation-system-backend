const EVENTS = require('../events');

function groupHandler(io, socket) {
	// join
	// 前端查询用户所在的群组
	// 然后加入到群组
	// 后端应该存储用户所在的群组到数据库
	io.on(EVENTS.GROUP.JOIN, (data) => {
		socket.join(data.groupId);
		io.to(data.groupId).emit(EVENTS.GROUP.JOIN, {
			user: socket.user.id,
			groupId: data.target,
		});
	});
	//send
	io.on(EVENTS.GROUP.SEND, (data) => {
		io.to(data.groupId).emit(EVENTS.GROUP.SEND, {
			user: socket.user.id,
			groupId: data.target,
			message: data.message,
		});
	});
}

module.exports = groupHandler;
