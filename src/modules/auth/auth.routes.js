import express from 'express'

import { registerUser, loginUser, getMe, refreshToken } from './auth.controller.js'
import { authCheck } from '../../middlewares/auth.middleware.js'

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/refresh', refreshToken)
router.get('/me', authCheck, getMe)

export default router
