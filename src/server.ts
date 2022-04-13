import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import db from './config/database.config';
import Middleware from './middleware';
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
	Middleware.handleValidationError,
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

app.get(
	'/read',
	Validator.checkRead(),
	Middleware.handleValidationError,
	async (req: Request, res: Response) => {
		try {
			const limit = req.query?.limit as number | undefined;
			const offset = req.query?.offset as number | undefined;
			const records = await DataInstance.findAll({
				where: {},
				limit,
				offset
			});
			return res.json(records);
		} catch (e) {
			return res.json({
				msg: 'fail to read record',
				status: 500,
				route: '/read'
			});
		}
	}
);

app.get(
	'/read/:id',
	Validator.checkId(),
	Middleware.handleValidationError,
	async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const record = await DataInstance.findOne({ where: { id } });
			return res.json(record);
		} catch (e) {
			return res.json({
				msg: 'fail to read id',
				status: 500,
				route: '/read/id'
			});
		}
	}
);

app.put(
	'/update/:id',
	Validator.checkId(),
	Middleware.handleValidationError,
	async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const record = await DataInstance.findOne({ where: { id } });
			//TODO: check error if empty
			console.log({ id });

			if (!record) {
				return res.json({ msg: 'fail to find existing record' });
			}

			const updatedRecord = await record.update({
				completed: !record.getDataValue('completed')
			});

			return res.json({ record: updatedRecord });
		} catch (e) {
			return res.json({
				msg: 'fail to update id',
				status: 500,
				route: '/update/id'
			});
		}
	}
);

app.delete(
	'/delete/:id',
	Validator.checkId(),
	Middleware.handleValidationError,
	async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const record = await DataInstance.findOne({ where: { id } });

			if (!record) {
				return res.json({ msg: 'fail to find existing record' });
			}

			const deleteRecord = await record.destroy();
			return res.json({ record: deleteRecord });
		} catch (e) {
			return res.json({
				msg: 'fail to delete id',
				status: 500,
				route: '/delete/id'
			});
		}
	}
);

app.listen(port, () => {
	console.log('Server on Port: ' + port);
});
