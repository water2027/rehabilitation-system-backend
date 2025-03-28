const {
	Survey,
	Question,
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
				doctor_id: surveyData.doctor_id,
				title: surveyData.title,
				description: surveyData.description,
				start_date: surveyData.start_date,
				end_date: surveyData.end_date,
				is_active:
					surveyData.is_active !== undefined
						? surveyData.is_active
						: true,
			});

			const insertedQuestions = await this.createQuestions(
				surveyData.doctor_id,
				questions
			);
			survey.questions = insertedQuestions.map((q) => q._id);

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
	async createQuestions(id, questionsData) {
		try {
			const questions = [];

			for (const questionData of questionsData) {
				let question;

				const commonFields = {
					title: questionData.title,
					is_required:
						questionData.is_required !== undefined
							? questionData.is_required
							: true,
					created_by: id,
				};

				switch (questionData.question_type) {
					case 'SingleChoice':
						question = new SingleChoiceQuestion({
							...commonFields,
							options: questionData.options || [],
						});
						break;

					case 'MultipleChoice':
						question = new MultipleChoiceQuestion({
							...commonFields,
							options: questionData.options || [],
							min: questionData.min,
							max: questionData.max,
						});
						break;

					case 'Text':
						question = new TextQuestion({
							...commonFields,
						});
						break;

					default:
						throw new Error(
							`Unsupported question type: ${questionData.question_type}`
						);
				}

				questions.push(question);
			}

			const result = await Question.insertMany(questions);

			return result;
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
			const survey = await Survey.findById(surveyId).populate({
				path: 'questions',
				model: 'Question',
			});

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
	async getSurveyByDoctorId(doctorId, info) {
		try {
			const survey = await Survey.find({ doctor_id: doctorId })
				.skip((info.pageNumber - 1) * info.pageSize)
				.limit(info.pageSize);
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

	/** Update a survey
	 *
	 * @param {string} surveyId - ID of the survey to update
	 * @param {Object} updateData - Data to update
	 * @param {string} updateData.title 标题
	 * @param {string} updateData.description 描述
	 * @param {Date} updateData.start_date 开始时间
	 * @param {Date} updateData.end_date 结束时间
	 * @param {boolean} updateData.is_active 是否启用
	 */
	async updateSurvey(surveyId, updateData) {
		try {
			const survey = await Survey.findById(surveyId);

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
			const result = await Survey.deleteOne({ _id: surveyId });
			return result.deletedCount > 0;
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(`Failed to create questions: ${error.message}`);
			}
			throw error;
		}
	}

	async findQuestionById(questionId) {
		try {
			const question = await Question.findById(questionId);

			if (!question) {
				throw new Error(`Question with ID ${questionId} not found`);
			}

			return question;
		} catch (error) {
			if (error.name === 'CastError') {
				throw new Error(`Invalid question ID format: ${questionId}`);
			}
			throw new Error(`Failed to get question: ${error.message}`);
		}
	}

	async addNewQuestionToSurvey(id, surveyId, questions) {
		try {
			console.log(id);
			const insertedQuestions = await this.createQuestions(id, questions);
			const survey = await Survey.findByIdAndUpdate(
				surveyId,
				{ $push: { questions: { $each: insertedQuestions } } },
				{ new: true }
			);
			await survey.save();
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(`Failed to create questions: ${error.message}`);
			}
			throw error;
		}
	}

	/** 将一个已有的问题添加到已有的问卷
	 *
	 * @param {string} surveyId - ID of the survey
	 * @param {string[]} questions - 已有的问题id数组
	 */
	async addOldQuestionToSurvey(surveyId, questions) {
		try {
			const survey = await Survey.findByIdAndUpdate(
				surveyId,
				{ $push: { questions: { $each: questions } } },
				{ new: true }
			);

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
	 * @param {Object[]} answers - 答卷
	 * @param {string} answers[].question_id
	 * @param {string} answers[].question_type
	 * @param {string} [answers[].single_choice_answer]
	 * @param {string[]} [answers[].multiple_choice_answers]
	 * @param {string} [answers[].text_answer]
	 */
	async submitSurveyResponse(patientId, surveyId, answers) {
		try {
			const survey = await Survey.findById(surveyId);
			const now = new Date();
			const start = new Date(survey.start_date);
			const end = new Date(survey.end_date);
			if (
				!(
					survey.is_active &&
					now.getTime() < end.getTime() &&
					now.getTime() > start.getTime()
				)
			) {
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
				throw new Error(`Failed to answer: ${error.message}`);
			}
			throw error;
		}
	}

	/**
	 * 
	 * @param {string} survey_id 
	 * @param {string} patient_id 
	 * @param {string} advice 
	 */
	async addAdvice(survey_id, patient_id, advice) {
		try {
			const response = await SurveyToPatient.findOne({
				// @ts-ignore
				survey_id,
				patient_id,
			});
			// @ts-ignore
			response.advice = advice;
			await response.save();
			return response;
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(`Failed to answer: ${error.message}`);
			}
			throw error;
		}
	}

	/**
	 * 获取一个问卷的所有答卷
	 * @param {string} surveyId - ID of the survey
	 */
	async getSurveyResponses(surveyId) {
		try {
			const responses = await Response.find({
				survey_id: surveyId,
			}).populate({
				path: 'answers.question_id',
			});
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

	/** 将问卷分配给患者
	 * 
	 * @param {string} surveyId 
	 * @param {string[]} patients 
	 */
	async addPatientsToSurvey(surveyId, patients) {
		// 插入患者和问卷的关联
		const connections = patients.map((patientId) => ({
			patient_id: patientId,
			survey_id: surveyId,
		}));

		await SurveyToPatient.bulkCreate(connections);
	}

	/**
	 * 
	 * @param {string} patientId 
	 * @param {Object} info 
	 * @param {number} info.pageNumber
	 * @param {number} info.pageSize 
	 * @returns 
	 */
	async getSurveyListForPatient(patientId, info) {
		// 获取患者的问卷列表id
		const connections = await SurveyToPatient.findAll({
			// @ts-ignore
			patient_id: patientId,
		});
		// 根据问卷id获取问卷详情
		// @ts-ignore
		const surveyIds = connections.map((survey) => survey.survey_id);
		if (surveyIds.length === 0) {
			return [];
		}
		const surveyList = await Survey.find({
			_id: { $in: surveyIds },
		})
			.skip((info.pageNumber - 1) * info.pageSize)
			.limit(info.pageSize);
		return surveyList;
	}

	/** 检查患者是否与问卷有关联
	 * 
	 * @param {string} patient_id 
	 * @param {string} survey_id 
	 * @returns {Promise<number>}
	 */
	async existPatientAndSurvey(patient_id, survey_id) {
		// 代码提示有问题，实际上返回的是数字
		const result = await SurveyToPatient.count({
			// @ts-ignore
			patient_id,
			survey_id,
		});
		// @ts-ignore
		return result;
	}
}

module.exports = SurveyRepository;
