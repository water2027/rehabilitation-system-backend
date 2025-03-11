const AuthController = require('../controller/auth');
const express = require('express');
const router = express.Router();

router.post('/getAllUnauthPatient', (req, res, next) =>
	AuthController.getAllUnauthPatient(req, res, next)
);
router.post('/getAllUnauthDoctor', (req, res, next) =>
	AuthController.getAllUnauthDoctor(req, res, next)
);
router.post('/getAllUnauthAuth', (req, res, next) =>
	AuthController.getAllUnauthAuth(req, res, next)
);

router.post('/getAllDoctor', (req, res, next) =>
	AuthController.getAllDoctor(req, res, next)
);

router.post('/authPatient', (req, res, next) =>
	AuthController.authPatient(req, res, next)
);
router.post('/authDoctor', (req, res, next) =>
	AuthController.authDoctor(req, res, next)
);
router.post('/authAuth', (req, res, next) =>
	AuthController.authAuth(req, res, next)
);

module.exports = router;
