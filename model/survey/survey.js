const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 选项模式（用于多选/单选类问题）
const OptionSchema = new Schema({
	option_id: {
		type: Schema.Types.ObjectId,
		default: () => new mongoose.Types.ObjectId(),
	},
	text: String,
});

// 基础问题模式
const BaseQuestionSchema = new Schema(
	{
		created_by: {
			type: String,
			required: true,
		},
		title: String,
		is_required: { type: Boolean, default: true },
	},
	{ discriminatorKey: 'question_type', timestamps: true }
);

// 为不同类型的问题创建区分器
const Question = mongoose.model('Question', BaseQuestionSchema);

// 单选题
const SingleChoiceQuestion = Question.discriminator(
	'SingleChoice',
	new Schema({
		options: [OptionSchema],
	})
);

// 多选题
const MultipleChoiceQuestion = Question.discriminator(
	'MultipleChoice',
	new Schema({
		options: [OptionSchema],
		max: Number,
		min: Number,
	})
);

// 文本问题
const TextQuestion = Question.discriminator('Text', new Schema({}));

// 问卷模式
const SurveySchema = new Schema(
	{
		doctor_id: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		start_date: {
			type: Date,
			required: true,
		},
		end_date: {
			type: Date,
			required: true,
		},
		created_at: {
			type: Date,
			default: Date.now,
		},
		is_active: {
			type: Boolean,
			default: true,
		},
		questions: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Question',
			},
		],
	},
	{ timestamps: true }
);

// 创建Survey模型
const Survey = mongoose.model('Survey', SurveySchema);

const ResponseSchema = new Schema(
	{
		survey_id: { type: Schema.Types.ObjectId, required: true, index: true },
		patient_id: { type: String, required: true, index: true },
		created_at: { type: Date, default: Date.now },
		answers: [
			{
				question_id: { type: Schema.Types.ObjectId, required: true },
				question_type: {
					type: String,
					enum: ['SingleChoice', 'MultipleChoice', 'Text'],
					required: true,
				},
				single_choice_answer: { type: Schema.Types.ObjectId },
				multiple_choice_answers: [{ type: Schema.Types.ObjectId }],
				text_answer: { type: String },
			},
		],
	},
	{ timestamps: true }
);

ResponseSchema.index({ survey_id: 1, patient_id: 1 });

const Response = mongoose.model('Response', ResponseSchema);

module.exports = {
	Survey,
	Question,
	SingleChoiceQuestion,
	MultipleChoiceQuestion,
	TextQuestion,
	Response,
};
