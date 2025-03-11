const { SuccessResponse } = require('../dto');
const AuthService = require('../service/auth');

class AuthController {
	constructor() {
		this.AuthService = new AuthService();
	}
	async getAllUnauthPatient(req, res, next) {
		try {
			const { pageNumber, pageSize } = req.body;
			if (pageSize < 1 || pageNumber < 1) {
				throw new Error('Invalid page number or page size');
			}
			const result = await this.AuthService.getAllUnauthPatient({
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
			const result = await this.AuthService.getAllUnauthDoctor({
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
			const result = await this.AuthService.getAllDoctor({
				pageNumber,
				pageSize,
			});
			return SuccessResponse(res, result);
		} catch (err) {
			next(err);
		}
	}

	async getAllUnauthAuth(req, res, next) {
		try {
			const { pageNumber, pageSize } = req.body;
			if (pageSize < 1 || pageNumber < 1) {
				throw new Error('Invalid page number or page size');
			}
			const result = await this.AuthService.getAllUnauthAuth({
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
			await this.AuthService.authPatient({ id });
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
			await this.AuthService.authDoctor({ id });
			return SuccessResponse(res);
		} catch (err) {
			next(err);
		}
	}

	async authAuth(req, res, next) {
		try {
			const { id } = req.body;
			if (!id) {
				throw new Error('Invalid id');
			}
			await this.AuthService.authAuth({ id });
			return SuccessResponse(res);
		} catch (err) {
			next(err);
		}
	}
}

module.exports = new AuthController();
