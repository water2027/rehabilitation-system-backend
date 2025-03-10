const CorsMiddleware = (req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, DELETE, OPTIONS'
	);
	res.header(
		'Access-Control-Allow-Headers',
		'Content-Type, Authorization, Content-Length, X-Requested-With'
	);
	if (req.method === 'OPTIONS') {
		return res.sendStatus(200);
	}

	next();
};

module.exports = CorsMiddleware;
