import winston from 'winston'
import 'winston-mongodb'

const { combine, timestamp, printf, colorize, errors } = winston.format

const logFormat = printf(({ level, message, timestamp, stack }) => {
	return `${timestamp} ${level}: ${stack || message}`
})

const logger = winston.createLogger({
	level: 'info',
	format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), errors({ stack: true }), logFormat),
	transports: [
		new winston.transports.Console({
			format: combine(colorize(), logFormat)
		}),
		new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
		new winston.transports.File({ filename: 'logs/combined.log' }),
		new winston.transports.MongoDB({
			level: 'error',
			db: process.env.MONGO_URI,
			collection: 'logs',
			capped: true,
			cappedSize: 10000000 // 10MB
		})
	],
	exceptionHandlers: [new winston.transports.File({ filename: 'logs/exceptions.log' })],
	rejectionHandlers: [new winston.transports.File({ filename: 'logs/rejections.log' })]
})

if (process.env.NODE_ENV !== 'production') {
	logger.add(
		new winston.transports.Console({
			format: winston.format.simple()
		})
	)
}

export default logger
