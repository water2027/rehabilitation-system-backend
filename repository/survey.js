const {
	Survey,
	SingleChoiceQuestion,
	MultipleChoiceQuestion,
	TextQuestion,
	Response,
} = require('../model/survey/survey');
const SurveyToPatient = require('../model/connection/survey_to_patient');

class SurveyRepository {
	/**
	 * Create a new survey
	 * @param {Object} surveyData - 问卷基础信息
	 * @param {string} surveyData.doctor_id - 创建者
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
				// @ts-ignore
				survey.questions = await this.createQuestions(questions);
			}

			await survey.save();
			return survey;
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(`Failed to create questions: ${error.message}`);
			}
			throw error;
		}
	}

	/**
	 * Create questions of different types
	 * @param {Object[]} questionsData - 问卷问题数组
	 * @param {string} questionsData[].title - 问题题干
	 * @param {'SingleChoice'| 'MultipleChoice'| 'Text'} questionsData[].question_type - 问题类型
	 * @param {boolean} [questionsData[].is_required=true] - 是否必填，默认为true
	 * @param {Object[]} [questionsData[].options] - 选择题选项
	 * @param {string} [questionsData[].options[].text] - 选项文本
	 * @param {number} [questionsData[].min] - 最少选几项 (对于MultipleChoice)
	 * @param {number} [questionsData[].max] - 最多选几项 (对于MultipleChoice)
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
			if (error instanceof Error) {
				throw new Error(`Failed to create questions: ${error.message}`);
			}
			throw error;
		}
	}

	/**
	 * Get survey by ID
	 * @param {string} surveyId - ID of the survey to retrieve
	 */
	async getSurveyById(surveyId) {
		try {
			const survey = await Survey.findOne({ survey_id: surveyId });
			return survey;
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(`Failed to create questions: ${error.message}`);
			}
			throw error;
		}
	}

	/**
	 * 
	 * @param {string} doctorId 
	 * @returns 
	 */
	async getSurveyByDoctorId(doctorId) {
		try {
			const survey = await Survey.find({ doctor_id: doctorId });
			return survey;
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(`Failed to create questions: ${error.message}`);
			}
			throw error;
		}
	}

	/**
	 * Get all active surveys
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
			if (error instanceof Error) {
				throw new Error(`Failed to create questions: ${error.message}`);
			}
			throw error;
		}
	}

	/**
	 * Update a survey
	 * @param {string} surveyId - ID of the survey to update
	 * @param {Object} updateData - Data to update
	 * @param {string} updateData.title 标题
	 * @param {string} updateData.description 描述
	 * @param {Date} updateData.start_date 开始时间
	 * @param {Date} updateData.end_date 结束时间
	 * @param {boolean} updateData.is_active 是否启用
	 * @param {Object[]} updateData.questions - 问卷问题数组
	 * @param {string} updateData.questions[].title - 问题题干
	 * @param {'SingleChoice'| 'MultipleChoice'| 'Text'} updateData.questions[].question_type - 问题类型
	 * @param {boolean} [updateData.questions[].is_required=true] - 是否必填，默认为true
	 * @param {Object[]} [updateData.questions[].options] - 选择题选项
	 * @param {string} [updateData.questions[].options[].text] - 选项文本
	 * @param {number} [updateData.questions[].min] - 最少选几项 (对于MultipleChoice)
	 * @param {number} [updateData.questions[].max] - 最多选几项 (对于MultipleChoice)
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
				// @ts-ignore
				survey.questions = await this.createQuestions(
					updateData.questions
				);
			}

			await survey.save();
			return survey;
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(`Failed to create questions: ${error.message}`);
			}
			throw error;
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
			if (error instanceof Error) {
				throw new Error(`Failed to create questions: ${error.message}`);
			}
			throw error;
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
			if (error instanceof Error) {
				throw new Error(`Failed to create questions: ${error.message}`);
			}
			throw error;
		}
	}

	/**
	 * 提交问卷
	 * @param {string} surveyId - ID of the survey
	 * @param {string} patientId - ID of the patient
	 * @param {Array<any>} answers - Array of answer objects
	 */
	async submitSurveyResponse(patientId, surveyId, answers) {
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
			if (error instanceof Error) {
				throw new Error(`Failed to create questions: ${error.message}`);
			}
			throw error;
		}
	}

	/**
	 * 获取一个问卷的答卷
	 * @param {string} surveyId - ID of the survey
	 */
	async getSurveyResponses(surveyId) {
		try {
			const responses = await Response.find({ survey_id: surveyId });
			return responses;
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(`Failed to create questions: ${error.message}`);
			}
			throw error;
		}
	}

	/**
	 * 获取患者的问卷结果
	 * @param {string} patientId - 患者id
	 * @param {string} surveyId - 问卷id
	 */
	async getPatientSurveyResponse(patientId, surveyId) {
		try {
			const response = await Response.findOne({
				survey_id: surveyId,
				patient_id: patientId,
			});
			return response;
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(`Failed to create questions: ${error.message}`);
			}
			throw error;
		}
	}

	async addPatientsToSurvey(surveyId, patients) {
		// 插入患者和问卷的关联
		const connections = patients.map((patientId) => ({
			patient_id: patientId,
			survey_id: surveyId,
		}));
		await SurveyToPatient.insertMany(connections);
	}
}

module.exports = SurveyRepository;
