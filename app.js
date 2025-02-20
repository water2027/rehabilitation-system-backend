import express from 'express';

import { CorsMiddleware } from './middlewares/cors.js';

import { SuccessResponse, ErrorResponse } from './dto/index.js';

const app = express();
app.use(express.json());
app.use(CorsMiddleware);

app.get('/', (req, res) => {
	res.status(200).send('Hello World');
});

app.post('/test', (req, res) => {
	const { success } = req.body;
	if (!success) {
		ErrorResponse(res, 'error', 500);
		return;
	}
	SuccessResponse(res);
	return
});

app.listen(3000, () => {
	console.log('Server is running on port 3000');
});
