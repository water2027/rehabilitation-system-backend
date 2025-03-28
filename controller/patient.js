const { SuccessResponse } = require('../dto');

class PatientController {
	/**
	 * 
	 * @param {import('../service/patient')} PatientService 
	 * @param {import('../service/survey')} SurveyService 
	 */
	constructor(PatientService, SurveyService) {
		this.PatientService = PatientService;
		this.SurveyService = SurveyService;
	}
	async getAllAuthDoctor(req, res, next) {
		try {
			const { pageNumber, pageSize } = req.body;
			if (pageSize < 1 || pageNumber < 1) {
				throw new Error('Invalid page number or page size');
			}
			const result = await this.PatientService.getAllAuthDoctor({
				pageNumber,
				pageSize,
			});
			return SuccessResponse(res, result);
		} catch (err) {
			next(err);
		}
	}

	async getSurveyListForPatient(req, res, next) {
		try {
			const { id } = req.user;
			const { pageNumber, pageSize } = req.body;
			if (pageSize < 1 || pageNumber < 1) {
				throw new Error('Invalid page number or page size');
			}
			const result = await this.SurveyService.getSurveyListForPatient(
				id,
				pageNumber,
				pageSize
			);
			return SuccessResponse(res, result);
		} catch (err) {
			next(err);
		}
	}

	async getSurveyForPatient(req, res, next) {
		try {
			const { id } = req.user;
			const { surveyId } = req.body;
			const result = await this.SurveyService.getSurveyForPatient(
				id,
				surveyId
			);
			return SuccessResponse(res, result);
		} catch (err) {
			next(err);
		}
	}

	async submitSurvey(req, res, next) {
		try {
			const { id } = req.user;
			const { survey_id, answers } = req.body;
			const result = await this.SurveyService.submitSurvey(
				id,
				survey_id,
				answers
			);
			return SuccessResponse(res, result);
		} catch (err) {
			next(err);
		}
	}

	async getSurveyResult(req, res, next) {
		try {
			const { id } = req.user;
			const { surveyId } = req.body;
			const result = await this.SurveyService.getPatientSurveyResult(
				id,
				surveyId
			);
			return SuccessResponse(res, result);
		}
		catch (err) {
			next(err);
		}
	}
}

module.exports = PatientController;
