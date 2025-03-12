const { ErrorResponse } = require('../dto');

const express = require('express');
const CorsMiddleware = require('../middlewares/cors');
const AuthMiddleware = require('../middlewares/auth');
const ErrorHandler = require('../middlewares/errorHandler');

function RegisterRoutes(app) {
	app.use(express.json());
	app.use(CorsMiddleware);
	app.use('/api/public', AuthMiddleware(0), require('./public'));
	app.use('/api/patient', AuthMiddleware(1), require('./patient'));
	app.use('/api/doctor', AuthMiddleware(2), require('./doctor'));
	app.use('/api/admin', AuthMiddleware(3), require('./auth'));
	
	app.use('/api', require('./user'));
	
	// 404
	app.use((req, res) => {
		return ErrorResponse(res, 'Not Found', -100);
	});
	app.use(ErrorHandler);
}

module.exports = RegisterRoutes;
