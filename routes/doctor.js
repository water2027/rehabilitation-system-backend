const DoctorController = require('../controller/doctor');
const express = require('express');
const router = express.Router();

router.post('/getAuthPatient', DoctorController.getAuthPatient);

module.exports = router;