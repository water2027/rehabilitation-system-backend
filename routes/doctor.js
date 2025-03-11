const DoctorController = require('../controller/doctor');
const express = require('express');
const router = express.Router();

router.post('/getAuthPatient', DoctorController.getAuthPatient);

router.post('/getDoctorPatient', DoctorController.getDoctorPatient);

module.exports = router;