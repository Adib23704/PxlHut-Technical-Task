import jwt from 'jsonwebtoken'

const generateToken = (id, role) => {
	return jwt.sign({ id, role }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE
	})
}

const generateRefreshToken = id => {
	return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: process.env.REFRESH_TOKEN_EXPIRE
	})
}

const verifyRefreshToken = token => {
	return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
}

export { generateToken, generateRefreshToken, verifyRefreshToken }
