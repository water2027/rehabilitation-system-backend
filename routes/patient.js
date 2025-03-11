const PatientController = require('../controller/patient');
const express = require('express');
const router = express.Router();

router.post('/getAllAuthDoctor', (req, res, next) =>
	PatientController.getAllAuthDoctor(req, res, next)
);

module.exports = router;
