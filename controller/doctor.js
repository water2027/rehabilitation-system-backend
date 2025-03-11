const { SuccessResponse } = require('../dto');
const DoctorService = require('../service/doctor');

class DoctorController {
	async getAuthPatient(req, res, next) {
		try {
			const { pageNumber, pageSize } = req.body;
			if (pageSize < 1 || pageNumber < 1) {
				throw new Error('Invalid page number or page size');
			}
			const result = await DoctorService.getAuthPatient({
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
			const result = await DoctorService.getDoctorPatient({
				doctorId,
				pageNumber,
				pageSize,
			});
			return SuccessResponse(res, result);
		} catch (err) {
			next(err);
		}
	}
}

module.exports = new DoctorController();
