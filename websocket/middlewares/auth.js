const eventBus = require('../../utils/eventBus');

async function AuthMiddleware(socket, next) {
	try {
		const token =
			socket.handshake.query.token || socket.handshake.auth.token;
		if (!token) {
			throw new Error('Authentication failed');
		}
		const resp = {};
		await eventBus.emit('auth:verify', { token }, resp);
        const { id, level } = resp;
        socket.user = { id, level };
        next();
	} catch (error) {
		console.error('Error in AuthMiddleware:', error);
		next(new Error('Authentication failed'));
	}
}

module.exports = AuthMiddleware;