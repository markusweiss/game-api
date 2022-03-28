import express, { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { v4 as uuidv4 } from 'uuid';
import db from './config/database.config';
import { DataInstance } from './model';
import Validator from './validator';

db.sync().then(() => {
	console.log('DB connect ok');
});

const app = express();

const port = '9000';

app.use(express.json());

app.post(
	'/create',
	Validator.checkCreate(),
	(req: Request, res: Response, next: NextFunction) => {
		const error = validationResult(req);
		if (!error.isEmpty()) {
			return res.json(error);
		}
		next();
	},
	async (req: Request, res: Response) => {
		const id = uuidv4();
		try {
			console.log(req.body);
			const record = await DataInstance.create({ ...req.body, id });
			return res.json({ record, msg: 'record was created' });
		} catch (e) {
			return res.json({
				msg: 'fail to create record',
				status: 500,
				route: '/create'
			});
		}
	}
);

app.listen(port, () => {
	console.log('Server on Port: ' + port);
});
