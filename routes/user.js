const express = require('express');
const router = express.Router();
const UserController = require('../controller/user');

router.post('/sendcode', UserController.SendCode);
router.post('/login', UserController.Login);
router.post('/public/refresh-token', UserController.RefreshToken);

module.exports = router;