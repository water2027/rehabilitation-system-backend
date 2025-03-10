const DoctorController = require('../controller/doctor');
const express = require('express');
const router = express.Router();

router.post('/public/doctor/register', DoctorController.Register);

module.exports = router;