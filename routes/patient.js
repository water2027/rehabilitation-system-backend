const PatientController = require('../controller/patient');
const express = require('express');
const router = express.Router();

router.post('/getAllAuthDoctor', PatientController.getAllAuthDoctor);

module.exports = router;