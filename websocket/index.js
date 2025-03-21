const socketIO = require('socket.io');
const AuthMiddleware = require('./auth');

function setupWebsocket(server) {
    const io = socketIO(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });

    io.use(AuthMiddleware);

    io.on('connection', (socket) => {
        console.log(`用户${socket.user.id}已连接, 连接ID: ${socket.id}`);
        socket.on('disconnect', () => {
            console.log('Disconnected:', socket.id);
        });
    });

    return io;
}

module.exports = setupWebsocket;