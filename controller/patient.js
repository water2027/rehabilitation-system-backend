const { SuccessResponse } = require('../dto');
const PatientService = require('../service/patient');

class PatientController {
	constructor() {
		this.PatientService = new PatientService();
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
}

module.exports = new PatientController();
