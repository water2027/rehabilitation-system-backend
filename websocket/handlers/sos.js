const EVENTS = require('../events');

/**
 * 
 * @param {import('socket.io').Server} io 
 * @param {import('socket.io').Socket} socket 
 */
function sosHandler(io, socket) {
	io.on(EVENTS.SOS.SEND, (data) => {
		io.to('doctors').emit(EVENTS.SOS.SEND, {
			// @ts-ignore
			user: socket.user.id,
			message: data.message, // 前端应该发送地点信息
		});
	});

	// 医生接受SOS
	// 通知所有医生
	io.on(EVENTS.SOS.ACCEPT, (data) => {
		io.to('doctors').emit(EVENTS.SOS.RESPONSE, {
			// @ts-ignore
			user: socket.user.id,
			message: data.message,
		});
		io.to(data.target).emit(EVENTS.SOS.RESPONSE, {
			// @ts-ignore
			user: socket.user.id,
			message: data.message,
		});
	});
}

module.exports = sosHandler;
