const express = require('express');
const router = express.Router();
const UserController = require('../controller/user');

router.post('/sendcode', UserController.SendCode);
router.post('/login', UserController.Login);
router.post('/auth/realname', UserController.RealNameAuth);
router.post('/auth/refresh-token', UserController.RefreshToken);

module.exports = router;