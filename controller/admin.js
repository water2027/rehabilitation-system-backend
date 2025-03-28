const { SuccessResponse } = require('../dto');

class AdminController {
	/**
	 * 
	 * @param {import('../service/admin')} AdminService 
	 */
	constructor(AdminService) {
		this.AdminService = AdminService;
	}
	async getAllUnauthPatient(req, res, next) {
		try {
			const { pageNumber, pageSize } = req.body;
			if (pageSize < 1 || pageNumber < 1) {
				throw new Error('Invalid page number or page size');
			}
			const result = await this.AdminService.getAllUnauthPatient({
				pageNumber,
				pageSize,
			});
			return SuccessResponse(res, result);
		} catch (err) {
			next(err);
		}
	}

	async getAllUnauthDoctor(req, res, next) {
		try {
			const { pageNumber, pageSize } = req.body;
			if (pageSize < 1 || pageNumber < 1) {
				throw new Error('Invalid page number or page size');
			}
			const result = await this.AdminService.getAllUnauthDoctor({
				pageNumber,
				pageSize,
			});
			return SuccessResponse(res, result);
		} catch (err) {
			next(err);
		}
	}

	async getAllDoctor(req, res, next) {
		try {
			const { pageNumber, pageSize } = req.body;
			if (pageSize < 1 || pageNumber < 1) {
				throw new Error('Invalid page number or page size');
			}
			const result = await this.AdminService.getAllDoctor({
				pageNumber,
				pageSize,
			});
			return SuccessResponse(res, result);
		} catch (err) {
			next(err);
		}
	}

	async getAllUnauthAdmin(req, res, next) {
		try {
			const { pageNumber, pageSize } = req.body;
			if (pageSize < 1 || pageNumber < 1) {
				throw new Error('Invalid page number or page size');
			}
			const result = await this.AdminService.getAllUnauthAdmin({
				pageNumber,
				pageSize,
			});
			return SuccessResponse(res, result);
		} catch (err) {
			next(err);
		}
	}

	async authPatient(req, res, next) {
		try {
			const { id } = req.body;
			if (!id) {
				throw new Error('Invalid id');
			}
			await this.AdminService.authPatient({ id });
			return SuccessResponse(res);
		} catch (err) {
			next(err);
		}
	}

	async authDoctor(req, res, next) {
		try {
			const { id } = req.body;
			if (!id) {
				throw new Error('Invalid id');
			}
			await this.AdminService.authDoctor({ id });
			return SuccessResponse(res);
		} catch (err) {
			next(err);
		}
	}

	async authAdmin(req, res, next) {
		try {
			const { id } = req.body;
			if (!id) {
				throw new Error('Invalid id');
			}
			await this.AdminService.authAdmin({ id });
			return SuccessResponse(res);
		} catch (err) {
			next(err);
		}
	}
}

module.exports = AdminController;
