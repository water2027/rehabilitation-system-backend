
const EVENTS = {
    CONNECTION: 'connection',
    DISCONNECT: 'disconnect',
    SINGLE:{
        SEND: 'SINGLE:SEND',
    },
    GROUP:{
        SEND: 'GROUP:SEND',
        JOIN: 'GROUP:JOIN',
    },
    SOS:{
        SEND: 'SOS:SEND',
        ACCEPT: 'SOS:ACCEPT',
        RESPONSE: 'SOS:RESPONSE',
    },
}

module.exports = EVENTS