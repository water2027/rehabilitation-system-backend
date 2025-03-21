const groupHandler = require('./group');

function setupEventHandler(io, socket) {
    groupHandler(io, socket);
}

module.exports = setupEventHandler