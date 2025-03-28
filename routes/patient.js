const DoctorRepository = require('../repository/doctor');
const SurveyRepository = require('../repository/survey');

const PatientService = require('../service/patient');
const SurveyService = require('../service/survey');

const PatientController = require('../controller/patient');
const express = require('express');
const router = express.Router();

const doctorRepository = new DoctorRepository();
const surveyRepository = new SurveyRepository();

const patientService = new PatientService(doctorRepository);
const surveyService = new SurveyService(surveyRepository);

const patientController = new PatientController(patientService, surveyService);

router.post('/getAllAuthDoctor', (req, res, next) =>
	patientController.getAllAuthDoctor(req, res, next)
);

router.post('/survey/get-list', (req, res, next) =>
	patientController.getSurveyListForPatient(req, res, next)
);

router.post('/survey/', (req, res, next) =>
	patientController.getSurveyForPatient(req, res, next)
);

router.post('/survey/answer', (req, res, next) =>
	patientController.submitSurvey(req, res, next)
);

router.post('/survey/result', (req, res, next) =>
	patientController.getSurveyResult(req, res, next)
);

router.post('/survey/get-advice', (req, res, next) =>
	patientController.getAdvice(req, res, next)
);

module.exports = router;
