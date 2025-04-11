import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'

import User from '../modules/user/user.model.js'

const authCheck = asyncHandler(async (req, res, next) => {
	let token

	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		try {
			token = req.headers.authorization.split(' ')[1]
			const decoded = jwt.verify(token, process.env.JWT_SECRET)
			req.user = await User.findById(decoded.id).select('-password')
			next()
		} catch (error) {
			res.status(401).send('Not authorized, token failed')
			throw new Error(`Not authorized, token failed: ${error.stack}`)
		}
	}

	if (!token) {
		res.status(401).send('Not authorized, no token')
		throw new Error('Not authorized, no token')
	}
})

const isAdmin = (req, res, next) => {
	if (req.user && req.user.role === 'admin') {
		next()
	} else {
		res.status(403).send('Not authorized as an admin')
		throw new Error('Not authorized as an admin')
	}
}

export { authCheck, isAdmin }
