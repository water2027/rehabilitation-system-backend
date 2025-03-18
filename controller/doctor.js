const { SuccessResponse } = require('../dto');


class DoctorController {
	constructor(DoctorService, SurveyService) {
		this.DoctorService = DoctorService;
		this.SurveyService = SurveyService;
	}
	async getAuthPatient(req, res, next) {
		try {
			const { pageNumber, pageSize } = req.body;
			if (pageSize < 1 || pageNumber < 1) {
				throw new Error('Invalid page number or page size');
			}
			const result = await this.DoctorService.getAuthPatient({
				pageNumber,
				pageSize,
			});
			return SuccessResponse(res, result);
		} catch (err) {
			next(err);
		}
	}

	/**
	 * 获取某医生的患者列表
	 */
	async getDoctorPatient(req, res, next) {
		try {
			const { id: doctorId } = req.user;
			const { pageNumber, pageSize } = req.body;
			if (pageSize < 1 || pageNumber < 1) {
				throw new Error('Invalid page number or page size');
			}
			const result = await this.DoctorService.getDoctorPatient({
				doctorId,
				pageNumber,
				pageSize,
			});
			return SuccessResponse(res, result);
		} catch (err) {
			next(err);
		}
	}

	/**
	 * 创建问卷
	 */
	async createSurvey(req, res, next) {
		try {
			const { id } = req.user;
			const { data, questions } = req.body;
			const result = await this.SurveyService.createSurvey(
				id,
				data,
				questions
			);
			return SuccessResponse(res, result);
		} catch (err) {
			next(err);
		}
	}

	/**
	 * 添加新问题到问卷
	 */
	async addNewQuestions(req, res, next) {
		try {
			const { id } = req.user;
			const { survey_id, questions } = req.body;
			const result = await this.SurveyService.addNewQuestions(
				id,
				survey_id,
				questions
			);
			return SuccessResponse(res, result);
		} catch (err) {
			next(err);
		}
	}

	/**
	 * 复用已有问题到问卷
	 */
	async addOldQuestions(req, res, next) {
		try {
			const { id } = req.user;
			const { surveyId, questions } = req.body;
			const result = this.SurveyService.addOldQuestions(
				id,
				surveyId,
				questions
			);
			return SuccessResponse(res, result);
		} catch (err) {
			next(err);
		}
	}

	/**
	 * 获取医生创建的问卷列表
	 */
	async getSurveyList(req, res, next) {
		try {
			const { id } = req.user;
			const { pageNumber, pageSize } = req.body;
			if (pageSize < 1 || pageNumber < 1) {
				throw new Error('Invalid page number or page size');
			}
			const result = await this.SurveyService.getSurveyList(id, { pageNumber, pageSize });
			return SuccessResponse(res, result);
		} catch (err) {
			next(err);
		}
	}

	/**
	 * 获取医生的问卷结果，只能获取自己的问卷结果
	 */
	async getSurveyResult(req, res, next) {
		try {
			const { id } = req.user;
			const { surveyId } = req.body;
			const result = await this.SurveyService.getSurveyResult(id, surveyId);
			return SuccessResponse(res, result);
		} catch (err) {
			next(err);
		}
	}

	/**
	 * 删除问卷
	 */
	async deleteSurvey(req, res, next) {
		try {
			const { id } = req.user;
			const { surveyId } = req.body;
			const result = await this.SurveyService.deleteSurvey(id, surveyId);
			return SuccessResponse(res, result);
		} catch (err) {
			next(err);
		}
	}

	/**
	 * 更新问卷基础信息
	 */
	async updateSurvey(req, res, next) {
		try {
			const { id } = req.user;
			const { surveyId, data } = req.body;
			const result = this.SurveyService.updateSurvey(id, surveyId, data);
			return SuccessResponse(res, result);
		} catch (err) {
			next(err);
		}
	}

	/**
	 * 让患者填写问卷
	 */
	async addPatientsToSurvey(req, res, next) {
		try {
			const { id } = req.user;
			const { surveyId, patients } = req.body;
			const result = await this.SurveyService.addPatientsToSurvey(
				id,
				surveyId,
				patients
			);
			return SuccessResponse(res, result);
		} catch (err) {
			next(err);
		}
	}

	/**
	 * 获取问卷详情
	 */
	async getSurveyById(req, res, next) {
		try {
			const { surveyId } = req.body;
			const result = await this.SurveyService.getSurveyById(surveyId);
			return SuccessResponse(res, result);
		} catch (err) {
			next(err);
		}
	}
}

module.exports = DoctorController;
