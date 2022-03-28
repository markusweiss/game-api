import { body } from 'express-validator';

class Validator {
	checkCreate() {
		return [
			body('id')
				.optional()
				.isUUID(4)
				.withMessage('UUID has to be Version 4!'),
			body('title').notEmpty().withMessage('Title must be filled!'),
			body('completed')
				.optional()
				.isBoolean()
				.withMessage('Value has to be boolean!')
				.isIn([0, false])
				.withMessage('Value has to be 0 or false!')
		];
	}
}

export default new Validator();
