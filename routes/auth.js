const AuthController = require('../controller/auth');
const express = require('express');
const router = express.Router();

router.post('/auth/getAllUnauthDoctor', AuthController.getAllUnauthDoctor);
router.post('/auth/getAllAuthDoctor', AuthController.getAllAuthDoctor);
router.post('/auth/getAllDoctor', AuthController.getAllDoctor);
router.post('/auth/authDoctor', AuthController.authDoctor);
module.exports = router;