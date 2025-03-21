const express = require('express');
const http = require('http');
const setupWebsocket = require('./websocket');
require('dotenv').config();
const sequelize = require('./database/db');
require('./model');
const RunMongoDB = require('./database/mongodb');
const RegisterRoutes = require('./routes');

const AuthService = require('./service/auth');
const UserRepository = require('./repository/user');

const eventBus = require('./utils/eventBus');


const PORT = process.env.PORT || 3000;

async function main() {
	try {
		await RunMongoDB();
		await sequelize.sync({ alter: true });
		console.log('Database synchronized successfully');

		const app = express();
		RegisterRoutes(app);

		const authService = new AuthService(new UserRepository());
		eventBus.register('auth', authService);

		const server = http.createServer(app);
		setupWebsocket(server);

		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	} catch (error) {
		console.error('Unable to start server:', error);
	}
}

main();
