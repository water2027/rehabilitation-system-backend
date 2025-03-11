const AuthController = require('../controller/auth');
const express = require('express');
const router = express.Router();

router.post('/getAllUnauthPatient', AuthController.getAllUnauthPatient);
router.post('/getAllUnauthDoctor', AuthController.getAllUnauthDoctor);
router.post('/getAllUnauthAuth', AuthController.getAllUnauthAuth);

router.post('/getAllDoctor', AuthController.getAllDoctor);

router.post('/authPatient', AuthController.authPatient);
router.post('/authDoctor', AuthController.authDoctor);
router.post('/authAuth', AuthController.authAuth);

module.exports = router;