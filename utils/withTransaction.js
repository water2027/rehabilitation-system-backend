const mongoose = require('mongoose');

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


module.exports = { mongoWithTransaction }