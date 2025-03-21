
const EVENTS = {
    CONNECTION: 'connection',
    DISCONNECT: 'disconnect',
    SINGLE:{
        SEND: 'SINGLE:SEND',
    },
    GROUP:{
        CREATE: 'GROUP:CREATE',
        SEND: 'GROUP:SEND',
        JOIN: 'GROUP:JOIN',
        LEAVE: 'GROUP:LEAVE',
    },
    SOS:{
        SEND: 'SOS:SEND',
        ACCEPT: 'SOS:ACCEPT',
    },
}

module.exports = EVENTS