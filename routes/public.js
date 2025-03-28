const DoctorRepository = require('../repository/doctor');
const UserRepository = require('../repository/user');
const AdminRepository = require('../repository/admin');
const PatientRepository = require('../repository/patient');

const PublicService = require('../service/public');

const PublicController = require('../controller/public');

const publicService = new PublicService(
	new AdminRepository(),
	new DoctorRepository(),
	new PatientRepository(),
	new UserRepository()
);

const publicController = new PublicController(publicService);

const express = require('express');
const router = express.Router();

router.post('/patient/register', (req, res, next) =>
	publicController.PatientRegister(req, res, next)
);
router.post('/doctor/register', (req, res, next) =>
	publicController.DoctorRegister(req, res, next)
);
router.post('/auth/register', (req, res, next) =>
	publicController.AuthRegister(req, res, next)
);
router.post('/refresh-token', (req, res, next) =>
	publicController.RefreshToken(req, res, next)
);

module.exports = router;
