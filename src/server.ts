import express from 'express';
import db from './config/database.config';
import Controller from './controller';
import Middleware from './middleware';
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
	Controller.create
);

app.get(
	'/read',
	Validator.checkRead(),
	Middleware.handleValidationError,
	Controller.read
);

app.get(
	'/read/:id',
	Validator.checkId(),
	Middleware.handleValidationError,
	Controller.readID
);

app.put(
	'/update/:id',
	Validator.checkId(),
	Middleware.handleValidationError,
	Controller.update
);

app.delete(
	'/delete/:id',
	Validator.checkId(),
	Middleware.handleValidationError,
	Controller.delete
);

app.listen(port, () => {
	console.log('Server on Port: ' + port);
});
