const mongoose = require('mongoose');

async function RunMongoDB() {
	const host = process.env.MONGO_HOST;
	const port = process.env.MONGO_PORT;
	const dbname = process.env.MONGO_DBNAME;
	await mongoose.connect(`mongodb://${host}:${port}/${dbname}`, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
    console.log('MongoDB connected');
}

module.exports = RunMongoDB;
