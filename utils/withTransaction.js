const mongoose = require('mongoose');
const sequelize = require('../database/db');

function sequelizeWithTransaction() {
	return async function (fn) {
		await sequelize.query('START TRANSACTION');
		try {
			const result = await fn();
			await sequelize.query('COMMIT');
			return result;
		} catch (error) {
			await sequelize.query('ROLLBACK');
			throw error;
		}
	};
}

function mongoWithTransaction() {
	return async function (fn) {
		const session = await mongoose.startSession();
		session.startTransaction();

		try {
			const result = await fn();
			await session.commitTransaction();
			return result;
		} catch (error) {
			await session.abortTransaction();
			throw error;
		} finally {
			session.endSession();
		}
	};
}

module.exports = { sequelizeWithTransaction, mongoWithTransaction };
