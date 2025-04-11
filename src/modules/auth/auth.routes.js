/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication routes
 */

import express from 'express'

import { registerUser, loginUser, getMe, refreshToken } from './auth.controller.js'
import { authCheck, isAdmin } from '../../middlewares/auth.middleware.js'
import {
	validateRequest,
	registerValidation,
	loginValidation,
	refreshTokenValidation
} from '../../middlewares/validation.middleware.js'

const router = express.Router()

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterUser'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
router.post('/register', validateRequest(registerValidation), registerUser)

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginUser'
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Validation error
 *       403:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

router.post('/login', validateRequest(loginValidation), loginUser)

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Refresh authentication token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RefreshToken'
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post('/refresh', validateRequest(refreshTokenValidation), refreshToken)

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get current user information
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User information retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/me', authCheck, getMe)

/**
 * @swagger
 * /auth/admin-test:
 *   get:
 *     summary: Test admin access
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Admin access granted
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */
router.get('/admin-test', authCheck, isAdmin, (req, res) => {
	res.json({ message: 'Welcome admin!' })
})

export default router
