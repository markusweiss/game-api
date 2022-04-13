import express from 'express';
import Controller from '../controller';
import Middleware from '../middleware';
import Validator from '../validator';

const router = express.Router();

router.post(
	'/create',
	Validator.checkCreate(),
	Middleware.handleValidationError,
	Controller.create
);

router.get(
	'/read',
	Validator.checkRead(),
	Middleware.handleValidationError,
	Controller.read
);

router.get(
	'/read/:id',
	Validator.checkId(),
	Middleware.handleValidationError,
	Controller.readID
);

router.put(
	'/update/:id',
	Validator.checkId(),
	Middleware.handleValidationError,
	Controller.update
);

router.delete(
	'/delete/:id',
	Validator.checkId(),
	Middleware.handleValidationError,
	Controller.delete
);

export default router;
