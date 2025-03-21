const EVENTS = require('../events');

function sosHandler(io, socket) {
	io.on(EVENTS.SOS.SEND, (data) => {
		io.to('doctors').emit(EVENTS.SOS.SEND, {
			user: socket.user.id,
			message: data.message, // 前端应该发送地点信息
		});
	});

	// 医生接受SOS
	// 通知所有医生和患者
	io.on(EVENTS.SOS.ACCEPT, (data) => {
		io.to('doctors').emit(EVENTS.SOS.RESPONSE, {
			user: socket.user.id,
			message: data.message,
		});
		io.to(data.target).emit(EVENTS.SOS.RESPONSE, {
			user: socket.user.id,
			message: data.message,
		});
	});
}

module.exports = sosHandler;
