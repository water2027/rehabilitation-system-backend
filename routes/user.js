const UserRepository = require('../repository/user');

const UserService = require('../service/user');

const UserController = require('../controller/user');
const express = require('express');
const router = express.Router();

const userRepository = new UserRepository();

const userService = new UserService(userRepository);

const userController = new UserController(userService);

router.post('/sendcode', (req, res, next) =>
	userController.SendCode(req, res, next)
);
router.post('/login', (req, res, next) => userController.Login(req, res, next));

module.exports = router;
