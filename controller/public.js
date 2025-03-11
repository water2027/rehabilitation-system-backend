const { SuccessResponse } = require('../dto');
const PublicService = require('../service/public');

class PublicController {
	constructor() {
		this.PublicService = new PublicService()
	}
	async PatientRegister(req, res, next) {
		try {
			const { id: patient_id } = req.user;
			const {
				gender,
				birthday,
				height,
				weight,
				allergicHistory,
				illnessHistory,
				remark,
				name,
			} = req.body;
			// 可能需要一个验证函数
			const result = await this.PublicService.PatientRegister({
				gender,
				birthday,
				height,
				weight,
				allergicHistory,
				illnessHistory,
				remark,
				name,
				patient_id,
			});
			return SuccessResponse(res, result);
		} catch (err) {
			next(err);
		}
	}

	async DoctorRegister(req, res, next) {
		try {
			const { id: doctor_id } = req.user;
			const { gender, position, introduction, department, name } =
				req.body;
			const result = await this.PublicService.DoctorRegister({
				gender,
				doctor_id,
				position,
				department,
				introduction,
				name,
			});
			return SuccessResponse(res, result);
		} catch (err) {
			next(err);
		}
	}

	async AuthRegister(req, res, next) {
		try {
			const { id: auth_id } = req.user;
			const { name } = req.body;
			const result = await this.PublicService.AuthRegister({
				auth_id,
				name,
			});
			return SuccessResponse(res, result);
		} catch (err) {
			next(err);
		}
	}

	/**
	 * 如果token没过期，发放新token
	 *
	 *
	 */
	RefreshToken(req, res, next) {
		const { id } = req.user;
		this.PublicService.RefreshToken(id)
			.then((token) => {
				return SuccessResponse(res, token);
			})
			.catch((err) => {
				next(err);
			});
	}
}

module.exports = new PublicController();
