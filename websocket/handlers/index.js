const groupHandler = require('./group');

/**
 * 
 * @param {import('socket.io').Server} io 
 * @param {import('socket.io').Socket} socket 
 */
function setupEventHandler(io, socket) {
    groupHandler(io, socket);
}

module.exports = setupEventHandler