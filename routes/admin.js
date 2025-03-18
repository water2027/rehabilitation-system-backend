const AdminRepository = require('../repository/admin');
const DoctorRepository = require('../repository/doctor');
const PatientRepository = require('../repository/patient');

const AdminService = require('../service/admin');

const AdminController = require('../controller/admin');
const express = require('express');

const adminRepository = new AdminRepository();
const doctorRepository = new DoctorRepository();
const patientRepository = new PatientRepository();

const adminService = new AdminService(
	adminRepository,
	doctorRepository,
	patientRepository
);

const adminController = new AdminController(adminService);

const router = express.Router();

router.post('/getAllUnauthPatient', (req, res, next) =>
	adminController.getAllUnauthPatient(req, res, next)
);
router.post('/getAllUnauthDoctor', (req, res, next) =>
	adminController.getAllUnauthDoctor(req, res, next)
);
router.post('/getAllUnauthAdmin', (req, res, next) =>
	adminController.getAllUnauthAdmin(req, res, next)
);

router.post('/getAllDoctor', (req, res, next) =>
	adminController.getAllDoctor(req, res, next)
);

router.post('/authPatient', (req, res, next) =>
	adminController.authPatient(req, res, next)
);
router.post('/authDoctor', (req, res, next) =>
	adminController.authDoctor(req, res, next)
);
router.post('/authAdmin', (req, res, next) =>
	adminController.authAdmin(req, res, next)
);

module.exports = router;
