const { ErrorResponse } = require('../dto');

const express = require('express');
const CorsMiddleware = require('../middlewares/cors');
const AuthMiddleware = require('../middlewares/auth');
const ErrorHandler = require('../middlewares/errorHandler');

function RegisterRoutes(app) {
	app.use(express.json());
	app.use(CorsMiddleware);
	app.use('/api/public', AuthMiddleware(0));
	app.use('/api/patient', AuthMiddleware(1));
	app.use('/api/doctor', AuthMiddleware(2));
	app.use('/api/auth', AuthMiddleware(3));
	
	app.use('/api', require('./user'));
	app.use('/api', require('./doctor'));
	app.use('/api', require('./auth'))

	// 404
	app.use((req, res) => {
		return ErrorResponse(res, 'Not Found', 0);
	});
	app.use(ErrorHandler);
}

module.exports = RegisterRoutes;
