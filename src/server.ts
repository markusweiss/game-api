import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import db from './config/database.config';
import { DataInstance } from './model';

db.sync().then(() => {
	console.log('DB connect ok');
});

const app = express();

const port = '9000';

app.use(express.json());

app.post('/create', async (req: Request, res: Response) => {
	const id = uuidv4();
	try {
		console.log(req.body);
		const record = await DataInstance.create({ ...req.body, id });
		return res.json({ record, msg: 'created' });
	} catch (e) {
		return res.json({
			msg: 'fail to create',
			status: 500,
			route: '/create'
		});
	}
});

app.listen(port, () => {
	console.log('Server on Port: ' + port);
});
