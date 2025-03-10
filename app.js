const express = require('express');
require('dotenv').config();
const sequelize = require('./database/db');
require('./model')
const RegisterRoutes = require('./routes');

const PORT = process.env.PORT || 3000;

async function startServer() {
	try {
		await sequelize.sync({ alter: true });
		console.log('Database synchronized successfully');
		
		const app = express();
		RegisterRoutes(app);
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	} catch (error) {
		console.error('Unable to start server:', error);
	}
}

startServer();
