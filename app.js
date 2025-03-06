const express = require('express');
const sequelize = require('./database/db');

const CorsMiddleware = require('./middlewares/cors');
const AuthMiddleware = require('./middlewares/auth');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(CorsMiddleware);
app.use('/auth', AuthMiddleware);

async function startServer() {
	try {
		await sequelize.sync({ alter: true });
		console.log('Database synchronized successfully');

		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	} catch (error) {
		console.error('Unable to start server:', error);
	}
}

startServer();
