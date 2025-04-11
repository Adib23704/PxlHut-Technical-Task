import asyncHandler from 'express-async-handler'

import User from '../user/user.model.js'
import { generateRefreshToken, generateToken, verifyRefreshToken } from '../../utils/JwtToken.js'

const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password, role } = req.body

	const userExists = await User.findOne({ email })

	if (userExists) {
		res.status(400)
		throw new Error('User already exists')
	}

	const user = await User.create({
		name,
		email,
		password,
		role: role || 'user'
	})

	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			role: user.role,
			token: generateToken(user._id, user.role)
		})
	} else {
		res.status(400)
		throw new Error('Invalid user data')
	}
})

const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	const user = await User.findOne({ email }).select('+password')

	if (user && (await user.matchPassword(password))) {
		const token = generateToken(user._id, user.role)
		const refreshToken = generateRefreshToken(user._id)

		user.refreshToken = refreshToken
		await user.save()

		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			role: user.role,
			auth: {
				token,
				refreshToken,
				tokenExpiresIn: process.env.JWT_EXPIRE,
				refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRE
			}
		})
	} else {
		res.status(401)
		throw new Error('Invalid email or password')
	}
})

const refreshToken = asyncHandler(async (req, res) => {
	const { refreshToken } = req.body

	if (!refreshToken) {
		res.status(401)
		throw new Error('Refresh token required')
	}

	try {
		const decoded = verifyRefreshToken(refreshToken)
		const user = await User.findById(decoded.id)

		if (!user || user.refreshToken !== refreshToken) {
			res.status(401)
			throw new Error('Invalid refresh token')
		}

		const newToken = generateToken(user._id, user.role)
		const newRefreshToken = generateRefreshToken(user._id)

		user.refreshToken = newRefreshToken
		await user.save()

		res.json({
			token: newToken,
			refreshToken: newRefreshToken,
			tokenExpiresIn: process.env.JWT_EXPIRE,
			refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRE
		})
	} catch (error) {
		res.status(401)
		throw new Error(`Invalid refresh token: ${error.stack}`)
	}
})

const getMe = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user.id)

	if (user) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			role: user.role
		})
	} else {
		res.status(404)
		throw new Error('User not found')
	}
})

export { registerUser, loginUser, refreshToken, getMe }
