const express = require('express');
const router = express.Router();
const UserController = require('../controller/user');

router.post('/sendcode', (req, res, next) =>
	UserController.SendCode(req, res, next)
);
router.post('/login', (req, res, next) => UserController.Login(req, res, next));

module.exports = router;
