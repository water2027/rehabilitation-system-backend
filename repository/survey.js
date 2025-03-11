const {
	Survey,
	SingleChoiceQuestion,
	MultipleChoiceQuestion,
	TextQuestion,
	Response,
} = require('../model/survey/survey');

class SurveyRepository {
	/**
	 * Create a new survey
	 * @param {Object} surveyData - 问卷基础信息
	 * @param {string} surveyData.title - 标题
	 * @param {string} surveyData.description - 描述
	 * @param {string} surveyData.start_date - 开始时间
	 * @param {string} surveyData.end_date - 结束时间
	 * @param {boolean} [surveyData.is_active=true] - 是否启用
	 * @param {Object[]} questions - 问卷问题数组
	 * @param {string} questions[].title - 问题题干
	 * @param {'SingleChoice'| 'MultipleChoice'| 'Text'} questions[].question_type - 问题类型
	 * @param {boolean} [questions[].is_required=true] - 是否必填，默认为true
	 * @param {Object[]} [questions[].options] - 选择题选项
	 * @param {string} [questions[].options[].text] - 选项文本
	 * @param {number} [questions[].min] - 最少选几项 (对于MultipleChoice)
	 * @param {number} [questions[].max] - 最多选几项 (对于MultipleChoice)
	 * @returns {Promise<Object>} - Created survey
	 */
	async createSurvey(surveyData, questions = []) {
		try {
			const survey = new Survey({
				title: surveyData.title,
				description: surveyData.description,
				start_date: surveyData.start_date,
				end_date: surveyData.end_date,
				is_active:
					surveyData.is_active !== undefined
						? surveyData.is_active
						: true,
			});

			if (questions.length > 0) {
				survey.questions = await this.createQuestions(questions);
			}

			await survey.save();
			return survey;
		} catch (error) {
			throw new Error(`Failed to create survey: ${error.message}`);
		}
	}

	/**
	 * Create questions of different types
	 * @param {Object[]} questions - 问卷问题数组
	 * @param {string} questions[].title - 问题题干
	 * @param {'SingleChoice'| 'MultipleChoice'| 'Text'} questions[].question_type - 问题类型
	 * @param {boolean} [questions[].is_required=true] - 是否必填，默认为true
	 * @param {Object[]} [questions[].options] - 选择题选项
	 * @param {string} [questions[].options[].text] - 选项文本
	 * @param {number} [questions[].min] - 最少选几项 (对于MultipleChoice)
	 * @param {number} [questions[].max] - 最多选几项 (对于MultipleChoice)
	 * @returns {Promise<Array>} - Array of created question objects
	 */
	async createQuestions(questionsData) {
		try {
			const questions = [];

			for (const questionData of questionsData) {
				let question;

				switch (questionData.question_type) {
					case 'SingleChoice':
						question = new SingleChoiceQuestion({
							title: questionData.title,
							is_required:
								questionData.is_required !== undefined
									? questionData.is_required
									: true,
							options: questionData.options || [],
						});
						break;

					case 'MultipleChoice':
						question = new MultipleChoiceQuestion({
							title: questionData.title,
							is_required:
								questionData.is_required !== undefined
									? questionData.is_required
									: true,
							options: questionData.options || [],
							min: questionData.min,
							max: questionData.max,
						});
						break;

					case 'Text':
						question = new TextQuestion({
							title: questionData.title,
							is_required:
								questionData.is_required !== undefined
									? questionData.is_required
									: true,
						});
						break;

					default:
						throw new Error(
							`Unsupported question type: ${questionData.question_type}`
						);
				}

				questions.push(question);
			}

			return questions;
		} catch (error) {
			throw new Error(`Failed to create questions: ${error.message}`);
		}
	}

	/**
	 * Get survey by ID
	 * @param {string} surveyId - ID of the survey to retrieve
	 * @returns {Promise<Object>} - Survey object
	 */
	async getSurveyById(surveyId) {
		try {
			const survey = await Survey.findOne({ survey_id: surveyId });
			return survey;
		} catch (error) {
			throw new Error(`Failed to get survey: ${error.message}`);
		}
	}

	/**
	 * Get all active surveys
	 * @returns {Promise<Array>} - Array of active surveys
	 */
	async getActiveSurveys() {
		try {
			const surveys = await Survey.find({
				is_active: true,
				start_date: { $lte: new Date() },
				end_date: { $gte: new Date() },
			});
			return surveys;
		} catch (error) {
			throw new Error(`Failed to get active surveys: ${error.message}`);
		}
	}

	/**
	 * Update a survey
	 * @param {string} surveyId - ID of the survey to update
	 * @param {Object} updateData - Data to update
	 * @param {string} updateData.title 标题
	 * @param {string} updateData.description 描述
	 * @param {string} updateData.start_date 开始时间
	 * @param {string} updateData.end_date 结束时间
	 * @param {string} updateData.is_active 是否启用
	 * @param {Object[]} updateData.questions - 问卷问题数组
	 * @param {string} updateData.questions[].title - 问题题干
	 * @param {'SingleChoice'| 'MultipleChoice'| 'Text'} updateData.questions[].question_type - 问题类型
	 * @param {boolean} [updateData.questions[].is_required=true] - 是否必填，默认为true
	 * @param {Object[]} [updateData.questions[].options] - 选择题选项
	 * @param {string} [updateData.questions[].options[].text] - 选项文本
	 * @param {number} [updateData.questions[].min] - 最少选几项 (对于MultipleChoice)
	 * @param {number} [updateData.questions[].max] - 最多选几项 (对于MultipleChoice)
	 * @returns {Promise<Object>} - Updated survey
	 */
	async updateSurvey(surveyId, updateData) {
		try {
			const survey = await Survey.findOne({ survey_id: surveyId });

			if (!survey) {
				throw new Error('Survey not found');
			}

			// Update basic survey properties
			if (updateData.title) survey.title = updateData.title;
			if (updateData.description)
				survey.description = updateData.description;
			if (updateData.start_date)
				survey.start_date = updateData.start_date;
			if (updateData.end_date) survey.end_date = updateData.end_date;
			if (updateData.is_active !== undefined)
				survey.is_active = updateData.is_active;

			// Handle updating questions if provided
			if (updateData.questions) {
				// Replace existing questions with new ones
				survey.questions = await this.createQuestions(
					updateData.questions
				);
			}

			await survey.save();
			return survey;
		} catch (error) {
			throw new Error(`Failed to update survey: ${error.message}`);
		}
	}

	/**
	 * Delete a survey
	 * @param {string} surveyId - ID of the survey to delete
	 * @returns {Promise<boolean>} - Success status
	 */
	async deleteSurvey(surveyId) {
		try {
			const result = await Survey.deleteOne({ survey_id: surveyId });
			return result.deletedCount > 0;
		} catch (error) {
			throw new Error(`Failed to delete survey: ${error.message}`);
		}
	}

	/**
	 * 添加一个问题到已有的问卷
	 * @param {string} surveyId - ID of the survey
	 * @param {Object} questionData - Question data to add
	 * @param {string} questionData.title - 问题题干
	 * @param {'SingleChoice'| 'MultipleChoice'| 'Text'} questionData.question_type - 问题类型
	 * @param {boolean} [questionData.is_required=true] - 是否必填，默认为true
	 * @param {Object[]} [questionData.options] - 选择题选项
	 * @param {string} [questionData.options[].text] - 选项文本
	 * @param {number} [questionData.min] - 最少选几项 (对于MultipleChoice)
	 * @param {number} [questionData.max] - 最多选几项 (对于MultipleChoice)
	 * @returns {Promise<Object>} - Updated survey
	 */
	async addQuestionToSurvey(surveyId, questionData) {
		try {
			const survey = await Survey.findOne({ survey_id: surveyId });

			if (!survey) {
				throw new Error('Survey not found');
			}

			const questions = await this.createQuestions([questionData]);
			survey.questions.push(questions[0]);

			await survey.save();
			return survey;
		} catch (error) {
			throw new Error(
				`Failed to add question to survey: ${error.message}`
			);
		}
	}

	/**
	 * 提交问卷
	 * @param {string} surveyId - ID of the survey
	 * @param {string} patientId - ID of the patient
	 * @param {Array} answers - Array of answer objects
	 * @returns {Promise<Object>} - Created response
	 */
	async submitSurveyResponse(surveyId, patientId, answers) {
		try {
			// Validate survey exists and is active
			const survey = await Survey.findOne({
				survey_id: surveyId,
				is_active: true,
				start_date: { $lte: new Date() },
				end_date: { $gte: new Date() },
			});

			if (!survey) {
				throw new Error('Survey not found or not active');
			}

			// Create the response
			const response = new Response({
				survey_id: surveyId,
				patient_id: patientId,
				answers: answers.map((answer) => ({
					question_id: answer.question_id,
					question_type: answer.question_type,
					single_choice_answer:
						answer.single_choice_answer || undefined,
					multiple_choice_answers:
						answer.multiple_choice_answers || [],
					text_answer: answer.text_answer || undefined,
				})),
			});

			await response.save();
			return response;
		} catch (error) {
			throw new Error(
				`Failed to submit survey response: ${error.message}`
			);
		}
	}

	/**
	 * 获取一个问卷的答卷
	 * @param {string} surveyId - ID of the survey
	 * @returns {Promise<Array>} - Array of responses
	 */
	async getSurveyResponses(surveyId) {
		try {
			const responses = await Response.find({ survey_id: surveyId });
			return responses;
		} catch (error) {
			throw new Error(`Failed to get survey responses: ${error.message}`);
		}
	}

	/**
	 * Get patient's responses for a survey
	 * @param {string} surveyId - ID of the survey
	 * @param {string} patientId - ID of the patient
	 * @returns {Promise<Object>} - Response object
	 */
	async getPatientSurveyResponse(surveyId, patientId) {
		try {
			const response = await Response.findOne({
				survey_id: surveyId,
				patient_id: patientId,
			});
			return response;
		} catch (error) {
			throw new Error(
				`Failed to get patient survey response: ${error.message}`
			);
		}
	}
}

module.exports = SurveyRepository;
