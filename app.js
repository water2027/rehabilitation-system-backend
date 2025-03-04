const express = require('express');

const CorsMiddleware = require('./middlewares/cors');
const AuthMiddleware = require('./middlewares/auth');

const { SuccessResponse, ErrorResponse } = require('./dto/index');

const app = express();
app.use(express.json());
app.use(CorsMiddleware);
app.use('/auth', AuthMiddleware);

app.get('/', (req, res) => {
	res.status(200).send('Hello World');
});


app.post('/auth/test', (req, res) => {
	const { success } = req.body;
	if (!success) {
		ErrorResponse(res, 'error', 500);
		return;
	}
	SuccessResponse(res);
	return;
});

app.listen(3000, () => {
	console.log('Server is running on port 3000');
});
