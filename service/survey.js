const SurveyRepository = require('../repository/survey');
class SurveyService {
	constructor() {
		this.SurveyRepository = new SurveyRepository();
	}
	// doctor

	/** 创建问卷
	 * @param {string} id - 医生id
	 * @param {Object} data - 问卷基础信息
	 * @param {string} data.title - 标题
	 * @param {string} data.description - 描述
	 * @param {string} data.start_date - 开始时间
	 * @param {string} data.end_date - 结束时间
	 * @param {boolean} [data.is_active=true] - 是否启用
	 * @param {Object[]} questions - 问卷问题数组
	 * @param {string} questions[].title - 问题题干
	 * @param {'SingleChoice'| 'MultipleChoice'| 'Text'} questions[].question_type - 问题类型
	 * @param {boolean} [questions[].is_required=true] - 是否必填，默认为true
	 * @param {Object[]} [questions[].options] - 选择题选项
	 * @param {string} [questions[].options[].text] - 选项文本
	 * @param {number} [questions[].min] - 最少选几项 (对于MultipleChoice)
	 * @param {number} [questions[].max] - 最多选几项 (对于MultipleChoice)
	 */
	async createSurvey(id, data, questions) {
		await this.SurveyRepository.createSurvey(
			{
				doctor_id: id,
				...data,
			},
			questions
		);
		return 'OK';
	}

	/** 添加问题到问卷
	 * @param {string} id - 医生id
	 * @param {string} surveyId
	 * @param {Object[]} questions - 问卷问题数组
	 * @param {string} questions[].title - 问题题干
	 * @param {'SingleChoice'| 'MultipleChoice'| 'Text'} questions[].question_type - 问题类型
	 * @param {boolean} [questions[].is_required=true] - 是否必填，默认为true
	 * @param {Object[]} [questions[].options] - 选择题选项
	 * @param {string} [questions[].options[].text] - 选项文本
	 * @param {number} [questions[].min] - 最少选几项 (对于MultipleChoice)
	 * @param {number} [questions[].max] - 最多选几项 (对于MultipleChoice)
	 */
	async addNewQuestions(id, surveyId, questions) {
		const survey = await this.SurveyRepository.getSurveyById(surveyId);
		if (survey.doctor_id !== id) {
			throw new Error('无权限');
		}
		await this.SurveyRepository.addNewQuestionToSurvey(id, surveyId, questions);
		return 'OK';
	}

	async addOldQuestions(id, surveyId, questions) {
		const survey = await this.SurveyRepository.getSurveyById(surveyId);
		if (survey.doctor_id !== id) {
			throw new Error('无权限');
		}
		await this.SurveyRepository.addOldQuestionToSurvey(surveyId, questions);
		return 'OK';
	}

	/** 获取医生创建的问卷列表
	 *
	 * @param {string} doctorId
	 * @returns
	 */
	async getSurveyList(doctorId, info) {
		const surveyList = await this.SurveyRepository.getSurveyByDoctorId(
			doctorId,
			info
		);
		console.log(surveyList);
		return surveyList;
	}

	/** 获取医生的问卷结果，只能获取自己的问卷结果
	 *
	 * @param {string} id - 医生id
	 * @param {string} surveyId - 问卷id
	 * @returns
	 */
	async getSurveyResult(id, surveyId) {
		const survey = await this.SurveyRepository.getSurveyById(surveyId);
		if (survey.doctor_id !== id) {
			throw new Error('无权限');
		}
		const result = await this.SurveyRepository.getSurveyResponses(surveyId);
		return result;
	}

	/** 删除问卷
	 *
	 * @param {string} surveyId
	 * @returns
	 */
	async deleteSurvey(id, surveyId) {
		const survey = await this.SurveyRepository.getSurveyById(surveyId);
		if (survey.doctor_id !== id) {
			throw new Error('无权限');
		}
		await this.SurveyRepository.deleteSurvey(surveyId);
		return 'OK';
	}

	/** 更新问卷，只会覆盖传入的字段
	 *
	 * @param {string} id - 医生id
	 * @param {string} surveyId 问卷id
	 * @param {Object} data - Data to update
	 * @param {string} data.title 标题
	 * @param {string} data.description 描述
	 * @param {Date} data.start_date 开始时间
	 * @param {Date} data.end_date 结束时间
	 * @param {boolean} data.is_active 是否启用
	 * @returns
	 */
	async updateSurvey(id, surveyId, data) {
		const survey = await this.SurveyRepository.getSurveyById(surveyId);
		if (survey.doctor_id !== id) {
			throw new Error('无权限');
		}
		await this.SurveyRepository.updateSurvey(surveyId, data);
		return 'OK';
	}

	/** 让患者填写问卷
	 * @param {string} id - 医生id
	 * @param {string} surveyId - 问卷id
	 * @param {string[]} patients - 患者id数组
	 */
	async addPatientsToSurvey(id, surveyId, patients) {
		const survey = await this.SurveyRepository.getSurveyById(id);
		if (survey.doctor_id != id) {
			throw new Error('无权限');
		}
		await this.SurveyRepository.addPatientsToSurvey(surveyId, patients);
		return 'OK';
	}

	/** 根据问卷id获取问卷详情
	 *
	 * @param {string} surveyId
	 * @returns
	 */
	async getSurveyById(surveyId) {
		const survey = await this.SurveyRepository.getSurveyById(surveyId);
		return survey;
	}

	// patient

	async getSurveyListForPatient(id, pageNumber, pageSize) {
		const result = await this.SurveyRepository.getSurveyListForPatient(id, {
			pageNumber,
			pageSize,
		});
		return result;
	}

	async getSurveyForPatient(id, surveyId) {
		const survey = await this.SurveyRepository.getSurveyById(surveyId);
		if (survey.patient_id !== id) {
			throw new Error('无权限');
		}
		return survey;
	}

	/** 提交问卷
	 *
	 * @param {string} id - 患者id
	 * @param {string} surveyId - 问卷id
	 * @param {Object[]} answers - 答卷
	 * @returns
	 */
	async submitSurvey(id, surveyId, answers) {
		await this.SurveyRepository.submitSurveyResponse(id, surveyId, answers);
		return 'OK';
	}

	/** 获取患者的问卷结果
	 *
	 * @param {string} id - 患者id
	 * @param {string} surveyId - 问卷id
	 * @returns
	 */
	async getPatientSurveyResult(patient_id, surveyId) {
		const result = await this.SurveyRepository.getPatientSurveyResponse(
			patient_id,
			surveyId
		);
		if (result.patient_id != patient_id) {
			throw new Error('无权限');
		}
		return result;
	}
}

module.exports = SurveyService;
