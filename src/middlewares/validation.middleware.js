import { body, validationResult } from 'express-validator'

const validateRequest = validations => {
	return async (req, res, next) => {
		await Promise.all(validations.map(validation => validation.run(req)))

		const errors = validationResult(req)
		if (errors.isEmpty()) {
			return next()
		}

		res.status(400).json({ errors: errors.array() })
	}
}

const registerValidation = [
	body('name').notEmpty().withMessage('Name is required'),
	body('email').isEmail().withMessage('Please include a valid email'),
	body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
]

const loginValidation = [
	body('email').isEmail().withMessage('Please include a valid email'),
	body('password').notEmpty().withMessage('Password is required')
]

const paymentValidation = [
	body('amount').isNumeric().withMessage('Amount must be a number'),
	body('paymentMethod').notEmpty().withMessage('Payment method is required')
]

export { validateRequest, registerValidation, loginValidation, paymentValidation }
