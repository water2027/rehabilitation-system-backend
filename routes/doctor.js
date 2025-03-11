const DoctorController = require('../controller/doctor');
const express = require('express');
const router = express.Router();

router.post('/getAuthPatient', (req, res, next) =>
	DoctorController.getAuthPatient(req, res, next)
);
router.post('/getDoctorPatient', (req, res, next) =>
	DoctorController.getDoctorPatient(req, res, next)
);

router.post('/survey/create', (req, res, next) =>
	DoctorController.createSurvey(req, res, next)
);
router.post('/survey/add-new-questions', (req, res, next) =>
	DoctorController.addNewQuestions(req, res, next)
);
router.post('/survey/add-old-questions', (req, res, next) =>
	DoctorController.addOldQuestions(req, res, next)
);	
router.post('/survey/get-list', (req, res, next) =>
	DoctorController.getSurveyList(req, res, next)
);
router.post('/survey/get-result', (req, res, next) =>
	DoctorController.getSurveyResult(req, res, next)
);
router.post('/survey/add-patients', (req, res, next) =>
	DoctorController.addPatientsToSurvey(req, res, next)
);
router.post('/survey/', (req, res, next) =>
	DoctorController.getSurveyById(req, res, next)
);

router.put('/survey/', (req, res, next) =>
	DoctorController.updateSurvey(req, res, next)
);

router.delete('/survey/', (req, res, next) =>
	DoctorController.deleteSurvey(req, res, next)
);
module.exports = router;
