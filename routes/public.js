const PublicController = require('../controller/public');
const express = require('express');
const router = express.Router();

router.post('/patient/register', PublicController.PatientRegister)
router.post('/doctor/register', PublicController.DoctorRegister);
router.post('/auth/register', PublicController.AuthRegister);
router.post('/refresh-token', PublicController.RefreshToken);

module.exports = router;