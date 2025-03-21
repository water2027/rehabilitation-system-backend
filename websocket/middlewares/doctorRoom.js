/**
 *  自动加入到医生群
 *  当患者发送SOS时，信息会发送到医生群
 */
async function DoctorRoomMiddleware(socket, next) {
    try {
        const { level } = socket.user;
        if (level === 2) {
            socket.join('doctors');
        }
        next();
    } catch (error) {
        console.error('Error in AuthMiddleware:', error);
        next(new Error('Authentication failed'));
    }
}

module.exports = DoctorRoomMiddleware;