import logger from '../utils/logger.js'

const errorHandler = (err, req, res, _next) => {
	logger.error(err.stack)

	res.json({
		message: err.message,
		stack: process.env.NODE_ENV === 'production' ? null : err.stack
	})
}

const notFound = (req, res, next) => {
	const error = new Error(`Not found - ${req.originalUrl}`)
	logger.error(error.message)
	res.status(404).json({
		message: error.message
	})
	next(error)
}

export { errorHandler, notFound }
