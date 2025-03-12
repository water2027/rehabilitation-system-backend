const PatientController = require('../controller/patient');
const express = require('express');
const router = express.Router();

router.post('/getAllAuthDoctor', (req, res, next) =>
	PatientController.getAllAuthDoctor(req, res, next)
);

router.post('/survey/get-list', (req, res, next) =>
	PatientController.getSurveyListForPatient(req, res, next)
);

router.post('/survey/', (req, res, next) =>
	PatientController.getSurveyForPatient(req, res, next)
);

router.post('/survey/answer', (req, res, next) =>
	PatientController.submitSurvey(req, res, next)
);

router.post('/survey/result', (req, res, next) =>
	PatientController.getSurveyResult(req, res, next)
);

module.exports = router;
