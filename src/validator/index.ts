import { body, query } from 'express-validator';
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

	checkRead() {
		return [
			query('limit')
				.notEmpty()
				.withMessage('Limit has to set')
				.isInt({ min: 1, max: 10 })
				.withMessage('Limit value should be between 1-10'),
			query('offset')
				.optional()
				.isNumeric()
				.withMessage('Offset should be a number')
		];
	}
}

export default new Validator();
