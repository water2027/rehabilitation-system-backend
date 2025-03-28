const mongoose = require('mongoose');
const sequelize = require('../database/db');

/**
 * 
 * @returns {(fn:()=>Promise<any>)=>Promise<any>}
 * @description sequelizeWithTransaction 用于 sequelize 的事务处理
 */
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

/**
 * 
 * @returns {(fn:()=>Promise<any>)=>Promise<any>}
 * @description mongoWithTransaction 用于 mongoose 的事务处理
 */
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
