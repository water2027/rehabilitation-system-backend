const express = require('express');
const router = express.Router();
const UserController = require('../controller/user');

router.post('/sendcode', UserController.SendCode);
router.post('/login', UserController.Login);

module.exports = router;