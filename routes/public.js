const PublicController = require('../controller/public');
const express = require('express');
const router = express.Router();

router.post('/patient/register', (req, res, next) =>
	PublicController.PatientRegister(req, res, next)
);
router.post('/doctor/register', (req, res, next) =>
	PublicController.DoctorRegister(req, res, next)
);
router.post('/auth/register', (req, res, next) =>
	PublicController.AuthRegister(req, res, next)
);
router.post('/refresh-token', (req, res, next) =>
	PublicController.RefreshToken(req, res, next)
);

module.exports = router;
