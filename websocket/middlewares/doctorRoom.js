/**
 *  自动加入到医生群
 *  当患者发送SOS时，信息会发送到医生群
 */
async function DoctorRoomMiddleware(socket, next) {
        const { level } = socket.user;
        if (level === 2) {
            socket.join('doctors');
            console.log('doctor joined doctors room', socket.user.id);
        }
        next();
}

module.exports = DoctorRoomMiddleware;