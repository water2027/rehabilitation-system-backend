const PatientRepository = require('../repository/patient');
const SurveyRepository = require('../repository/survey');

const DoctorService = require('../service/doctor');
const SurveyService = require('../service/survey');

const DoctorController = require('../controller/doctor');

const patientRepository = new PatientRepository();
const surveyRepository = new SurveyRepository();

const doctorService = new DoctorService(patientRepository);
const surveyService = new SurveyService(surveyRepository);

const doctorController = new DoctorController(doctorService, surveyService);

const express = require('express');
const router = express.Router();

router.post('/getAuthPatient', (req, res, next) =>
	doctorController.getAuthPatient(req, res, next)
);
router.post('/getDoctorPatient', (req, res, next) =>
	doctorController.getDoctorPatient(req, res, next)
);

router.post('/survey/create', (req, res, next) =>
	doctorController.createSurvey(req, res, next)
);
router.post('/survey/add-new-questions', (req, res, next) =>
	doctorController.addNewQuestions(req, res, next)
);
router.post('/survey/add-old-questions', (req, res, next) =>
	doctorController.addOldQuestions(req, res, next)
);
router.post('/survey/get-list', (req, res, next) =>
	doctorController.getSurveyList(req, res, next)
);
router.post('/survey/get-result', (req, res, next) =>
	doctorController.getSurveyResult(req, res, next)
);
router.post('/survey/add-patients', (req, res, next) =>
	doctorController.addPatientsToSurvey(req, res, next)
);
router.post('/survey/', (req, res, next) =>
	doctorController.getSurveyById(req, res, next)
);
router.post('/survey/advice', (req, res, next) =>
	doctorController.giveAdvice(req, res, next)
);

router.put('/survey/', (req, res, next) =>
	doctorController.updateSurvey(req, res, next)
);

router.delete('/survey/', (req, res, next) =>
	doctorController.deleteSurvey(req, res, next)
);
module.exports = router;
