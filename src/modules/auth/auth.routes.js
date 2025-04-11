import express from 'express'

import { registerUser, loginUser, getMe, refreshToken } from './auth.controller.js'
import { authCheck } from '../../middlewares/auth.middleware.js'
import { validateRequest, registerValidation, loginValidation } from '../../middlewares/validation.middleware.js'

const router = express.Router()

router.post('/register', validateRequest(registerValidation), registerUser)
router.post('/login', validateRequest(loginValidation), loginUser)
router.post('/refresh', refreshToken)
router.get('/me', authCheck, getMe)

export default router
