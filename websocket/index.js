const { Server } = require('socket.io');
const AuthMiddleware = require('./middlewares/auth');
const DoctorRoomMiddleware = require('./middlewares/doctorRoom');
const setupEventHandler = require('./handlers');
// const eventBus = require('../utils/eventBus');

/**
 * websocket
 * 前端信息格式
 *  - target 目标ID
 *  - message 消息内容
 */


function setupWebsocket(server) {
	const io = new Server(server, {
		cors: {
			origin: '*',
			methods: ['GET', 'POST'],
		},
	});

	io.use(AuthMiddleware);
	io.use(DoctorRoomMiddleware);
	
	io.on('connection', (socket) => {
		// @ts-ignore
		console.log(`用户${socket.user.id}已连接, 连接ID: ${socket.id}`);
		
		setupEventHandler(io, socket);

		socket.on('disconnect', () => {
			console.log('Disconnected:', socket.id);
		});
	});

	return io;
}

module.exports = setupWebsocket;
