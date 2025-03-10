const { SuccessResponse } = require('../dto');
const DoctorService = require('../service/doctor');

class DoctorController {
	Register(req, res, next) {
		const { id: doctor_id } = req.user;
		const {
            gender,
			position,
			workingExperience,
			professionalExperience,
			introduction,
			name
		} = req.body;
		DoctorService.Register({
            gender,
			doctor_id,
			position,
			workingExperience,
			professionalExperience,
			introduction,
			name,
		})
			.then((token) => {
				return SuccessResponse(res, token);
			})
			.catch((err) => {
				next(err)
			});
	}
}

module.exports = new DoctorController();
